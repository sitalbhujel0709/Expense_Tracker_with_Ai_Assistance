import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId:string):string => {
  const secretKey = process.env.ACCESS_SECRET_KEY!;
  const token = jwt.sign({userId},secretKey,{expiresIn:"15m"})
  return token;
}

export const generateRefreshToken = (userId:string):string =>{
  const secretKey = process.env.REFRESH_SECRET_KEY!;
  const token = jwt.sign({userId},secretKey,{expiresIn:"7d"})
  return token;
}