"use client";

import dynamic from "next/dynamic";

const DynamicChat = dynamic(
  () => import("@/components/ui/ChatAi").then((mod) => mod.ChatAi),
  { ssr: false }
);

export default function ChatAiWrapper() {
  return <DynamicChat />;
}
