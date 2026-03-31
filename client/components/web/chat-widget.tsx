"use client";
import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Send, X } from "lucide-react";
import { Input } from "../ui/input";
import axiosInstance from "@/lib/axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const ChatWidget = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! How can I assist you today?" },
  ]);
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");

  const router = useRouter();

  const handleSendMessage = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      setInputDisabled(true);
      return;
    }
    try {
      const newMessage: Message = { role: "user", content: inputText };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputDisabled(true);
      const response = await axiosInstance.post("/chat/ask", {
        question: inputText,
      });
      const assistantMessage: Message = {
        role: "assistant",
        content: response.data.answer,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setInputText("");
      setInputDisabled(false);
      router.refresh();
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
      setInputDisabled(false);
      console.error("Error sending message:", error);
    }
  };
  return (
    <div
      className={`fixed right-4 top-16 z-1000 max-w-lg shadow-xl w-full  ${isOpen ? "block" : "hidden"}`}
    >
      <Card className="w-full h-155 flex flex-col shadow-xl text-emerald-700">
        <CardHeader className="border-b">
          <CardTitle>Sachib Ji</CardTitle>
          <CardAction>
            <Button
              variant={"ghost"}
              size="icon"
              onClick={() => setIsOpen(false)}
              className="rounded-full cursor-pointer"
            >
              <X />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-emerald-600 text-white"
                }`}
              >
                <div className="prose prose-sm dark:prose-invert max-w-none prose-table:border prose-th:bg-muted prose-td:p-2">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter className="bg-white">
          <form className="w-full flex" onSubmit={handleSendMessage}>
            <Input
              placeholder="Type a message"
              className="flex-1 rounded-r-none focus-visible:ring-0 focus-visible:border-emerald-700"
              value={inputText}
              disabled={inputDisabled}
              onChange={(e) => setInputText(e.target.value)}
            />
            <Button className="rounded-l-none bg-emerald-700 flex items-center justify-center">
              <Send />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};
