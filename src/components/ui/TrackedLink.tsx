"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

const variants = {
  primary: "bg-accent text-white hover:bg-[#6f61df]",
  secondary: "border border-border bg-white/3 text-foreground hover:border-[#6254d6] hover:bg-white/7",
  whatsapp: "bg-[#25d366] text-[#062814] hover:bg-[#3ee07a]",
};

export function TrackedLink({ href, event, location, children, variant = "primary", className = "", onClick }: { href: string; event: string; location: string; children: ReactNode; variant?: keyof typeof variants; className?: string; onClick?: () => void }) {
  const external = href.startsWith("http");
  return <Link href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onClick={() => { trackEvent(event, { location }); onClick?.(); }} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}>{children}</Link>;
}
