"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const validateForm = ()=>{
    if(!email || !password){
      alert("Please fill in all fields");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post('/users/login', {email,password});

      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error)
      alert("Login failed");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm bg-gray-50 text-emerald-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Login to your account</CardTitle>
          <CardAction>
            <Button variant={"link"} className="text-emerald-700">
              <Link href="/register">Sign Up</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input id="password" type="password" placeholder="********" required onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setPassword(e.target.value)} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleSubmit} className="w-full bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
