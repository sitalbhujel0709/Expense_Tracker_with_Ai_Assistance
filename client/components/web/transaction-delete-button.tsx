"use client";
import axiosInstance from "@/lib/axios";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const TransactionDeleteButton = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const router = useRouter();
  const handleDeleteTransaction = async (id: string) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      toast("Transaction deleted successfully");
      router.refresh();
    } catch (error) {
      toast("Failed to delete transaction. Please try again.");
    }
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      onClick={() => handleDeleteTransaction(transactionId)}
      className="hover:bg-red-50 hover:border-red-300 "
    >
      <Trash size={16} className="text-red-500" />
    </Button>
  );
};
