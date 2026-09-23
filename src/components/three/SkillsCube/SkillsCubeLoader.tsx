"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { CubeStaticFallback } from "./CubeStaticFallback";

const SkillsCubeCanvas = dynamic(
  () => import("./SkillsCubeCanvas").then((module) => module.SkillsCubeCanvas),
  { ssr: false, loading: () => <CubeStaticFallback /> },
);

export function SkillsCubeLoader() {
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const loadCanvas = () => { timer = setTimeout(() => setCanvasLoaded(true), 1000); };

    if (document.readyState === "complete") loadCanvas();
    else window.addEventListener("load", loadCanvas, { once: true });

    return () => {
      window.removeEventListener("load", loadCanvas);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return <div className="relative h-full w-full">{canvasLoaded ? <><SkillsCubeCanvas paused={paused} /><button type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)} className="pointer-events-auto absolute bottom-5 right-5 rounded-full border border-white/15 bg-[#0b111e]/85 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-[#18233a]">{paused ? "Retomar animação" : "Pausar animação"}</button></> : <><CubeStaticFallback /><button type="button" onClick={() => setCanvasLoaded(true)} className="pointer-events-auto absolute bottom-5 right-5 rounded-full border border-white/15 bg-[#0b111e]/85 px-3 py-2 text-xs font-semibold text-slate-200 backdrop-blur transition-colors hover:bg-[#18233a]">Ativar cubo 3D</button></>}</div>;
}
