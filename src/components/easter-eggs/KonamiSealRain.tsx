"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
const seals = Array.from({ length: 54 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 5) % 100}%`,
  delay: `${(index % 36) * 90}ms`,
  duration: `${950 + (index % 6) * 90}ms`,
  size: `${30 + (index % 5) * 6}px`,
  rotation: `${-12 + (index * 13) % 24}deg`,
}));

function Seal() {
  return <svg viewBox="0 0 120 92" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 48C17 44 9 47 8 54c-1 7 7 11 15 7M97 48c6-4 14-1 15 6 1 7-7 11-15 7" stroke="#687B8D" strokeWidth="7" strokeLinecap="round" /><ellipse cx="60" cy="49" rx="39" ry="30" fill="#A9BBC8" /><ellipse cx="60" cy="39" rx="27" ry="24" fill="#C9D8DF" /><ellipse cx="49" cy="35" rx="4" ry="5" fill="#15202B" /><ellipse cx="71" cy="35" rx="4" ry="5" fill="#15202B" /><path d="M56 44c3 3 5 3 8 0-1 7-7 9-8 0Z" fill="#263744" /><path d="M60 48v7M48 53c4 3 8 4 12 4s8-1 12-4" stroke="#687B8D" strokeWidth="2.5" strokeLinecap="round" /><path d="M36 60c7 4 13 6 24 6s17-2 24-6" stroke="#8DA1AF" strokeWidth="3" strokeLinecap="round" opacity=".8" /><path d="M23 72c10-1 18 1 24 7M97 72c-10-1-18 1-24 7" stroke="#687B8D" strokeWidth="7" strokeLinecap="round" /></svg>;
}

function isTextEntryTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && target.matches("input, textarea, select, [contenteditable='true']");
}

export function KonamiSealRain() {
  const enteredInputs = useRef<string[]>([]);
  const rainSequence = useRef(0);
  const [rainId, setRainId] = useState<number | null>(null);

  useEffect(() => {
    const recordInput = (input: string) => {
      enteredInputs.current = [...enteredInputs.current, input].slice(-konamiCode.length);
      if (enteredInputs.current.join(",") === konamiCode.join(",")) {
        setRainId(++rainSequence.current);
        enteredInputs.current = [];
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isTextEntryTarget(event.target)) return;
      recordInput(event.key.length === 1 ? event.key.toLowerCase() : event.key);
    };

    const onKonamiSuccess = () => setRainId(++rainSequence.current);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("konami-success", onKonamiSuccess);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("konami-success", onKonamiSuccess); };
  }, []);

  useEffect(() => {
    if (rainId === null) return;
    const timeout = window.setTimeout(() => setRainId(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [rainId]);

  if (rainId === null) return null;

  return <div key={rainId} className="seal-rain" aria-hidden="true">{seals.map((seal) => <span key={seal.id} className="seal-drop" style={{ "--seal-left": seal.left, "--seal-delay": seal.delay, "--seal-duration": seal.duration, "--seal-size": seal.size, "--seal-rotation": seal.rotation } as CSSProperties}><Seal /></span>)}</div>;
}
