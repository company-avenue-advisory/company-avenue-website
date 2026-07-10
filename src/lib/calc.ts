// Shared helpers for financial calculators

export function formatINR(n: number, maximumFractionDigits = 0): string {
  if (!isFinite(n)) n = 0;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits,
  }).format(Math.round(n * 100) / 100);
}

// Short Indian-format label: ₹1.25 Cr, ₹4.50 L, ₹45,000
export function formatINRShort(n: number): string {
  if (!isFinite(n)) n = 0;
  const abs = Math.abs(n);
  if (abs >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return formatINR(n);
}

// EMI on a reducing-balance loan. rate = annual %, tenure in months.
export function calcEMI(principal: number, annualRate: number, months: number) {
  const r = annualRate / 12 / 100;
  const emi =
    r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const total = emi * months;
  const interest = total - principal;
  return { emi, total, interest, principal };
}

// Future value of a one-time (lumpsum) investment compounded annually.
// compounding = number of times interest compounds per year.
export function futureValueLumpsum(principal: number, annualRate: number, years: number, compounding = 1) {
  const r = annualRate / 100 / compounding;
  const n = compounding * years;
  return principal * Math.pow(1 + r, n);
}

// Future value of a monthly SIP (invested at the start of each month).
export function futureValueSIP(monthly: number, annualRate: number, years: number) {
  const i = annualRate / 12 / 100;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

// Future value of a recurring deposit (quarterly compounding, monthly deposit).
export function futureValueRD(monthly: number, annualRate: number, months: number) {
  // Standard RD: interest compounded quarterly
  const i = annualRate / 400; // per quarter
  let balance = 0;
  for (let m = 1; m <= months; m++) {
    balance += monthly;
    // apply quarterly compounding
    if (m % 3 === 0) balance *= 1 + i;
  }
  // apply for remaining partial quarter
  const remainder = months % 3;
  if (remainder !== 0) balance *= 1 + i * (remainder / 3);
  return balance;
}
