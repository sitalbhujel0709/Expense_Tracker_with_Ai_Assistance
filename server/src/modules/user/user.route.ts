import { Router } from "express";
import { UserController } from "./user.controller.js";
import { requireAuth } from "../../middleware/requireAuth.js";

const userRouter:Router = Router();

const userController = new UserController()

userRouter.post('/register',userController.registerUser);
userRouter.post('/login',userController.loginUser)
userRouter.get('/profile',requireAuth,userController.getUserProfile)
userRouter.post('/logout',requireAuth,userController.logoutUser);
userRouter.post('/refresh',userController.refreshAccessToken);
userRouter.put('/profile',requireAuth,userController.updateUserProfile);
export default userRouter;