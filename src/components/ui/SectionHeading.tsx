import { CubeSticker } from "./CubeSticker";

type CubeStickerColor = "ruby" | "node" | "python" | "unity" | "aws" | "docker";

export function SectionHeading({ eyebrow, title, description, sticker }: { eyebrow?: string; title: string; description?: string; sticker?: CubeStickerColor }) { return <div className="max-w-2xl"><div className="flex items-start gap-4 sm:gap-5">{sticker ? <CubeSticker color={sticker} /> : null}<div><p className="eyebrow">{eyebrow}</p><h2 className="mt-2.5 text-pretty text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h2></div></div>{description ? <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{description}</p> : null}</div>; }
