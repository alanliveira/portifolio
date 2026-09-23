"use client";

import { RoundedBox, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

const colors = ["#b91c3a", "#5dba65", "#3776ab", "#15171c", "#ee8b24", "#2496ed"];
const iconUrls = [
  "/icons/skills/ruby-original.svg",
  "/icons/skills/nodejs-original.svg",
  "/icons/skills/python-original.svg",
  "/icons/skills/unity-original.svg",
  "/icons/skills/amazonwebservices-original-wordmark.svg",
  "/icons/skills/docker-original.svg",
];
const cubePositions: [number, number, number][] = [];

for (const x of [-0.9, 0, 0.9]) {
  for (const y of [-0.9, 0, 0.9]) {
    for (const z of [-0.9, 0, 0.9]) {
      cubePositions.push([x, y, z]);
    }
  }
}

const turns = [
  { axis: "y", layer: 0.9, direction: 1 },
  { axis: "x", layer: 0.9, direction: -1 },
  { axis: "z", layer: 0.9, direction: 1 },
  { axis: "y", layer: -0.9, direction: -1 },
  { axis: "x", layer: -0.9, direction: 1 },
] as const;

type Axis = (typeof turns)[number]["axis"];
type Turn = (typeof turns)[number];

function Cubie({ id, position, register, textures }: { id: string; position: [number, number, number]; register: (id: string, node: THREE.Group | null) => void; textures?: THREE.Texture[] }) {
  return <group ref={(node) => register(id, node)} position={position}><RoundedBox args={[0.84, 0.84, 0.84]} radius={0.09} smoothness={3}><meshStandardMaterial color="#111827" roughness={0.34} metalness={0.15} /></RoundedBox>{position[2] === 0.9 ? <Sticker position={[0, 0, 0.426]} color={colors[0]} texture={textures?.[0]} /> : null}{position[2] === -0.9 ? <Sticker rotation={[0, Math.PI, 0]} position={[0, 0, -0.426]} color={colors[3]} texture={textures?.[3]} /> : null}{position[0] === 0.9 ? <Sticker rotation={[0, Math.PI / 2, 0]} position={[0.426, 0, 0]} color={colors[1]} texture={textures?.[1]} /> : null}{position[0] === -0.9 ? <Sticker rotation={[0, -Math.PI / 2, 0]} position={[-0.426, 0, 0]} color={colors[4]} texture={textures?.[4]} /> : null}{position[1] === 0.9 ? <Sticker rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.426, 0]} color={colors[2]} texture={textures?.[2]} /> : null}{position[1] === -0.9 ? <Sticker rotation={[Math.PI / 2, 0, 0]} position={[0, -0.426, 0]} color={colors[5]} texture={textures?.[5]} /> : null}</group>;
}

function Sticker({ position, rotation, color, texture }: { position: [number, number, number]; rotation?: [number, number, number]; color: string; texture?: THREE.Texture }) {
  return <group position={position} rotation={rotation}><mesh><planeGeometry args={[0.62, 0.62]} /><meshStandardMaterial color={color} roughness={0.38} metalness={0.05} /></mesh>{texture ? <mesh position={[0, 0, 0.008]} renderOrder={1}><planeGeometry args={[0.52, 0.52]} /><meshBasicMaterial map={texture} color="#ffffff" transparent alphaTest={0.02} side={THREE.DoubleSide} depthWrite={false} toneMapped={false} /></mesh> : null}</group>;
}

function axisVector(axis: Axis) {
  return axis === "x" ? new THREE.Vector3(1, 0, 0) : axis === "y" ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
}

