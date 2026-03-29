import { cookies } from "next/headers";

const parseSetCookieHeader = (setCookie: string): [string, string] | null => {
  const firstPart = setCookie.split(";")[0]?.trim();
  if (!firstPart) {
    return null;
  }

  const separatorIndex = firstPart.indexOf("=");
  if (separatorIndex <= 0) {
    return null;
  }

  const name = firstPart.slice(0, separatorIndex).trim();
  const value = firstPart.slice(separatorIndex + 1).trim();

  if (!name) {
    return null;
  }

  return [name, value];
};

const mergeCookieHeader = (
  baseCookieHeader: string,
  overrides: Map<string, string>
): string => {
  const cookieMap = new Map<string, string>();

  if (baseCookieHeader) {
    baseCookieHeader.split(";").forEach((cookiePart) => {
      const part = cookiePart.trim();
      if (!part) {
        return;
      }

      const separatorIndex = part.indexOf("=");
      if (separatorIndex <= 0) {
        return;
      }

      const name = part.slice(0, separatorIndex).trim();
      const value = part.slice(separatorIndex + 1).trim();
      if (name) {
        cookieMap.set(name, value);
      }
    });
  }

  overrides.forEach((value, key) => {
    cookieMap.set(key, value);
  });

  return Array.from(cookieMap.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");
};

const getSetCookieHeaders = (headers: Headers): string[] => {
  if (typeof headers.getSetCookie === "function") {
    return headers.getSetCookie();
  }

  const single = headers.get("set-cookie");
  return single ? [single] : [];
};

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {}
) {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  let requestCookieHeader = cookieStore.toString();

  // Build request headers from caller options, then attach auth/cookies.
  const makeRequest = async (token?: string, cookieHeader?: string) => {
    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      headers.delete("Authorization");
    }

    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let res = await makeRequest(accessToken, requestCookieHeader);

  // If unauthorized, try refresh once then retry the original request.
  if (res.status === 401 && refreshToken) {
    const refreshRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/refresh`,
      {
        method: "POST",
        headers: {
          Cookie: requestCookieHeader || `refreshToken=${refreshToken}`,
        },
      }
    );

    if (refreshRes.ok) {
      const updatedCookies = new Map<string, string>();
      const setCookies = getSetCookieHeaders(refreshRes.headers);

      setCookies.forEach((setCookie) => {
        const parsed = parseSetCookieHeader(setCookie);
        if (!parsed) {
          return;
        }

        const [name, value] = parsed;
        updatedCookies.set(name, value);

        // In Route Handlers/Server Actions, cookies() may be mutable.
        if (typeof (cookieStore as { set?: (name: string, value: string) => void }).set === "function") {
          (cookieStore as { set: (name: string, value: string) => void }).set(name, value);
        }
      });

      requestCookieHeader = mergeCookieHeader(requestCookieHeader, updatedCookies);
      accessToken = updatedCookies.get("accessToken") ?? accessToken;

      // Optional fallback for APIs returning accessToken in JSON body.
      const contentType = refreshRes.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await refreshRes.json().catch(() => null as unknown as { accessToken?: string } | null);
        if (data?.accessToken) {
          accessToken = data.accessToken;
        }
      }

      // Retry original request
      res = await makeRequest(accessToken, requestCookieHeader);
    }
  }

  return res;
}