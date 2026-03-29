import { TrendingUpIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const CardSection = async ({data}:{data:any}) => {
  
  const formattedData = [
    {
      title: "Total Budget",
      amount: data.budget,
      description: "Budget this month",
    },
    {
      title: "Total Expenses",
      amount: data.totalExpenses,
      description: "Expenses this month",
    },
    {
      title: "Remaining Budget",
      amount: data.budget - data.totalExpenses,
      description: "Remaining budget for this month",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {formattedData.map((item, index) => (
        <Card key={index} className="shadow-sm text-emerald-700 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardDescription className="text-primary">{item.title}</CardDescription>
            <CardTitle className="text-3xl font-semibold tabular-nums">
              ${item.amount?.toFixed(2)}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                <TrendingUpIcon className="text-emerald-700" />
               
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {item.description}
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
