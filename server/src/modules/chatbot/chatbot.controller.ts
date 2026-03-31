import { ChatBotService } from "./chatbot.service.js";
import type { Request,Response } from "express";

export class ChatBotController {
  private chatBotService = new ChatBotService();

  askQuestion = async (req:Request,res:Response):Promise<void | Response> => {
    const userId = (req as any).userId;
    const { question } = req.body;
    try {
      const answer = await this.chatBotService.askQuestion(userId,question);
      res.json({ answer })
    } catch (error) {
      console.log("Error in ChatBotController.askQuestion:", error);
      res.status(500).json({ error: "Failed to get answer from chatbot" });
    }
  }
}