"use client";

import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
export const TransactionChart = ({ data }: { data: any }) => {
  const chartData = data.categoryBreakdown;
  const chartConfig = {
    category: {
      label: "Category",
      color: "#009966",
    },
  };

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Expense Bar Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-84">
          <BarChart data={chartData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Bar dataKey="amount" fill="#009966" />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
