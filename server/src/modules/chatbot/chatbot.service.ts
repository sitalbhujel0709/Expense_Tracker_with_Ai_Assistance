import { createGroqAgent } from "../../lib/groq.js";
import { TransactionService } from "../transactions/transaction.service.js";
import { UserService } from "../user/user.service.js";
import { BudgetService } from "../budget/budget.service.js";
import z  from "zod";
import { tool } from "@langchain/core/tools";


type addTransactionInput = {
  amount: number;
  description: string;
  date: string;
  category: "FOOD" | "TRANSPORT" | "ENTERTAINMENT" | "UTILITIES" | "OTHER";
}

export class ChatBotService {
  private transactionService = new TransactionService();
  private userService = new UserService();
  private budgetService = new BudgetService();

  private buildTools(userId:string){
    const addTransactionTool = tool(
      async ({amount, description, date, category
      }:addTransactionInput) => {
        const transaction = await this.transactionService.createTransaction(userId , amount, description, new Date(date), category);
        return JSON.stringify({
          success: true,
          message:"Transaction created successfully",
          transaction:{
            id: transaction.id,
            amount: transaction.amount,
            description: transaction.description,
            date: transaction.date,
            category: transaction.category
          }
        })
      },
      {
        name: "add_transaction",
        description: "Add a new transaction for authenticated user.",
        schema: z.object({
          amount: z.number().positive().min(10),
          description: z.string().min(3),
          date: z.string().describe("Date in ISO format"),
          category: z.enum(["FOOD", "TRANSPORT", "ENTERTAINMENT", "UTILITIES", "OTHER"])
        })
      }
    )
    return [addTransactionTool]
  }

  async askQuestion(userId:string,question: string): Promise<any>{
    const user = await this.userService.getUserProfile(userId);
    const budget = user.budget;
    const transactionSummary = await this.transactionService.getTransactionSummary(userId);

    const groqAgent = createGroqAgent(this.buildTools(userId));
    const context = {
      user: {
        id: userId,
        name: user.name,
        email: user.email
      },
      budget,
      summary: {
        totalExpenses: transactionSummary.totalExpenses,
        categoryBreakdown: transactionSummary.categoryBreakdown,
        savings: Number(budget?.amount) - Number(transactionSummary.totalExpenses)      
      }
    }

    const result = await groqAgent.invoke({
      messages:[
        {
          role: "system",
          content:"User financial context: " + JSON.stringify(context)
        },
        {
          role: "user",
          content: question
        }
      ]
    })
    const lastMessage = result.messages[result.messages.length - 1];
    return lastMessage?.content;
  }
}