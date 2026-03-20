"use client";

import axiosInstance from "@/lib/axios";
import { createContext, useEffect, useState } from "react";

interface UserContextType {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  budget: any;
}

const UserContext = createContext<{ user: UserContextType | null; loading: boolean } | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<UserContextType | null>(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const response = await axiosInstance.get("/user/profile");
        setUser(response.data as UserContextType);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  },[])
  return (
    <UserContext.Provider value={{user,loading}}>
      {children}
    </UserContext.Provider>
  )
}