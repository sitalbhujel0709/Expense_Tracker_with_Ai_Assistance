"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";
import { useUser } from "./user-provider";
import { Button } from "../ui/button";
import { Pen } from "lucide-react";
import axiosInstance from "@/lib/axios";

const UpdateProfileForm = () => {
  const { user } = useUser();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const ValidateInput = ():boolean => {
    if(name.trim() === "" || email.trim() === ""){
      return false;
    }
    if(user?.name === name && user?.email === email){
      return false;
    }
    return true;
  }

  const handleSaveChanges = async ()=>{
    if(!ValidateInput()){
      return;
    }
    try {
      await axiosInstance.put("/users/profile", { name, email });
      alert("Profile updated successfully");
      window.location.reload();
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      alert("Failed to update profile");
    }
  }
  return (
    <div className="max-w-4xl w-full h-auto mx-auto p-6 text-emerald-700 ">
      <h2 className="text-2xl font-bold mb-4">Update Profile Settings</h2>
      <div className="w-full border rounded-lg flex gap-6 shadow-md relative">
        <div className="bg-emerald-700 rounded-l-lg p-4 flex items-center justify-center">
          <Avatar className="w-24 h-24 bg-white">
            <AvatarFallback className="text-4xl font-semibold text-emerald-700">
              {user?.name
                .split(" ")
                .map((n) => n.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="py-4 space-y-6">
          <FieldSet className="flex flex-row items-end ">
            <FieldLabel htmlFor="name">Name: </FieldLabel>
            <div className="flex flex-row border-b-2 px-2 items-end focus-within:border-emerald-700">
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-none outline-0 -mb-2 focus-visible:ring-0 "
              />
              <FieldLabel htmlFor="name">
                <Pen className="size-4 text-emerald-700" />
              </FieldLabel>
            </div>
          </FieldSet>
          <FieldSet className="flex flex-row items-end">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <div className="flex flex-row border-b-2 px-2 items-end focus-within:border-emerald-700">
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="-mb-2 border-none focus-visible:ring-0 "
              />
              <FieldLabel htmlFor="email">
                <Pen className="size-4 text-emerald-700" />
              </FieldLabel>
            </div>
          </FieldSet>
        </div>
        <div>
          <Button onClick={handleSaveChanges} className="absolute bottom-4 right-4 hover:bg-emerald-700 hover:text-white cursor-pointer" variant={"outline"}>
            Save Changes
            </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
