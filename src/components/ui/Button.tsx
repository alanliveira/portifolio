import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

export function Button({ href, children, variant = "primary", className = "", onClick }: { href: string; children: ReactNode; variant?: "primary" | "secondary"; className?: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  const styles = variant === "primary" ? "bg-accent text-white hover:bg-[#9185ff]" : "border border-border bg-white/3 text-foreground hover:border-[#7c6cff] hover:bg-white/7";
  return <Link href={href} onClick={onClick} className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${styles} ${className}`}>{children}</Link>;
}
