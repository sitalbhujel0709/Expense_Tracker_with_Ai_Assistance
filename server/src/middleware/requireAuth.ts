import type { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken"
export const requireAuth = (req:Request,res:Response,next:NextFunction):void|Response => {
  const accessToken = req.cookies.accessToken;
  try {
    if(!accessToken){
      return res.status(401).json({message:"Unauthorized"});
    }
    const decoded = jwt.verify(accessToken,process.env.ACCESS_SECRET_KEY!);
    (req as any).userId = (decoded as any).userId;
    next();

  } catch (error) {
    return res.status(401).json({message:"Unauthorized"});
  }
}