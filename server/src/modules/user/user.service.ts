import type { Budget, User } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../lib/utils/jwt.js";

export class UserService {

  private prisma = prisma;

  async registerUser(data: Partial<User>): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: data.email!
      }
    })
    if (existingUser) {
      throw new Error("User with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(data.password!, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email!,
        password: hashedPassword,
        name: data.name!,
      }
    })
    return user;
  }
  async loginUser(email: string, password: string): Promise<{ accessToken: string, refreshToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })
    if (!user) {
      throw new Error("User with this email doesn't exist");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    await prisma.session.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    return { accessToken,refreshToken }
  }

  async getUserProfile(userId: string): Promise<Partial<User> & { budget: Budget | null }> {
    {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId
        },
        include: {
          budget: true
        }
      })
      if (!user) {
        throw new Error("user not found");
      }
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        budget: user.budget
      }
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string, refreshToken: string }> {
    const decoded:any = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY!);
    const session = await this.prisma.session.findFirst({
      where:{
        AND:[
          { token: refreshToken },
          { expiresAt: { gt: new Date() } },
          { userId: decoded.userId }
        ]
       
      }
    })
    if(!session){
      throw new Error("Invalid refresh token");
    }
    const accessToken = generateAccessToken(decoded.userId);
    const newRefreshToken:string = generateRefreshToken(decoded.userId);
    await this.prisma.session.updateMany({
      where: {
        
           token: refreshToken ,
            userId: decoded.userId
      },
      data: {
        token: newRefreshToken
      }
    });
    return { accessToken, refreshToken: newRefreshToken };

  }
}