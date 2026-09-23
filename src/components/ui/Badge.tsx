import type { ReactNode } from "react";
export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) { return <span className={`inline-flex rounded-full border border-border bg-white/4 px-3 py-1 text-xs font-medium text-muted ${className}`}>{children}</span>; }
