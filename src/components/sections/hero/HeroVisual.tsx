import { SkillsCubeLoader } from "@/components/three/SkillsCube/SkillsCubeLoader";
import { HeroBackground } from "./HeroBackground";
export function HeroVisual() { return <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden"><HeroBackground /><SkillsCubeLoader /></div>; }
