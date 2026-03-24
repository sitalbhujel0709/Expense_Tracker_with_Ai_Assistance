import type { Budget } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export class BudgetService {
  private prisma = prisma;

  async setBudget(userId: string, amount: number, startDate: Date, endDate: Date): Promise<Budget> {
    const existingBudget = await this.prisma.budget.findFirst({
      where: {
        userId
      }
    })
    if (existingBudget) {
      return await this.prisma.budget.update({
        where: {
          id: existingBudget.id
        },
        data: {
          amount,
          startDate,
          endDate
        }
      })
    }
    return await this.prisma.budget.create({
      data: {
        userId,
        amount,
        startDate,
        endDate
      }
    })
  }
  async getBudget(userId: string): Promise<Budget | null> {
    return await this.prisma.budget.findFirst({
      where: {
        userId
      }
    })
  }
  async deleteBudget(userId: string): Promise<Budget | null>{
    return await this.prisma.budget.delete({
      where: {
        userId
      }
    })
  }
}