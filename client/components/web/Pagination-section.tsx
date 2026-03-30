"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

interface PaginationSectionProps {
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
}

const createPageHref = (
  pathname: string,
  searchParams: URLSearchParams,
  page: number,
  limit: number
) => {
  const params = new URLSearchParams(searchParams.toString());
  params.set("page", String(page));
  params.set("limit", String(limit));
  return `${pathname}?${params.toString()}`;
};

export const PaginationSection = ({
  currentPage,
  limit,
  hasNextPage,
}: PaginationSectionProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = currentPage + 1;

  const previousHref = createPageHref(pathname, searchParams, previousPage, limit);
  const currentHref = createPageHref(pathname, searchParams, currentPage, limit);
  const nextHref = createPageHref(pathname, searchParams, nextPage, limit);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={previousHref}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href={currentHref} isActive className="pointer-events-none">
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {hasNextPage ? (
          <PaginationItem>
            <PaginationLink href={nextHref}>{nextPage}</PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationNext
            href={nextHref}
            className={!hasNextPage ? "pointer-events-none opacity-50" : undefined}
            aria-disabled={!hasNextPage}
            tabIndex={!hasNextPage ? -1 : undefined}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
