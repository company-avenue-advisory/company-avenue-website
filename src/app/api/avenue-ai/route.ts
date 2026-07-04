import { NextRequest, NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/avenue-ai-knowledge";

/* ─────────────────────────────────────────────────────────────
   Provider abstraction — swap Groq for OpenAI or any other
   model by changing PROVIDER and the fetch call below.
───────────────────────────────────────────────────────────── */
const PROVIDER = process.env.AI_PROVIDER ?? "mock"; // "groq" | "openai" | "mock"
const GROQ_API_KEY = process.env.GROQ_API_KEY ?? "";
const GROQ_MODEL = process.env.GROQ_MODEL ?? "llama3-8b-8192";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY ?? "";
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/* ─── Mock response generator (no API key needed) ─── */
function getMockResponse(userMessage: string): string {
  const msg = userMessage.toLowerCase();

  if (msg.includes("private limited") || msg.includes("pvt ltd") || msg.includes("company"))
    return "A **Private Limited Company** is the most preferred structure for startups in India.\n\n**Key facts:**\n- Minimum 2 directors and 2 shareholders\n- Separate legal entity with limited liability\n- Best for raising investment from angels or VCs\n- Timeline: 7–10 working days\n- Governed by Companies Act, 2013\n\nWould you like me to compare it with LLP or OPC, or help you get started?";

  if (msg.includes("llp") || msg.includes("limited liability partnership"))
    return "An **LLP (Limited Liability Partnership)** combines the flexibility of a partnership with limited liability protection.\n\n**Best for:** Professionals, consultants, law firms, and agencies.\n\n**Advantages over Pvt Ltd:**\n- Lower compliance burden\n- No minimum capital requirement\n- Flexible management structure\n\nWould you like to compare LLP vs Private Limited Company?";

  if (msg.includes("opc") || msg.includes("one person"))
    return "An **OPC (One Person Company)** is perfect if you want to run a business solo with the protection of a company structure.\n\n**Key requirements:**\n- Only Indian citizens and residents can incorporate\n- A nominee is mandatory\n- Cannot raise equity investment\n- Timeline: 7–10 working days\n\nFor solo entrepreneurs, OPC offers the best of both worlds — full ownership and limited liability.";

  if (msg.includes("gst") && (msg.includes("register") || msg.includes("need") || msg.includes("mandatory")))
    return "**GST Registration** is mandatory if:\n\n- Annual turnover exceeds ₹40 lakhs (goods) or ₹20 lakhs (services)\n- You sell on Amazon, Flipkart, or any e-commerce marketplace\n- You supply goods/services interstate\n- You export or import\n\n**Timeline:** GSTIN issued in 2–7 working days.\n\nNot sure if you need GST? Tell me about your business and I'll advise you.";

  if (msg.includes("trademark"))
    return "**Trademark Registration** protects your brand name, logo, and slogan legally.\n\n**Key facts:**\n- Valid for 10 years, renewable indefinitely\n- You can use ™ immediately after filing\n- ® symbol only after registration certificate\n- 45 trademark classes — choosing the right one is critical\n- Timeline: 18–24 months for full certificate\n\nWhat type of mark do you want to protect — a business name, logo, or slogan?";

  if (msg.includes("itr") || msg.includes("income tax"))
    return "For **Income Tax Return (ITR)** filing, the right form depends on your income type:\n\n| Form | Applicable To |\n|------|---------------|\n| ITR-1 | Salaried individuals |\n| ITR-2 | Capital gains |\n| ITR-3 | Business/professional income |\n| ITR-4 | Presumptive taxation |\n| ITR-5 | LLPs & firms |\n| ITR-6 | Companies |\n\nWhat is your income source? I'll recommend the right form.";

  if (msg.includes("compare") || msg.includes("difference") || msg.includes("vs"))
    return "Great question. Here's a quick comparison of the most common structures:\n\n| Feature | Sole Prop | OPC | LLP | Pvt Ltd |\n|---------|-----------|-----|-----|--------|\n| Owners | 1 | 1 | 2+ | 2–200 |\n| Liability | Unlimited | Limited | Limited | Limited |\n| Investment | ✗ | ✗ | Limited | ✓ |\n| Compliance | Low | Moderate | Low | Moderate |\n\nWould you like a detailed comparison of any two structures?";

  if (msg.includes("document") || msg.includes("required") || msg.includes("checklist"))
    return "For most registrations, you'll need:\n\n**Identity & Address:**\n- PAN Card\n- Aadhaar Card\n- Passport-size photograph\n\n**Business Address:**\n- Electricity bill or property tax receipt\n- Rent agreement (if rented)\n- NOC from property owner\n\n**Additional (for companies):**\n- DSC (Digital Signature Certificate)\n- DIN (Director Identification Number)\n\nWhich specific registration are you planning? I'll give you the exact checklist.";

  if (msg.includes("cost") || msg.includes("fee") || msg.includes("price") || msg.includes("charge"))
    return "Here are approximate starting fees at Company Avenue:\n\n- **OPC Registration:** from ₹4,999\n- **LLP Registration:** from ₹4,999\n- **Private Limited:** from ₹6,999\n- **GST Registration:** from ₹999\n- **Trademark (per class):** from ₹4,999\n- **ITR Filing (individual):** from ₹499\n\n*Final pricing depends on your state, complexity, and add-on services.*\n\nWant an exact quote? Our experts provide a free consultation with full pricing transparency.";

  if (msg.includes("consultation") || msg.includes("expert") || msg.includes("call") || msg.includes("speak"))
    return "I'd be happy to connect you with one of our Chartered Accountants for a **free consultation**.\n\nPlease share:\n1. Your name\n2. Phone number\n3. Service you're interested in\n4. Preferred time (morning/afternoon/evening)\n\nAlternatively, you can reach us directly:\n- 📞 +91 99537 19111\n- ✉️ info@companyavenueadvisory.com\n- Working hours: Mon–Sat, 9 AM – 7 PM";

  if (msg.includes("msme") || msg.includes("udyam"))
    return "**MSME / Udyam Registration** is free and offers significant benefits:\n\n- Priority sector lending from banks\n- Subsidised government schemes\n- Reduced trademark fee (₹4,500 vs ₹9,000/class)\n- Protection against delayed payments\n- DPIIT startup recognition eligibility\n\nAny business — proprietorship, LLP, company — can register. Would you like help with the registration process?";

  if (msg.includes("startup india") || msg.includes("dpiit"))
    return "**Startup India / DPIIT Recognition** provides:\n\n- Income Tax exemption under Section 80IAC (3 years)\n- Capital gains tax exemption\n- IPR fast-track processing\n- Access to Fund of Funds\n- Self-certification for 6 labour laws\n\n**Eligibility:** Company < 10 years old, turnover < ₹100 crore, and working on innovation.\n\nWant to check if your startup qualifies?";

  if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey") || msg.includes("start"))
    return "Hello! I'm Avenue AI, your business compliance assistant.\n\nI can help you with company registration, GST, trademark, income tax, and all compliance matters for your business in India.\n\nWhat are you looking to do today?";

  return "That's a great question. Let me help you with that.\n\nCould you share a bit more context about your business situation? For example:\n- Are you starting a new business or managing an existing one?\n- What industry or sector are you in?\n\nWith that context, I can give you a much more specific and useful answer. Our experts are also available for a free consultation if you'd prefer to speak directly.";
}

/* ─── Groq streaming handler ─── */
async function streamGroq(messages: ChatMessage[]): Promise<Response> {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Groq API error: ${response.status} — ${errBody}`);
  }
  return response;
}

/* ─── OpenAI streaming handler ─── */
async function streamOpenAI(messages: ChatMessage[]): Promise<Response> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      stream: true,
      max_tokens: 1024,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`);
  return response;
}

