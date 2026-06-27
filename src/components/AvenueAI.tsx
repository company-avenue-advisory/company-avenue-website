"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  X, Minus, Send, RotateCcw, Paperclip, ChevronRight,
} from "lucide-react";
import {
  QUICK_ACTIONS, SUGGESTED_QUESTIONS, WELCOME_CAPABILITIES,
} from "@/lib/avenue-ai-knowledge";
import type { ChatMessage } from "@/app/api/avenue-ai/route";

/* ─── Types ─── */
interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  streaming?: boolean;
}

/* ─── Avatar SVG ─── */
function AvenueAIAvatar({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="av-grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0F2D52" />
          <stop offset="100%" stopColor="#1a6fa8" />
        </linearGradient>
      </defs>
      {/* Head */}
      <rect x="8" y="10" width="24" height="20" rx="6" fill="url(#av-grad)" />
      {/* Eyes */}
      <circle cx="15" cy="19" r="2.5" fill="white" />
      <circle cx="25" cy="19" r="2.5" fill="white" />
      {/* Pupils */}
      <circle cx="15.5" cy="19.5" r="1.2" fill="#0F2D52" />
      <circle cx="25.5" cy="19.5" r="1.2" fill="#0F2D52" />
      {/* Smile */}
      <path d="M15 25 Q20 28 25 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* Antenna */}
      <line x1="20" y1="10" x2="20" y2="6" stroke="#D6A64F" strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="5" r="2" fill="#D6A64F" />
      {/* Ears */}
      <rect x="4" y="16" width="4" height="8" rx="2" fill="url(#av-grad)" />
      <rect x="32" y="16" width="4" height="8" rx="2" fill="url(#av-grad)" />
    </svg>
  );
}

/* ─── Floating Button SVG ─── */
function FloatingButtonIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isOpen ? (
        <motion.div key="close"
          initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
        >
          <X size={24} className="text-white" />
        </motion.div>
      ) : (
        <motion.div key="bot"
          initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
        >
          <AvenueAIAvatar size={40} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Typing indicator ─── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div key={i}
          className="w-2 h-2 rounded-full bg-slate-400"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

/* ─── Markdown-lite renderer ─── */
function MessageContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let tableLines: string[] = [];
  let inTable = false;

  const renderInline = (text: string, key: string | number) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return (
      <span key={key}>
        {parts.map((part, i) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={i} className="font-semibold text-dark">{part.slice(2, -2)}</strong>
            : part
        )}
      </span>
    );
  };

  const flushTable = (idx: number) => {
    if (tableLines.length >= 2) {
      const headers = tableLines[0].split("|").map(s => s.trim()).filter(Boolean);
      const rows = tableLines.slice(2).map(r => r.split("|").map(s => s.trim()).filter(Boolean));
      elements.push(
        <div key={`table-${idx}`} className="overflow-x-auto my-2 rounded-xl border border-slate-200">
          <table className="w-full text-xs">
            <thead className="bg-primary/8">
              <tr>{headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-heading font-semibold text-dark">{h}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  {row.map((cell, ci) => <td key={ci} className="px-3 py-2 text-slate-600">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableLines = [];
    inTable = false;
  };

  lines.forEach((line, idx) => {
    if (line.startsWith("|")) {
      inTable = true;
      tableLines.push(line);
      return;
    }
    if (inTable) flushTable(idx);

    if (!line.trim()) {
      elements.push(<div key={idx} className="h-1.5" />);
    } else if (line.startsWith("- ") || line.startsWith("• ")) {
      elements.push(
        <div key={idx} className="flex items-start gap-2 text-slate-700 text-sm leading-snug">
          <span className="text-primary mt-1.5 shrink-0">•</span>
          <span>{renderInline(line.slice(2), idx)}</span>
        </div>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1];
      elements.push(
        <div key={idx} className="flex items-start gap-2 text-slate-700 text-sm leading-snug">
          <span className="text-primary font-semibold shrink-0 w-4">{num}.</span>
          <span>{renderInline(line.replace(/^\d+\.\s/, ""), idx)}</span>
        </div>
      );
    } else if (line.startsWith("###")) {
      elements.push(<p key={idx} className="font-heading font-bold text-dark text-sm mt-1">{line.slice(4)}</p>);
    } else if (line.startsWith("##")) {
      elements.push(<p key={idx} className="font-heading font-bold text-dark text-sm mt-1">{line.slice(3)}</p>);
    } else if (line.startsWith("#")) {
      elements.push(<p key={idx} className="font-heading font-bold text-dark text-base mt-1">{line.slice(2)}</p>);
    } else {
      elements.push(<p key={idx} className="text-slate-700 text-sm leading-relaxed">{renderInline(line, idx)}</p>);
    }
  });

  if (inTable) flushTable(lines.length);
  return <div className="space-y-1">{elements}</div>;
}

/* ─── Local storage helpers ─── */
const STORAGE_KEY = "avenue-ai-messages";
function loadMessages(): Message[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw).map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) }));
  } catch { return []; }
}
function saveMessages(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs.slice(-50))); } catch { /* ignore */ }
}

