import { Router } from "express";
import { UserController } from "./user.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const userRouter:Router = Router();

const userController = new UserController()

userRouter.post('/register',userController.registerUser);
userRouter.post('/login',userController.loginUser)
userRouter.get('/profile',requireAuth,userController.getUserProfile)

export default userRouter;