import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
export class UserController {

  private userService = new UserService();

  registerUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password, name } = req.body;
      if (!email || !password || !name) {
        return res.status(400).json({ message: "Email, password and name are required" });
      }
      const user = await this.userService.registerUser({ email, password, name });
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
  }

  loginUser = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const { accessToken, refreshToken } = await this.userService.loginUser(email, password);
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      })
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })

      res.status(200).json({ message: "Login successful" });
    } catch (error: any) {
      console.error("Login error:", error.message);
      return res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
  }

  getUserProfile = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const userId = (req as any).userId;
      const userProfile = await this.userService.getUserProfile(userId);
      res.status(200).json({ user: userProfile });
    } catch (error) {
      console.log("Get user profile error:", error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
  }
  refreshAccessToken = async (req: Request, res: Response): Promise<void | Response> => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const newAccessToken = await this.userService.refreshAccessToken(refreshToken)
      const { accessToken, refreshToken: newRefreshToken } = newAccessToken;
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000
      });
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.status(200).json({ message: "Access token refreshed successfully" });
    } catch (error) {
      console.error("Refresh access token error:", error instanceof Error ? error.message : error);
      res.status(401).json({ message: "Unauthorized" });

    }
  }
  logoutUser = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      await this.userService.logoutUser((req as any).userId, req.cookies.refreshToken);
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
      console.error("Logout error:", error instanceof Error ? error.message : error);
      res.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
    }
  }
}