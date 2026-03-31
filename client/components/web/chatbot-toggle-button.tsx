"use client";
import { BotMessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export const ChatbotToggleButton = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  return (
    <Button
      variant={"ghost"}
      size="icon-lg"
      className="bg-emerald-600 rounded-full cursor-pointer ml-auto mr-4 hover:bg-emerald-700 hover:shadow-md"
      onClick={() => setIsOpen(true)}
    >
      <BotMessageSquare className="text-white" />
    </Button>
  );
};
