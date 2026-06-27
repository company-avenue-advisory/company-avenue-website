"use client";
import dynamic from "next/dynamic";

// Lazy-load the chatbot bundle — don't load until needed
const AvenueAI = dynamic(
  () => import("./AvenueAI").then(mod => ({ default: mod.AvenueAI })),
  { ssr: false }
);

export function AvenueAILoader() {
  return <AvenueAI />;
  
}
