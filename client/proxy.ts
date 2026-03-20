import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req:NextRequest){
  const accessToken = req.cookies.get("accessToken")?.value;
  if(!accessToken){
    return NextResponse.redirect(new URL("/login",req.url))
  }
  try {
    jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY!)
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login",req.url))
  }
}

export const config = {
  matcher:[
    "/"
  ]
}
