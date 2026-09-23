"use client";

import { useEffect, useEffectEvent, useRef } from "react";

declare global {
  interface Window {
    turnstile?: { render: (element: HTMLElement, options: Record<string, unknown>) => string; reset: (widgetId?: string) => void; remove: (widgetId: string) => void };
  }
}

export function TurnstileWidget({ onToken, resetKey }: { onToken: (token: string | null) => void; resetKey: number }) {
  const elementRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const handleToken = useEffectEvent(onToken);

  useEffect(() => {
    if (!siteKey || !elementRef.current) return;
    const render = () => {
      if (!elementRef.current || widgetIdRef.current || !window.turnstile) return;
      widgetIdRef.current = window.turnstile.render(elementRef.current, { sitekey: siteKey, theme: "dark", action: "contact", callback: (token: string) => handleToken(token), "expired-callback": () => handleToken(null), "error-callback": () => handleToken(null) });
    };
    const existingScript = document.querySelector<HTMLScriptElement>('script[src^="https://challenges.cloudflare.com/turnstile/"]');
    if (window.turnstile) render();
    else if (existingScript) existingScript.addEventListener("load", render, { once: true });
    else {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.addEventListener("load", render, { once: true });
      document.head.appendChild(script);
    }
    return () => { if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current); };
  }, [siteKey]);

  useEffect(() => { if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current); }, [resetKey]);

  if (!siteKey) return <p className="text-sm text-red-200">A verificação de segurança não está configurada.</p>;
  return <div ref={elementRef} className="max-w-full overflow-hidden" />;
}
