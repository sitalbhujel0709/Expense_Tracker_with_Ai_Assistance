"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axiosInstance from "@/lib/axios";

interface BudgetModalTypes {
  amount: number;
  startDate: string | Date;
  endDate: string | Date;
}

export const BudgetModal = () => {
  const [formData, setFormData] = useState<BudgetModalTypes>({
    amount: 0,
    startDate: "",
    endDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (formData.amount <= 0) {
      alert("Amount must be greater than 0");
      return false;
    }
    if (!formData.startDate || !formData.endDate) {
      alert("Please select both start and end dates");
      return false;
    }
    return true;
  };
  const dateFormatter = (dateStr: string | Date): string => {
    const date = new Date(dateStr);
    return date.toISOString();
  };

  const date = new Date();

  const handleSubmit = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const { amount, startDate, endDate } = formData;
      const formattedData = {
        amount : Number(amount),
        startDate: dateFormatter(startDate),
        endDate: dateFormatter(endDate),
      }
      await axiosInstance.post("/budget/set", formattedData);
      window.location.reload();
    } catch (error) {
      console.error("Error setting budget:", error);
      alert("Failed to set budget. Please try again.");
    }
  }
  return (
    <div>
      {/* modal overlay */}
      <div className="fixed z-10 inset-0 bg-gray-100/90 backdrop-blur-md"></div>
      {/* modal card */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 ">

      
      <Card className="max-w-md w-full bg-gray-50 text-emerald-700">
        <CardHeader>
          <CardTitle>Set Your Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  placeholder="Enter your budget amount"
                  required
                  value={formData.amount}
                  min={1000}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <Label htmlFor="startDate" className="mr-2">
                    Start Date
                  </Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    required
                    value={formData.startDate as string}
                    min={new Date(Date.now()).toISOString().split("T")[0]}
                    onChange={handleChange}
                    className="text-emerald-600"
                  />
                </div>
                <div className="flex items-center">
                  <Label htmlFor="endDate" className="mr-2">
                    End Date
                  </Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    required
                    value={formData.endDate as string}
                    min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Save Budget
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};
