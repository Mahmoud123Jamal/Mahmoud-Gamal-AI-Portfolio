"use client";

import React, { useState } from "react";
import { MessageSquareCode, SendHorizonal, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function ChatAi() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello! I'm your AI assistant. How can I help you today?",
    },
  ]);

  const suggestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "Who are you ?",
  ];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 p-4 bg-zinc-900 text-white rounded-full shadow-2xl hover:bg-zinc-800 transition-colors border border-white/10 flex items-center justify-center group"
        >
          <MessageSquareCode className="size-6" />
          <span className="absolute right-16 bg-white text-zinc-900 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-zinc-200 shadow-sm pointer-events-none font-medium">
            Chat with AI
          </span>
        </motion.button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-white border-l-zinc-200 text-zinc-900 w-full sm:max-w-md p-0 flex flex-col"
      >
        <SheetHeader className="p-6 border-b border-zinc-100 bg-zinc-50/50">
          <SheetTitle className="text-zinc-900 flex items-center gap-2">
            <div className="size-2 bg-zinc-400 rounded-full animate-pulse" />
            AI Assistant
          </SheetTitle>
          <SheetDescription className="text-zinc-500">
            Ask me anything about my experience and projects.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={cn(
                  "p-3 rounded-2xl text-sm max-w-[85%] leading-relaxed border",
                  msg.role === "ai"
                    ? "bg-zinc-100 border-zinc-200 rounded-tl-none self-start text-zinc-800"
                    : "bg-zinc-900 border-zinc-900 text-white rounded-tr-none ml-auto shadow-md"
                )}
              >
                {msg.content}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="px-6 py-2 flex flex-wrap gap-2 bg-white">
          {suggestions.map((s, i) => (
            <button
              key={i}
              onClick={() => handleSend(s)}
              className="text-[10px] md:text-xs bg-white border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 py-1.5 px-3 rounded-full text-zinc-600 transition-all flex items-center gap-1 group/btn"
            >
              <Sparkles className="size-3 text-zinc-400 group-hover/btn:text-zinc-600 transition-colors" />
              {s}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-100 bg-zinc-50/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="relative flex items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-white border border-zinc-200 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 transition-all text-zinc-900 placeholder:text-zinc-400 shadow-sm"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute right-2 p-2 text-zinc-900 hover:text-zinc-600 transition-colors disabled:opacity-20"
            >
              <SendHorizonal className="size-5" />
            </button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
