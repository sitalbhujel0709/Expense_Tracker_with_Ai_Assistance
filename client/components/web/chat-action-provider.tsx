"use client"
import { useState } from "react";
import { ChatWidget } from "./chat-widget"
import { ChatbotToggleButton } from "./chatbot-toggle-button"


export const ChatAction = ()=> {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  return(
    <div>
      <ChatbotToggleButton setIsOpen={setIsChatOpen}/>
      <ChatWidget isOpen={isChatOpen} setIsOpen={setIsChatOpen}/>
    </div>
  )
}