/* ══════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════ */
export function AvenueAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulseTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* Load from localStorage on mount */
  useEffect(() => {
    const saved = loadMessages();
    if (saved.length > 0) { setMessages(saved); setShowWelcome(false); }
  }, []);

  /* Tooltip after 5s */
  useEffect(() => {
    tooltipTimerRef.current = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 5000);
    return () => { if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current); };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) { setShowTooltip(false); setUnreadCount(0); }
  }, [isOpen]);

  /* Scroll to bottom */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  /* Save messages */
  useEffect(() => {
    if (messages.length) saveMessages(messages);
  }, [messages]);

  /* Focus input when opened */
  useEffect(() => {
    if (isOpen && !isMinimized) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen, isMinimized]);

  /* ESC to close */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading || isStreaming) return;

    setInput("");
    setShowWelcome(false);
    setIsLoading(true);

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content, timestamp: new Date() };
    const aiMsgId = crypto.randomUUID();
    const aiMsg: Message = { id: aiMsgId, role: "assistant", content: "", timestamp: new Date(), streaming: true };

    setMessages(prev => [...prev, userMsg, aiMsg]);

    const history: ChatMessage[] = [
      ...messages.map(m => ({ role: m.role, content: m.content })),
      { role: "user", content },
    ];

    try {
      abortRef.current = new AbortController();
      const res = await fetch("/api/avenue-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("API error");
      setIsLoading(false);
      setIsStreaming(true);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const { content: chunk } = JSON.parse(data);
            if (chunk) {
              accumulated += chunk;
              setMessages(prev =>
                prev.map(m => m.id === aiMsgId ? { ...m, content: accumulated } : m)
              );
            }
          } catch { /* skip */ }
        }
      }

      setMessages(prev => prev.map(m => m.id === aiMsgId ? { ...m, streaming: false } : m));
      if (isMinimized) setUnreadCount(c => c + 1);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setMessages(prev => prev.map(m =>
        m.id === aiMsgId
          ? { ...m, content: "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at +91 98765 43210.", streaming: false }
          : m
      ));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [input, isLoading, isStreaming, messages, isMinimized]);

  function clearChat() {
    abortRef.current?.abort();
    setMessages([]);
    setShowWelcome(true);
    setUnreadCount(0);
    localStorage.removeItem(STORAGE_KEY);
  }

  const formatTime = (d: Date) => d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* ── Floating Button ── */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-card px-4 py-3 max-w-[220px] text-right"
            >
              <p className="text-dark text-xs font-heading font-semibold mb-1">Hi 👋</p>
              <p className="text-muted text-xs mb-2">Need help choosing the right business registration?</p>
              <button
                onClick={() => { setIsOpen(true); setShowTooltip(false); }}
                className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg font-heading font-semibold hover:bg-[#0a2444] transition-colors"
              >
                Ask Avenue AI
              </button>
              <button
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
                aria-label="Dismiss tooltip"
              >
                <X size={12} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main FAB */}
        <motion.button
          onClick={() => { setIsOpen(!isOpen); setIsMinimized(false); }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Open Avenue AI assistant"
          className="relative w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(15,45,82,0.35)] focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
          style={{ background: "linear-gradient(135deg, #0F2D52 0%, #1a6fa8 100%)" }}
        >
          {/* Pulse halo */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: "linear-gradient(135deg, #0F2D52 0%, #1a6fa8 100%)" }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 8 }}
          />
          <FloatingButtonIcon isOpen={isOpen} />

          {/* Unread badge */}
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.div>
          )}
        </motion.button>
      </div>

      {/* ── Chat Window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed bottom-[100px] right-6 z-[9998] w-[calc(100vw-3rem)] max-w-[380px] flex flex-col rounded-[24px] overflow-hidden shadow-[0_24px_80px_rgba(15,45,82,0.22)] border border-slate-200/80"
            style={{ height: isMinimized ? "auto" : "min(640px, calc(100vh - 140px))" }}
            onWheel={e => e.stopPropagation()}
            role="dialog"
            aria-label="Avenue AI chat assistant"
          >
            {/* Header */}
            <div
              className="shrink-0 flex items-center gap-3 px-4 py-3"
              style={{ background: "linear-gradient(135deg, #0F2D52 0%, #1565a8 100%)" }}
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                  <AvenueAIAvatar size={28} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-[#0F2D52]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-white text-sm leading-none">Avenue AI</p>
                <p className="text-white/60 text-[11px] mt-0.5">Usually replies instantly</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label={isMinimized ? "Expand" : "Minimize"}
                >
                  <Minus size={13} className="text-white" />
                </button>
                <button
                  onClick={clearChat}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Clear conversation"
                >
                  <RotateCcw size={13} className="text-white" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Close chat"
                >
                  <X size={13} className="text-white" />
                </button>
              </div>
            </div>

            {/* Body — hidden when minimized */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col flex-1 min-h-0 bg-white"
                >
                  {/* Messages area */}
                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0 scroll-smooth overscroll-contain"
                    onWheel={e => e.stopPropagation()}
                    onTouchMove={e => e.stopPropagation()}
                  >

                    {/* Welcome screen */}
                    {showWelcome && messages.length === 0 && (
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }} className="space-y-4"
                      >
                        {/* Illustration */}
                        <div className="flex flex-col items-center text-center pt-2 pb-4">
                          <div className="w-20 h-20 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
                            <AvenueAIAvatar size={52} />
                          </div>
                          <h3 className="font-heading font-bold text-dark text-base mb-1">Welcome to Avenue AI</h3>
                          <p className="text-muted text-xs leading-relaxed max-w-[260px]">
                            I&apos;m your AI business assistant. I can help you with:
                          </p>
                        </div>

                        {/* Capabilities */}
                        <div className="grid grid-cols-2 gap-1.5">
                          {WELCOME_CAPABILITIES.map(cap => (
                            <div key={cap} className="flex items-start gap-1.5 bg-slate-50 rounded-xl px-2.5 py-2 border border-slate-100">
                              <span className="text-primary text-[10px] mt-0.5 shrink-0">✓</span>
                              <span className="text-dark text-[11px] leading-snug font-medium">{cap}</span>
                            </div>
                          ))}
                        </div>

                        {/* Quick action pills */}
                        <div>
                          <p className="text-[11px] font-heading font-semibold text-muted uppercase tracking-wider mb-2">Quick Actions</p>
                          <div className="flex flex-wrap gap-1.5">
                            {QUICK_ACTIONS.map(a => (
                              <button key={a.label}
                                onClick={() => sendMessage(a.prompt)}
                                className="px-3 py-1.5 bg-primary/8 hover:bg-primary hover:text-white text-primary text-xs font-heading font-semibold rounded-full border border-primary/20 transition-all"
                              >
                                {a.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Message list */}
                    {messages.map((msg, i) => (
                      <motion.div key={msg.id}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: i === messages.length - 1 ? 0 : 0 }}
                        className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* Avatar */}
                        {msg.role === "assistant" && (
                          <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-1">
                            <AvenueAIAvatar size={18} />
                          </div>
                        )}

                        <div className={`max-w-[85%] space-y-1 ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                          <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                            msg.role === "user"
                              ? "bg-primary text-white rounded-tr-sm"
                              : "bg-slate-50 border border-slate-100 rounded-tl-sm"
                          }`}>
                            {msg.role === "user"
                              ? <p className="text-white text-sm">{msg.content}</p>
                              : msg.content
                                ? <MessageContent content={msg.content} />
                                : <TypingDots />
                            }
                            {msg.streaming && msg.content && (
                              <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="inline-block w-0.5 h-3.5 bg-primary ml-0.5 align-middle"
                              />
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 px-1">{formatTime(msg.timestamp)}</p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading dots when waiting for first token */}
                    {isLoading && (
                      <div className="flex gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center shrink-0">
                          <AvenueAIAvatar size={18} />
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-sm">
                          <TypingDots />
                        </div>
                      </div>
                    )}

                    {/* Suggested questions after AI responds */}
                    {!showWelcome && messages.length > 0 && !isLoading && !isStreaming && messages.at(-1)?.role === "assistant" && (
                      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-[10px] font-heading font-semibold text-muted uppercase tracking-wider mb-1.5">Suggested</p>
                        <div className="flex flex-wrap gap-1.5">
                          {SUGGESTED_QUESTIONS.slice(0, 4).map(q => (
                            <button key={q}
                              onClick={() => sendMessage(q)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-heading font-semibold text-primary bg-primary/5 hover:bg-primary hover:text-white rounded-full border border-primary/15 transition-all"
                            >
                              {q} <ChevronRight size={9} />
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input bar */}
                  <div className="shrink-0 border-t border-slate-100 px-3 py-3 bg-white">
                    <form
                      onSubmit={e => { e.preventDefault(); sendMessage(); }}
                      className="flex items-center gap-2"
                    >
                      <button
                        type="button"
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center shrink-0 transition-colors"
                        aria-label="Attach file"
                        title="File upload coming soon"
                        onClick={() => {}}
                      >
                        <Paperclip size={14} className="text-slate-500" />
                      </button>
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Ask about registration, GST, taxes..."
                        disabled={isLoading || isStreaming}
                        aria-label="Chat input"
                        className="flex-1 text-sm text-dark placeholder-slate-400 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:border-primary transition-colors disabled:opacity-50"
                      />
                      <button
                        type="submit"
                        disabled={!input.trim() || isLoading || isStreaming}
                        aria-label="Send message"
                        className="w-8 h-8 rounded-xl bg-primary hover:bg-[#0a2444] flex items-center justify-center shrink-0 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Send size={13} className="text-white" />
                      </button>
                    </form>
                    <p className="text-[10px] text-slate-400 text-center mt-1.5">
                      Avenue AI · <Link href="/contact" className="hover:text-primary transition-colors">Book free consultation</Link>
                    </p>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
