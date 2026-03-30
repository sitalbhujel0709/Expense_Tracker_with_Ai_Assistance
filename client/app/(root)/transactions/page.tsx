import { TransactionForm } from "@/components/web/transaction-form";
import { TransactionTable } from "@/components/web/transaction-table";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

type SearchParams = {
  page?: string;
  limit?: string;
};

const DEFAULT_LIMIT = 10;

const toPositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
};

const TransactionPage = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const currentPage = toPositiveInt(searchParams?.page, 1);
  const limit = toPositiveInt(searchParams?.limit, DEFAULT_LIMIT);

  // Request one extra item so frontend can infer whether a next page exists.
  const res = await fetchWithAuth(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions?page=${currentPage}&limit=${limit + 1}`
  );

  if (!res.ok && res.status !== 404) {
    throw new Error("Failed to fetch transactions");
  }

  const data = res.status === 404 ? [] : await res.json();
  const hasNextPage = data.length > limit;

  const formattedData = data.slice(0, limit).map((transaction: any) => ({
    id: transaction.id,
    date: transaction.date,
    amount: transaction.amount,
    category: transaction.category,
    description: transaction.description,
  }));


  return (
    <div className="p-4 flex items-start gap-4">
      <TransactionTable
        data={formattedData}
        pagination={{
          currentPage,
          limit,
          hasNextPage,
        }}
      />
      <TransactionForm/>
    </div>
  )
};

export default TransactionPage;
