import { Router } from "express";
import userRouter from "../modules/user/user.route.js";
import budgetRouter from "../modules/budget/budget.route.js";
import transactionRouter from "../modules/transactions/transaction.route.js";

const AppRouter: Router = Router();

AppRouter.use("/users",userRouter);
AppRouter.use("/budget",budgetRouter)
AppRouter.use("/transactions",transactionRouter)

export default AppRouter;