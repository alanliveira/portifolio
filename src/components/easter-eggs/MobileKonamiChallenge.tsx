"use client";

import { useRef, useState, type TouchEvent } from "react";

const sequence = ["up", "up", "down", "down", "left", "right", "left", "right"];
const symbols = { up: "↑", down: "↓", left: "←", right: "→" };

export function MobileKonamiChallenge({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(0);
  const [trail, setTrail] = useState<string[]>([]);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const progressRef = useRef(0);
  const lastTapAt = useRef(0);

  const handleGesture = (gesture: keyof typeof symbols) => {
    if (gesture !== sequence[progressRef.current]) {
      onClose();
      return;
    }

    const nextProgress = progressRef.current + 1;
    progressRef.current = nextProgress;
    setProgress(nextProgress);
    setTrail((currentTrail) => [...currentTrail, symbols[gesture]]);
    if (nextProgress === sequence.length) setAwaitingConfirmation(true);
  };

  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 32) {
      if (!awaitingConfirmation) {
        onClose();
        return;
      }

      const now = Date.now();
      if (now - lastTapAt.current < 450) {
        window.dispatchEvent(new Event("konami-success"));
        onClose();
      } else {
        lastTapAt.current = now;
      }
      return;
    }

    if (awaitingConfirmation) {
      onClose();
      return;
    }

    handleGesture(Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? "right" : "left") : (deltaY > 0 ? "down" : "up"));
  };

  return <div className="fixed inset-0 z-[110] flex min-h-dvh items-center justify-center bg-[#070b14]/98 px-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Desafio secreto" onTouchStart={onTouchStart} onTouchMove={(event) => event.preventDefault()} onTouchEnd={onTouchEnd}><div className="w-full max-w-sm text-center"><p className="eyebrow">Modo secreto</p><h2 className="mt-4 text-3xl font-semibold text-white">O cofre está ouvindo.</h2><p className="mt-3 text-sm leading-6 text-muted">{awaitingConfirmation ? "A sequência está completa. Toque duas vezes para confirmar." : "Deslize na direção certa sem errar."}</p><p className="mt-5 text-xs font-semibold tracking-[.2em] text-accent-secondary">{awaitingConfirmation ? "CONFIRME COM TOQUE DUPLO" : `GESTO ${progress + 1} DE ${sequence.length}`}</p><div className="mt-8 flex min-h-24 flex-wrap items-center justify-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">{trail.length ? trail.map((symbol, index) => <span key={`${symbol}-${index}`} className="gesture-trail-step flex size-10 items-center justify-center rounded-full border border-accent-secondary/35 bg-accent-secondary/10 text-2xl text-white">{symbol}</span>) : <span className="text-sm text-slate-500">O rastro dos gestos aparecerá aqui.</span>}</div><p className="mt-8 text-xs text-slate-500">Um gesto incorreto fecha o cofre.</p><button type="button" onClick={onClose} className="mt-5 text-sm text-slate-400 underline underline-offset-4">Desistir</button></div></div>;
}
