"use client"
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

export default function Registerpage() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const validateForm = ()=>{
    if(!email || !name || !password){
      alert("Please fill in all fields");
      return false;
    }
    return true;
  }
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axiosInstance.post('/users/register', {email,name,password});

      console.log(response.data);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Registration failed. Please try again.");
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm text-emerald-700 bg-gray-50">
        <CardHeader>
          <CardTitle>Register for an account</CardTitle>
          <CardAction>
            <Button variant={"link"} className="text-emerald-700">
              <Link href="/login">Sign In</Link>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" onClick={handleSubmit} className="w-full bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer">
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
