"use client";

import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function SkillsCube({ reducedMotion = false, positionX = 0, positionY = 0 }: { reducedMotion?: boolean; positionX?: number; positionY?: number }) {
  const { scene } = useGLTF("/models/skills-cube.glb");
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => { if (!group.current || reducedMotion) return; const t = state.clock.elapsedTime; group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -0.42 + t * 0.1 + state.pointer.x * 0.15, Math.min(1, delta * 1.8)); group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -0.22 + state.pointer.y * 0.1, Math.min(1, delta * 1.8)); group.current.position.x = positionX; group.current.position.y = positionY + Math.sin(t * 0.65) * 0.045; });
  return <group ref={group} position={[positionX, positionY, 0]} rotation={[-0.22, -0.42, 0]} scale={1.1}><Center><primitive object={scene} /></Center></group>;
}
