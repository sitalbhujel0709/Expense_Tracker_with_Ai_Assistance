import { requireAuth } from "../../middleware/requireAuth.js";
import { TransactionController } from "./transaction.controller.js";
import { Router } from "express";

const transactionRouter: Router = Router();
const transactionController = new TransactionController();

transactionRouter.post("/", requireAuth, transactionController.createTransaction);
transactionRouter.get("/", requireAuth, transactionController.getAllTransactions);
transactionRouter.delete("/:id", requireAuth, transactionController.deleteTransaction);
transactionRouter.get("/summary", requireAuth, transactionController.getTransactionSummary);

export default transactionRouter;