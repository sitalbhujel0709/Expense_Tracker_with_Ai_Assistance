"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormDataTypes {
  amount: number;
  category: string;
  description: string;
  date: string;
}

export const TransactionForm = () => {
  const [formData, setFormData] = useState<FormDataTypes>({
    amount: 0,
    category: "",
    description: "",
    date: "",
  });
  const router = useRouter();
  const validateForm = (): boolean => {
    if (formData.amount <= 0 || !formData.category || !formData.description || !formData.date) {
      toast("Please fill in all fields correctly");
      return false;
    }
    return true;
  }

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=> {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post("/transactions",formData);
      if (response.status === 201) {
        toast("Transaction added successfully");
        setFormData({
          amount: 0,
          category: "",
          description: "",
          date: "",
        });
        router.refresh();
      }

    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      toast("Failed to add transaction. Please try again.");
    }
  }
  return (
    <Card className="max-w-sm w-full text-emerald-700">
      <CardHeader>
        <CardTitle className="text-accent-foreground hover:underline">Add your Expense</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid gap-1">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min={10}
              placeholder="Enter amount"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              name="category"
              className="border py-1.5 rounded-lg"
              defaultValue={"OTHER"}
              required
              onChange={handleSelectChange}
            >
              <option value="">Select category</option>
              <option value="FOOD">Food</option>
              <option value="TRANSPORT">Transport</option>
              <option value="ENTERTAINMENT">Entertainment</option>
              <option value="UTILITIES">Utilities</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          <div className="grid gap-1">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              type="text"
              maxLength={50}
              placeholder="Enter description"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              min={new Date(Date.now() - 86400000).toISOString().split("T")[0]}
              max={new Date(Date.now()).toISOString().split("T")[0]}
              required
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Button type="submit" className="bg-emerald-700 cursor-pointer">Add Expense</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
