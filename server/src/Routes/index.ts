import { Router } from "express";
import userRouter from "../modules/user/user.route.js";
import budgetRouter from "../modules/budget/budget.route.js";

const AppRouter: Router = Router();

AppRouter.use("/users",userRouter);
AppRouter.use("/budget",budgetRouter)

export default AppRouter;