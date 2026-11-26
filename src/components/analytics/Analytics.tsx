import Script from "next/script";
import { GTM_ID, GA_ID } from "@/lib/gtag";

// Injects Google Tag Manager (preferred) and/or GA4 (gtag.js).
// Set NEXT_PUBLIC_GTM_ID and/or NEXT_PUBLIC_GA_ID in .env.local.
// Renders nothing if neither is configured (safe in dev).
//
// The tags are fetched on the visitor's first scroll / tap / click / key, or
// 4 s after the page has loaded, whichever comes first. Loaded with the page
// they were the single largest cause of Total Blocking Time (450-650 ms on
// every page). dataLayer exists from the start, so events pushed earlier
// (trackEvent, calculator events) queue and are processed once GTM arrives.
export function Analytics() {
  if (!GTM_ID && !GA_ID) return null;
  const loader = `(function(w,d){
  w.dataLayer=w.dataLayer||[];
  function gtag(){w.dataLayer.push(arguments);}
  w.gtag=w.gtag||gtag;
  var done=false,ev=['scroll','pointerdown','keydown','touchstart'];
  function add(src){var s=d.createElement('script');s.async=true;s.src=src;d.head.appendChild(s);}
  function load(){
    if(done)return;done=true;
    ev.forEach(function(e){w.removeEventListener(e,load,{passive:true});});
    ${GTM_ID ? `w.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});add('https://www.googletagmanager.com/gtm.js?id=${GTM_ID}');` : ""}
    ${GA_ID ? `gtag('js',new Date());gtag('config','${GA_ID}');add('https://www.googletagmanager.com/gtag/js?id=${GA_ID}');` : ""}
  }
  ev.forEach(function(e){w.addEventListener(e,load,{passive:true,once:true});});
  function later(){setTimeout(load,4000);}
  if(d.readyState==='complete')later();else w.addEventListener('load',later,{once:true});
})(window,document);`;
  return (
    <Script id="analytics-loader" strategy="afterInteractive">
      {loader}
    </Script>
  );
}

export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
    </noscript>
  );
}
