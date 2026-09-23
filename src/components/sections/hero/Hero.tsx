import { Container } from "@/components/layout/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
export function Hero() { return <section id="inicio" className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden"><HeroVisual /><Container className="relative z-10 flex min-h-[calc(100svh-4.5rem)] items-center"><HeroContent /></Container></section>; }
