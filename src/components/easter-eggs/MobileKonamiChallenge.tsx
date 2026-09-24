"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";

const sequence = ["up", "up", "down", "down", "left", "right", "left", "right"];
const symbols = { up: "↑", down: "↓", left: "←", right: "→" };

export function MobileKonamiChallenge({ onClose }: { onClose: () => void }) {
  const [progress, setProgress] = useState(0);
  const [trail, setTrail] = useState<string[]>([]);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [completed, setCompleted] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const progressRef = useRef(0);
  const twoFingerStartedAt = useRef<number | null>(null);
  const twoFingerTimer = useRef<number | null>(null);
  const completionTimer = useRef<number | null>(null);
  const confirmationRegistered = useRef(false);

  const completeChallenge = () => {
    if (confirmationRegistered.current) return;
    confirmationRegistered.current = true;
    setCompleted(true);
    setTrail((currentTrail) => [...currentTrail, "✌"]);
    completionTimer.current = window.setTimeout(() => {
      window.dispatchEvent(new Event("konami-success"));
      onClose();
    }, 280);
  };

  useEffect(() => () => {
    if (twoFingerTimer.current) clearTimeout(twoFingerTimer.current);
    if (completionTimer.current) clearTimeout(completionTimer.current);
  }, []);

  const handleGesture = (gesture: keyof typeof symbols) => {
    if (awaitingConfirmation || completed) return;
    const isCorrect = gesture === sequence[progressRef.current];
    if (!isCorrect) {
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
    if (awaitingConfirmation && !completed && event.touches.length === 2) {
      touchStart.current = null;
      twoFingerStartedAt.current = Date.now();
      twoFingerTimer.current = window.setTimeout(completeChallenge, 600);
      return;
    }
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (twoFingerStartedAt.current !== null) {
      const heldLongEnough = Date.now() - twoFingerStartedAt.current >= 600;
      twoFingerStartedAt.current = null;
      if (twoFingerTimer.current) clearTimeout(twoFingerTimer.current);
      twoFingerTimer.current = null;
      if (heldLongEnough) completeChallenge();
      return;
    }
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 32) {
      return;
    }

    if (awaitingConfirmation || completed) return;

    handleGesture(Math.abs(deltaX) > Math.abs(deltaY) ? (deltaX > 0 ? "right" : "left") : (deltaY > 0 ? "down" : "up"));
  };

  return <div className={`fixed inset-0 z-[110] flex min-h-dvh items-center justify-center px-6 ${completed ? "bg-[#070b14]/80" : "bg-[#070b14]/98 backdrop-blur-sm"}`} role="dialog" aria-modal="true" aria-label="Desafio secreto"><button type="button" onClick={onClose} aria-label="Fechar desafio secreto" className="absolute right-5 top-5 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl text-white">×</button><div className="w-full max-w-sm text-center"><p className="eyebrow">Modo secreto</p><h2 className="mt-4 text-3xl font-semibold text-white">O cofre está ouvindo.</h2><p className="mt-3 text-sm leading-6 text-muted">{completed ? "Segredo liberado. A chuva começou." : awaitingConfirmation ? "A sequência está completa. Segure dois dedos na área para confirmar." : "Deslize na direção certa sem errar."}</p><p className="mt-5 text-xs font-semibold tracking-[.2em] text-accent-secondary">{completed ? "DOIS DEDOS REGISTRADOS" : awaitingConfirmation ? "SEGURE DOIS DEDOS" : `GESTO ${progress + 1} DE ${sequence.length}`}</p><div className="mx-auto mt-8 flex aspect-square w-[min(78vw,19rem)] touch-none items-center justify-center rounded-[2rem] border border-accent-secondary/35 bg-accent-secondary/10 p-5" onTouchStart={onTouchStart} onTouchMove={(event) => event.preventDefault()} onTouchEnd={onTouchEnd}><div className="flex min-h-24 flex-wrap items-center justify-center gap-3">{trail.length ? trail.map((symbol, index) => <span key={`${symbol}-${index}`} className="gesture-trail-step flex size-10 items-center justify-center rounded-full border border-accent-secondary/35 bg-white/10 text-2xl text-white">{symbol}</span>) : <span className="text-sm text-slate-300">Deslize dentro desta área.</span>}</div></div><p className="mt-4 text-xs text-slate-500">Mantenha os gestos longe das bordas da tela.</p><p className="mt-4 text-xs text-slate-500">Uma direção incorreta encerra o desafio.</p></div></div>;
}
