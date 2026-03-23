import { BudgetService } from "./budget.service.js";
import type { Request, Response } from "express";

export class BudgetController {
  private budgetService = new BudgetService();

  setBudget = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    console.log("User ID from request:", userId);
    const { amount, startDate, endDate } = req.body;

    try {
      const budget = await this.budgetService.setBudget(userId, amount, new Date(startDate), new Date(endDate));
      res.status(200).json(budget);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });

    }
  }
  getBudget = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    try {
      const budget = await this.budgetService.getBudget(userId);
      if (!budget) {
        return res.status(404).json({ message: "Budget not found" });
      }
      res.status(200).json(budget);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
    }
  }
}