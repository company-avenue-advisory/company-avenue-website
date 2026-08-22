"use client";

import { useEffect, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   Light / dark switch for the US property.

   The theme is applied by the inline script in src/app/us/layout.tsx, which
   runs before first paint. This component only OWNS the toggle — it reads the
   class the script already set rather than deciding the theme itself, so there
   is no second source of truth and no flash on hydration.

   `colorScheme` is set alongside the class because the lead form uses a native
   <select>: without it the browser paints a light dropdown on a dark page.
───────────────────────────────────────────────────────────────────────────── */

const KEY = "us-theme";

export function UsThemeToggle() {
  // Starts null so the first render matches the server HTML exactly; the real
  // value arrives in the effect below. Rendering an icon before that would be
  // a hydration mismatch, since the server cannot know the visitor's theme.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {
      // Private mode / storage disabled — the toggle still works for this page
      // view, it just will not be remembered.
    }
    setDark(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/12 text-us-chalk transition-colors hover:border-white/30 hover:text-white"
    >
      {/* Both icons render; CSS picks one. Driving this from `dark` state alone
          would leave the button empty until the effect runs. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden
        className="h-[1.05rem] w-[1.05rem] dark:hidden"
      >
        {/* moon — shown in light mode, i.e. "switch to dark" */}
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden
        className="hidden h-[1.05rem] w-[1.05rem] dark:block"
      >
        {/* sun — shown in dark mode, i.e. "switch to light" */}
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
