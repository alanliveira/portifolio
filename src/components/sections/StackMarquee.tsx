"use client";

import { useEffect, useRef, useState } from "react";
import { TechIcon } from "@/components/ui/TechBadge";

// Ícones escuros que somem no fundo escuro e precisam ser invertidos.
const darkIcons = new Set(["Next.js", "Unity", "Unreal", "AWS"]);

/**
 * Faixa infinita de ícones que rola da esquerda para a direita.
 * Mouse em cima, toque ou foco pausam a faixa e mostram o nome do ícone; ao sair, a faixa volta a rolar.
 * Só o mouse conta como hover: no toque, o navegador simula um mouseleave logo após o clique.
 */
export function StackMarquee({ technologies }: { technologies: string[] }) {
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const paused = hovering || active !== null;

  // Toque fora da faixa (ou Esc) libera o ícone selecionado e retoma a rolagem.
  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: PointerEvent) => { if (!containerRef.current?.contains(event.target as Node)) setActive(null); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setActive(null); };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("pointerdown", onPointerDown); document.removeEventListener("keydown", onKey); };
  }, [active]);

  const renderItem = (technology: string, copy: boolean) => {
    const key = `${technology}${copy ? "-copy" : ""}`;
    const isActive = active === key;
    return <li
      key={key}
      className="group relative flex w-24 shrink-0 cursor-default flex-col items-center outline-none sm:w-28"
      tabIndex={copy ? undefined : 0}
      aria-hidden={copy || undefined}
      onClick={() => setActive(key)}
      onFocus={() => setActive(key)}
      onBlur={() => setActive((current) => (current === key ? null : current))}
    >
      <span className={`grid h-16 w-16 place-items-center rounded-2xl border transition-colors sm:h-20 sm:w-20 ${isActive ? "border-white/30 bg-white/[.09]" : "border-white/10 bg-white/[.04] group-hover:border-white/25 group-hover:bg-white/[.08]"} group-focus-visible:ring-2 group-focus-visible:ring-[#a99fff]`}>
        <span className={`block h-9 w-9 sm:h-11 sm:w-11 ${darkIcons.has(technology) ? "invert" : ""}`}><TechIcon technology={technology} size="100%" /></span>
      </span>
      <span className={`mt-3 whitespace-nowrap text-xs font-semibold text-slate-200 transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>{technology}</span>
    </li>;
  };

  return <div ref={containerRef} className="stack-marquee mt-12" onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovering(true); }} onPointerLeave={(event) => { if (event.pointerType === "mouse") { setHovering(false); setActive(null); } }}>
    <ul className="stack-track" aria-label="Tecnologias com que trabalho" style={{ animationPlayState: paused ? "paused" : "running" }}>
      {/* A cópia decorativa vem primeiro: a faixa anda para a direita e começa mostrando a lista real. */}
      {technologies.map((technology) => renderItem(technology, true))}
      {technologies.map((technology) => renderItem(technology, false))}
    </ul>
  </div>;
}