export async function POST(req: NextRequest) {
  try {
    const { messages }: { messages: ChatMessage[] } = await req.json();
    if (!messages?.length) return NextResponse.json({ error: "No messages" }, { status: 400 });

    const lastUserMsg = messages.filter(m => m.role === "user").at(-1)?.content ?? "";

    /* ── Mock provider — no API key needed ── */
    if (PROVIDER === "mock") {
      const text = getMockResponse(lastUserMsg);
      // Simulate streaming by sending the full response as a single SSE chunk
      const stream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          // Stream word by word for a realistic feel
          const words = text.split(" ");
          let i = 0;
          const interval = setInterval(() => {
            if (i < words.length) {
              const chunk = (i === 0 ? "" : " ") + words[i];
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
              i++;
            } else {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              clearInterval(interval);
            }
          }, 18);
        },
      });
      return new Response(stream, {
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
      });
    }

    /* ── Real API providers ── */
    const upstream = PROVIDER === "openai"
      ? await streamOpenAI(messages)
      : await streamGroq(messages);

    // Pipe SSE stream, normalising both Groq and OpenAI to { content: string } chunks
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const reader = upstream.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode("data: [DONE]\n\n"));
              controller.close();
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            } catch { /* skip malformed chunks */ }
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  } catch (err) {
    console.error("[Avenue AI]", err);
    return NextResponse.json({ error: "Avenue AI is temporarily unavailable. Please try again." }, { status: 500 });
  }
}
