"use client";

import axiosInstance from "@/lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  budget: any;
}

interface UserProfileResponse {
  user: UserContextType;
}

const UserContext = createContext<{ user: UserContextType | null; loading: boolean } | null>(null);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user,setUser] = useState<UserContextType | null>(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchUser = async ()=>{
      try {
        const response = await axiosInstance.get<UserProfileResponse>("/users/profile");
        setUser(response.data.user);
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

export const useUser = ()=> {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}