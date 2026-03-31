import { requireAuth } from "../../middleware/requireAuth.js";
import { ChatBotController } from "./chatbot.controller.js";
import { Router } from "express";

const chatbotRouter:Router = Router();
const chatbotController = new ChatBotController();

chatbotRouter.post("/ask",requireAuth,chatbotController.askQuestion)

export default chatbotRouter;