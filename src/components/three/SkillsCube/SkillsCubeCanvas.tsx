"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import { CubeFallback } from "./CubeFallback";
import { CubeLights } from "./CubeLights";
import { CubeStaticFallback } from "./CubeStaticFallback";

export function SkillsCubeCanvas({ paused = false }: { paused?: boolean }) {
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const motionReduced = reducedMotion || paused;
  return <div role="img" aria-label="Representação visual das principais tecnologias: Ruby, Node.js, Python, Unity, AWS e Docker." className="h-full w-full"><Canvas fallback={<CubeStaticFallback />} dpr={[1, 1.5]} camera={{ position: [0, 0, 6.2], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}><Suspense fallback={<CubeFallback reducedMotion={motionReduced} />}><CubeLights /><ResponsiveCube reducedMotion={motionReduced} /></Suspense></Canvas></div>;
}

function ResponsiveCube({ reducedMotion }: { reducedMotion: boolean }) {
  const { viewport } = useThree();
  const isDesktop = viewport.width >= 8;
  const positionX = isDesktop ? Math.min(viewport.width * 0.18, 2.35) : 0;
  const positionY = isDesktop ? 0 : -1.35;
  return <CubeFallback reducedMotion={reducedMotion} positionX={positionX} positionY={positionY} scale={isDesktop ? 1.1 : 0.78} />;
}
