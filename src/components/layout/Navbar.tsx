"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "./Container";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (open) firstMenuItemRef.current?.focus(); }, [open]);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape" && open) { setOpen(false); buttonRef.current?.focus(); } }; window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open]);
  const close = () => setOpen(false);
  return <header className="sticky top-0 z-50 border-b border-white/5 bg-[#070b14]/85 backdrop-blur-xl"><Container className="flex min-h-18 items-center justify-between gap-4"><Link href="#inicio" className="leading-tight"><span className="block text-sm font-semibold text-white">{siteConfig.name}</span><span className="block text-xs text-muted">{siteConfig.role}</span></Link><nav aria-label="Navegação principal" className="hidden items-center gap-6 lg:flex">{navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition-colors hover:text-white">{item.label}</Link>)}</nav><div className="hidden lg:block"><Button href="#contato">Vamos conversar</Button></div><button ref={buttonRef} type="button" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center rounded-full border border-border text-white lg:hidden"><span aria-hidden="true">{open ? "×" : "☰"}</span></button></Container>{open ? <div id="mobile-menu" className="border-t border-white/5 bg-[#0b111e] lg:hidden"><Container className="flex flex-col py-4"><nav aria-label="Navegação móvel" className="flex flex-col">{navigation.map((item, index) => <Link ref={index === 0 ? firstMenuItemRef : undefined} key={item.href} href={item.href} onClick={close} className="border-b border-white/5 py-3 text-sm text-slate-200">{item.label}</Link>)}</nav><Button href="#contato" onClick={close} className="mt-4">Vamos conversar</Button></Container></div> : null}</header>;
}
