"use client";

import { useRef, useState, type TouchEvent } from "react";

const sequence = ["up", "up", "down", "down", "left", "right", "left", "right"];
const symbols = { up: "↑", down: "↓", left: "←", right: "→" };

export function MobileKonamiChallenge({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(0);
  const [trail, setTrail] = useState<string[]>([]);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [hasError, setHasError] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const progressRef = useRef(0);
  const hasErrorRef = useRef(false);
  const lastTapAt = useRef(0);

  const handleGesture = (gesture: keyof typeof symbols) => {
    if (progressRef.current >= sequence.length) return;

    const isCorrect = gesture === sequence[progressRef.current];
    const nextProgress = progressRef.current + 1;
    progressRef.current = nextProgress;
    setProgress(nextProgress);
    setTrail((currentTrail) => [...currentTrail, symbols[gesture]]);
    if (!isCorrect) {
      hasErrorRef.current = true;
      setHasError(true);
    }
    if (nextProgress === sequence.length) {
      if (hasErrorRef.current || !isCorrect) window.setTimeout(onClose, 650);
      else setAwaitingConfirmation(true);
    }
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

  return <div className="fixed inset-0 z-[110] flex min-h-dvh items-center justify-center bg-[#070b14]/98 px-6 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Desafio secreto"><div className="w-full max-w-sm text-center"><p className="eyebrow">Modo secreto</p><h2 className="mt-4 text-3xl font-semibold text-white">O cofre está ouvindo.</h2><p className="mt-3 text-sm leading-6 text-muted">{awaitingConfirmation ? "A sequência está completa. Toque duas vezes para confirmar." : hasError ? "Continue até completar o rastro." : "Deslize na direção certa sem errar."}</p><p className="mt-5 text-xs font-semibold tracking-[.2em] text-accent-secondary">{awaitingConfirmation ? "CONFIRME COM TOQUE DUPLO" : progress === sequence.length ? "SEQUÊNCIA ANALISADA" : `GESTO ${progress + 1} DE ${sequence.length}`}</p><div className="mx-auto mt-8 flex aspect-square w-[min(78vw,19rem)] touch-none items-center justify-center rounded-[2rem] border border-accent-secondary/35 bg-accent-secondary/10 p-5" onTouchStart={onTouchStart} onTouchMove={(event) => event.preventDefault()} onTouchEnd={onTouchEnd}><div className="flex min-h-24 flex-wrap items-center justify-center gap-3">{trail.length ? trail.map((symbol, index) => <span key={`${symbol}-${index}`} className="gesture-trail-step flex size-10 items-center justify-center rounded-full border border-accent-secondary/35 bg-white/10 text-2xl text-white">{symbol}</span>) : <span className="text-sm text-slate-300">Deslize dentro desta área.</span>}</div></div><p className="mt-4 text-xs text-slate-500">Mantenha os gestos longe das bordas da tela.</p><p className="mt-4 text-xs text-slate-500">Uma sequência incorreta será encerrada após o oitavo gesto.</p><button type="button" onClick={onClose} className="mt-5 text-sm text-slate-400 underline underline-offset-4">Desistir</button></div></div>;
}
