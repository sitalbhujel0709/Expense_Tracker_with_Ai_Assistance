import { Router } from "express";
import userRouter from "../modules/user/user.route.js";

const AppRouter: Router = Router();

AppRouter.use("/users",userRouter);

export default AppRouter;