"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquareCode,
  SendHorizonal,
  Sparkles,
  Loader2,
  Bot,
  User,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "ai";
  content: string;
}

export function ChatAi() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content:
        "Hello! I'm your portfolio AI assistant. I can tell you about projects, skills, and experience. How can I help you today?",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const suggestions = [
    "What projects have you worked on?",
    "What are your technical skills?",
    "Tell me about your experience",
    "What technologies do you use?",
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            {
              role: "ai",
              content: data.reply,
            },
          ]);
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } else if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "ai",
            content: data.reply,
          },
        ]);
      } else {
        throw new Error(data.error || "No response received");
      }
    } catch (error: any) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (!isLoading) {
      handleSend(suggestion);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      handleSend(input);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        content:
          "Hello! I'm your portfolio AI assistant. I can tell you about projects, skills, and experience. How can I help you today?",
      },
    ]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-linear-to-br from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 border border-white/20 flex items-center justify-center group cursor-pointer"
          aria-label="Open chat with AI assistant"
        >
          <MessageSquareCode className="size-6" />
          <span className="absolute right-16 bg-white text-gray-900 text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-200 shadow-lg pointer-events-none font-medium">
            Ask AI Assistant
          </span>
          <span className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full animate-pulse border border-white" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="bg-linear-to-b from-gray-50 to-white border-l-gray-200 text-gray-900 w-full sm:max-w-md p-0 flex flex-col md:h-[90vh] mt-16 "
      >
        <SheetHeader className="p-6 border-b border-gray-200 bg-white/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg">
                <Bot className="size-5 text-white" />
              </div>
              <div>
                <SheetTitle className="text-gray-900 text-lg font-bold">
                  Portfolio AI Assistant
                </SheetTitle>
                <SheetDescription className="text-gray-600 text-sm">
                  Ask about projects, skills & experience
                </SheetDescription>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1 rounded-full border border-gray-200 hover:border-gray-300 transition-colors"
              aria-label="Clear chat"
              type="button"
            >
              Clear
            </button>
          </div>
        </SheetHeader>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scroll-smooth"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn(
                "flex gap-3",
                msg.role === "ai" ? "self-start" : "self-end flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "shrink-0 size-8 rounded-full flex items-center justify-center",
                  msg.role === "ai"
                    ? "bg-linear-to-br from-blue-500 to-purple-500"
                    : "bg-linear-to-br from-gray-700 to-gray-900"
                )}
              >
                {msg.role === "ai" ? (
                  <Bot className="size-4 text-white" />
                ) : (
                  <User className="size-4 text-white" />
                )}
              </div>
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 max-w-[85%] wrap-break-word shadow-sm",
                  msg.role === "ai"
                    ? "bg-white border border-gray-200 rounded-tl-none text-gray-800"
                    : "bg-linear-to-br from-gray-900 to-gray-800 text-white rounded-tr-none shadow-md"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 self-start">
              <div className="shrink-0 size-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Bot className="size-4 text-white" />
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 bg-white/80 p-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                disabled={isLoading}
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs bg-white border border-gray-200 hover:border-blue-300 hover:bg-blue-50 py-2 px-3 rounded-full text-gray-700 hover:text-blue-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                aria-label={`Quick suggestion: ${suggestion}`}
              >
                <Sparkles className="size-3 text-blue-500" />
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isLoading
                  ? "AI assistant is thinking..."
                  : "Ask about projects, skills, or experience..."
              }
              className="w-full bg-white border border-gray-200 rounded-full py-3 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-200 text-gray-900 placeholder:text-gray-400 shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
              aria-label="Type your message"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  if (input.trim() && !isLoading) {
                    handleSend(input);
                  }
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-700 hover:text-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <SendHorizonal className="size-5" />
            </button>
          </form>

          <div className="text-xs text-gray-400 text-center mt-3">
            AI Assistant powered by meta-llama • Responses based on real
            portfolio data
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
