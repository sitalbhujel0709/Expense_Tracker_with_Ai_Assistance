import { TransactionForm } from "@/components/web/transaction-form";
import { TransactionTable } from "@/components/web/transaction-table";
import { fetchWithAuth } from "@/lib/fetchWithAuth";


const TransactionPage = async () => {
    const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_BASE_URL}/transactions`);
    const data = await res.json()
    const formattedData = data.map((transaction:any)=>({
      id: transaction.id,
      date: transaction.date,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description,
    }))


  return (
    <div className="p-4 flex items-start gap-4">
      <TransactionTable data={formattedData}/>
      <TransactionForm/>
    </div>
  )
};

export default TransactionPage;
