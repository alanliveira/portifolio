"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function SkillsCube({ reducedMotion = false, positionX = 0, positionY = 0 }: { reducedMotion?: boolean; positionX?: number; positionY?: number }) {
  const { scene } = useGLTF("/models/skills-cube.glb");
  const group = useRef<THREE.Group>(null);
  const introStart = useRef<number | null>(null);
  const introSpin = useRef(0);
  useFrame((state, delta) => { if (!group.current || reducedMotion) return; const t = state.clock.elapsedTime; if (introStart.current === null) introStart.current = t; const introProgress = THREE.MathUtils.clamp((t - introStart.current) / 1.15, 0, 1); const introEase = THREE.MathUtils.smootherstep(introProgress, 0, 1); introSpin.current += delta * (1 - introEase) * 2.2; group.current.scale.setScalar(THREE.MathUtils.lerp(0.35, 1.1, introEase)); group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.42 + t * 0.1 + introSpin.current + state.pointer.x * 0.15, Math.min(1, delta * 1.8)); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.22 + state.pointer.y * 0.1, Math.min(1, delta * 1.8)); group.current.position.x = positionX; group.current.position.y = positionY + Math.sin(t * 0.65) * 0.045; });
  return <group ref={group} position={[positionX, positionY, 0]} scale={reducedMotion ? 1.1 : 0.35}><Center><primitive object={scene} /></Center></group>;
}
