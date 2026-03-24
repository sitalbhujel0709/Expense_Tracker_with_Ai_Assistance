import { Router } from "express";
import { BudgetController } from "./budget.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const budgetRouter: Router = Router();

const budgetController = new BudgetController();

budgetRouter.post('/set',requireAuth,budgetController.setBudget)
budgetRouter.get('/get',requireAuth,budgetController.getBudget)
budgetRouter.delete('/delete',requireAuth,budgetController.deleteBudget)

export default budgetRouter;