export function CubeFallback({ reducedMotion = false, positionX = 0, positionY = 0, textures }: { reducedMotion?: boolean; positionX?: number; positionY?: number; textures?: THREE.Texture[] }) {
  const root = useRef<THREE.Group>(null);
  const cubies = useRef(new Map<string, THREE.Group>());
  const positions = useRef(new Map<string, THREE.Vector3>(cubePositions.map((position, index) => [String(index), new THREE.Vector3(...position)])));
  const rotations = useRef(new Map<string, THREE.Quaternion>(cubePositions.map((_, index) => [String(index), new THREE.Quaternion()])));
  const activeTurn = useRef<{ turn: Turn; start: number } | null>(null);
  const nextTurnAt = useRef(2);
  const turnIndex = useRef(0);
  const introStart = useRef<number | null>(null);
  const introSpin = useRef(0);

  useFrame((state, delta) => {
    if (!root.current || reducedMotion) return;

    const elapsed = state.clock.elapsedTime;
    if (introStart.current === null) introStart.current = elapsed;
    const introProgress = THREE.MathUtils.clamp((elapsed - introStart.current) / 1.15, 0, 1);
    const introEase = THREE.MathUtils.smootherstep(introProgress, 0, 1);
    introSpin.current += delta * (1 - introEase) * 2.2;
    root.current.scale.setScalar(THREE.MathUtils.lerp(0.35, 1.1, introEase));
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, -0.42 + elapsed * 0.1 + introSpin.current + state.pointer.x * 0.15, Math.min(1, delta * 1.8));
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, -0.22 + state.pointer.y * 0.1, Math.min(1, delta * 1.8));
    root.current.position.x = positionX;
    root.current.position.y = positionY + Math.sin(elapsed * 0.65) * 0.045;

    if (!activeTurn.current && elapsed >= nextTurnAt.current) {
      activeTurn.current = { turn: turns[turnIndex.current % turns.length], start: elapsed };
      turnIndex.current += 1;
    }

    if (!activeTurn.current) return;

    const { turn, start } = activeTurn.current;
    const progress = THREE.MathUtils.clamp((elapsed - start) / 0.7, 0, 1);
    const angle = THREE.MathUtils.smootherstep(progress, 0, 1) * (Math.PI / 2) * turn.direction;
    const axis = axisVector(turn.axis);
    const turnQuaternion = new THREE.Quaternion().setFromAxisAngle(axis, angle);
    const selected: string[] = [];

    positions.current.forEach((basePosition, id) => {
      const coordinate = turn.axis === "x" ? basePosition.x : turn.axis === "y" ? basePosition.y : basePosition.z;
      if (Math.abs(coordinate - turn.layer) > 0.1) return;
      const cubie = cubies.current.get(id);
      const baseRotation = rotations.current.get(id);
      if (!cubie || !baseRotation) return;
      cubie.position.copy(basePosition).applyAxisAngle(axis, angle);
      cubie.quaternion.copy(turnQuaternion).multiply(baseRotation);
      selected.push(id);
    });

    if (progress < 1) return;

    selected.forEach((id) => {
      const basePosition = positions.current.get(id);
      const baseRotation = rotations.current.get(id);
      if (!basePosition || !baseRotation) return;
      basePosition.applyAxisAngle(axis, (Math.PI / 2) * turn.direction);
      basePosition.set(Math.round(basePosition.x * 10) / 10, Math.round(basePosition.y * 10) / 10, Math.round(basePosition.z * 10) / 10);
      baseRotation.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, (Math.PI / 2) * turn.direction));
    });

    activeTurn.current = null;
    nextTurnAt.current = elapsed + 1.6;
  });

  return <group ref={root} position={[positionX, positionY, 0]} scale={reducedMotion ? 1.1 : 0.35}>{cubePositions.map((position, index) => <Cubie key={index} id={String(index)} position={position} textures={textures} register={(id, node) => { if (node) cubies.current.set(id, node); else cubies.current.delete(id); }} />)}</group>;
}

export function TexturedCubeFallback(props: Omit<React.ComponentProps<typeof CubeFallback>, "textures">) {
  const textures = useTexture(iconUrls) as THREE.Texture[];
  textures.forEach((texture) => { texture.colorSpace = THREE.SRGBColorSpace; });
  return <CubeFallback {...props} textures={textures} />;
}
