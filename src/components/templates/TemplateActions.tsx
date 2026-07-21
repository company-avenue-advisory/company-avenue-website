"use client";
import { useState } from "react";
import Link from "next/link";
import { Copy, Check, Download, ArrowRight } from "lucide-react";
import type { Template } from "@/lib/templates";

/**
 * Copy / download controls for a template. Client-only because both need
 * browser APIs — the template body itself is server-rendered by the page so
 * it stays crawlable.
 */
export function TemplateActions({ template }: { template: Template }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.body);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const handleDownload = () => {
    // Wrap the plaintext body in a minimal Word-compatible HTML document so it
    // opens cleanly in MS Word / Google Docs as an editable .doc file.
    const html = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${template.title}</title></head><body><pre style="font-family:Calibri,Arial,sans-serif;font-size:11pt;white-space:pre-wrap;">${template.body
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</pre></body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${template.slug}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-700 text-sm font-heading font-semibold rounded-xl hover:border-primary hover:text-primary transition-colors"
      >
        {copied ? <Check size={15} className="text-green-600" /> : <Copy size={15} />}
        {copied ? "Copied!" : "Copy text"}
      </button>
      <button
        onClick={handleDownload}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary hover:bg-primary-800 text-white text-sm font-heading font-semibold rounded-xl transition-colors"
      >
        <Download size={15} /> Download (.doc)
      </button>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent/10 text-accent-dark hover:bg-accent/20 text-sm font-heading font-semibold rounded-xl transition-colors whitespace-nowrap"
      >
        Get it customised by a CA <ArrowRight size={14} />
      </Link>
    </div>
  );
}
