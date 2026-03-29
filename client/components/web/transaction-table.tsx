import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

import { TransactionDeleteButton } from "./transaction-delete-button";

interface dataProps {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
}

export const TransactionTable = ({ data }: { data: dataProps[] }) => {
 
  return (
    <div className="max-w-3xl w-full">
      <Card className="text-emerald-700 ">
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
        </CardHeader>
        <CardContent className="max-h-96 overflow-auto ">
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead className="">Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((transaction: dataProps) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <TransactionDeleteButton transactionId={transaction.id}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          
        </CardFooter>
      </Card>
    </div>
  );
};
