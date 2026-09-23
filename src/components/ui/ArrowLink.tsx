import Link from "next/link";
export function ArrowLink({ href, children }: { href: string; children: string }) { return <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 transition-colors hover:text-[#a99fff]">{children}<span aria-hidden="true">→</span></Link>; }
