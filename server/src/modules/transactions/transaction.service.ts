import { prisma } from "../../lib/prisma.js";
import type { Expense } from "../../../generated/prisma/client.js";

type ExpenseCategory = "FOOD" | "TRANSPORT" | "ENTERTAINMENT" | "UTILITIES" | "OTHER";

export class TransactionService {
  private prisma = prisma;

  async createTransaction(userId: string, amount: number, description: string, date: Date, category: ExpenseCategory): Promise<Expense> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      },
      include: {
        budget: true
      }
    })
    let budgetId: string | undefined = undefined;
    if (!user) {
      throw new Error("User not found")
    }
    if (user.budget) {
      budgetId = user.budget.id;
    }
    const transaction = await this.prisma.expense.create({
      data: {
        amount,
        description,
        date,
        category,
        userId,
        budgetId: budgetId!
      }
    })
    return transaction;
  }

  async getAllTransactions(userId: string, filters: { startDate?: Date; endDate?: Date; category?: ExpenseCategory }, page: number, limit: number): Promise<Expense[]> {
    const where: any = {
    }
    if (filters.startDate || filters.endDate) {
      where.date = {
        gte: filters.startDate,
        lte: filters.endDate
      }
    }
    if (filters.category) {
      where.category = filters.category;
    }
    const transactions = await this.prisma.expense.findMany({
      where: {
        userId,
        ...where
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        date: "desc"
      }

    })
    return transactions;
  }

  async deleteTransaction(id: string):Promise<void> {
    const transaction = await this.prisma.expense.findUnique({
      where: {id}
    })
    if(!transaction){
      throw new Error("Transaction not found");
    }
    await this.prisma.expense.delete({
      where: {id: transaction.id}
    })
  }

  async getTransactionSummary(userId:string):Promise<any>{
    const budget = await this.prisma.budget.findUnique({
      where: {userId}
    });
    if(!budget){
      throw new Error("Budget not found for user");
    }
    const totalExpenses = await this.prisma.expense.aggregate({
      where: {budgetId: budget.id},
      _sum:{
        amount: true
      }
    })
    const categoryBreakdown = await this.prisma.expense.groupBy({
      by: ["category"],
      _sum: {
        amount: true
      },
      where: {budgetId: budget.id}
    })
    return {
      totalExpenses: totalExpenses._sum.amount || 0,
      categoryBreakdown: categoryBreakdown.map(item=>({
        category: item.category,
        amount: item._sum.amount || 0
      })),
      budget:budget.amount
    }
  }

}