import type { ExpenseCategory } from "../../../generated/prisma/enums.js";
import { TransactionService } from "./transaction.service.js";
import type { Request, Response } from "express";

export class TransactionController {
  private transactionService: TransactionService = new TransactionService();

  createTransaction = async (req: Request, res: Response): Promise<void | Response> => {
    const { amount, description, date, category } = req.body;
    const userId = (req as any).userId;
    try {
      const transaction = await this.transactionService.createTransaction(userId, Number(amount), description, new Date(date), category);
      res.status(201).json(transaction);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
    }
  }

  getAllTransactions = async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as any).userId;
    const { startDate, endDate, category, page = 1, limit = 10 } = req.query;
    try {
      const filters: { startDate?: Date; endDate?: Date; category?: ExpenseCategory } = {};
      if (startDate) {
        filters.startDate = new Date(startDate as string);
      }
      if (endDate) {
        filters.endDate = new Date(endDate as string);
      }
      if (category) {
        filters.category = category as ExpenseCategory;
      }
      const transactions = await this.transactionService.getAllTransactions(userId, filters, Number(page), Number(limit))
      if (transactions.length === 0) {
        return res.status(404).json({ message: "No transactions found" });
      }
      res.status(200).json(transactions);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
    }
  }
  deleteTransaction = async (req: Request<{ id: string }, any, any, any>, res: Response): Promise<void | Response> => {
    const { id } = req.params;
    try {
      await this.transactionService.deleteTransaction(id);
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });
    }
  }
  getTransactionSummary = async (req: Request, res: Response): Promise<void | Response> => {
    const userId = (req as any).userId;
    try {
      const summary = await this.transactionService.getTransactionSummary(userId);
      res.status(200).json(summary);
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal Server Error" });

    }
  }
}