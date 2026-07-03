export interface TrademarkClass {
  number: number;
  title: string;
  type: "Goods" | "Services";
  keywords: string[];
}

export const TRADEMARK_CLASSES: TrademarkClass[] = [
  { number: 3, title: "Cosmetics & Cleaning Preparations", type: "Goods", keywords: ["cosmetic", "skincare", "makeup", "perfume", "soap", "shampoo", "detergent", "cleaning"] },
  { number: 5, title: "Pharmaceuticals & Medical Supplies", type: "Goods", keywords: ["pharma", "medicine", "supplement", "healthcare", "drug", "tablet", "ayurvedic"] },
  { number: 9, title: "Electronics, Software & Scientific Devices", type: "Goods", keywords: ["software", "app", "electronics", "computer", "mobile", "device", "gadget", "saas", "ai"] },
  { number: 14, title: "Jewellery & Precious Metals", type: "Goods", keywords: ["jewellery", "jewelry", "gold", "silver", "diamond", "watch"] },
  { number: 16, title: "Paper Goods, Stationery & Printed Matter", type: "Goods", keywords: ["stationery", "paper", "printing", "book", "notebook", "packaging"] },
  { number: 18, title: "Leather Goods, Bags & Luggage", type: "Goods", keywords: ["leather", "bag", "luggage", "wallet", "handbag"] },
  { number: 20, title: "Furniture & Home Fittings", type: "Goods", keywords: ["furniture", "mattress", "home decor", "interior"] },
  { number: 21, title: "Household & Kitchen Utensils", type: "Goods", keywords: ["kitchen", "utensil", "cookware", "household items"] },
  { number: 24, title: "Textiles & Fabrics", type: "Goods", keywords: ["textile", "fabric", "linen", "bedsheet"] },
  { number: 25, title: "Clothing, Footwear & Headgear", type: "Goods", keywords: ["clothing", "apparel", "fashion", "shoes", "footwear", "t-shirt", "garment"] },
  { number: 29, title: "Meat, Dairy & Processed Food", type: "Goods", keywords: ["dairy", "meat", "cheese", "processed food", "snacks", "frozen food"] },
  { number: 30, title: "Bakery, Tea, Coffee & Spices", type: "Goods", keywords: ["bakery", "tea", "coffee", "spice", "sweets", "chocolate", "bread"] },
  { number: 32, title: "Non-Alcoholic Beverages", type: "Goods", keywords: ["juice", "soft drink", "beverage", "water bottle", "energy drink"] },
  { number: 33, title: "Alcoholic Beverages", type: "Goods", keywords: ["wine", "beer", "alcohol", "liquor", "spirits"] },
  { number: 35, title: "Advertising, Business Management & Retail", type: "Services", keywords: ["advertising", "marketing", "retail", "ecommerce", "business consulting", "recruitment", "shop"] },
  { number: 36, title: "Finance, Insurance & Real Estate", type: "Services", keywords: ["finance", "insurance", "banking", "real estate", "investment", "fintech", "loan"] },
  { number: 37, title: "Construction & Repair Services", type: "Services", keywords: ["construction", "repair", "contractor", "renovation", "building"] },
  { number: 38, title: "Telecommunications", type: "Services", keywords: ["telecom", "broadcasting", "internet service", "networking service"] },
  { number: 39, title: "Transport, Logistics & Travel", type: "Services", keywords: ["logistics", "transport", "delivery", "travel", "courier", "shipping"] },
  { number: 41, title: "Education, Training & Entertainment", type: "Services", keywords: ["education", "training", "coaching", "entertainment", "sports", "event", "academy"] },
  { number: 42, title: "IT, Software & Scientific Services", type: "Services", keywords: ["it services", "software development", "saas", "web development", "cloud", "technology", "platform", "app development"] },
  { number: 43, title: "Restaurant, Catering & Hospitality", type: "Services", keywords: ["restaurant", "cafe", "hotel", "catering", "food service", "hospitality", "cloud kitchen"] },
  { number: 44, title: "Medical, Beauty & Wellness Services", type: "Services", keywords: ["clinic", "salon", "spa", "wellness", "medical service", "beauty service", "dental"] },
  { number: 45, title: "Legal, Security & Personal Services", type: "Services", keywords: ["legal service", "law firm", "security service", "consultancy", "compliance", "ca firm", "advisory"] },
];

export function findMatchingClasses(query: string): TrademarkClass[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = TRADEMARK_CLASSES.map((cls) => {
    let score = 0;
    for (const term of terms) {
      if (cls.keywords.some((k) => k.includes(term) || term.includes(k))) score += 2;
      if (cls.title.toLowerCase().includes(term)) score += 1;
    }
    return { cls, score };
  }).filter((s) => s.score > 0);

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((s) => s.cls);
}
