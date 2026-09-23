import { CubeSticker } from "@/components/ui/CubeSticker";

const stickerColors = ["ruby", "node", "python", "unity", "aws", "docker"] as const;

export function CubeStaticFallback() {
  return <div role="img" aria-label="Representação estática das principais tecnologias: Ruby, Node.js, Python, Unity, AWS e Docker." className="absolute inset-0 grid place-items-center overflow-hidden"><div className="flex translate-y-24 items-center justify-center md:translate-x-[18vw] md:translate-y-0">{stickerColors.map((color, index) => <span key={`${color}-${index}`} className="cube-loading -mx-2 block h-9 w-9 scale-[.55] sm:mx-0 sm:h-14 sm:w-14 sm:scale-100" style={{ animationDelay: `${index * 0.14}s` }}><CubeSticker color={color} /></span>)}</div></div>;
}
