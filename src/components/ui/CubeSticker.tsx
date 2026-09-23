type CubeStickerColor = "ruby" | "node" | "python" | "unity" | "aws" | "docker";

const colors: Record<CubeStickerColor, { front: string; top: string; side: string }> = {
  ruby: { front: "#b91c3a", top: "#e95b70", side: "#7f1027" },
  node: { front: "#5dba65", top: "#89d58e", side: "#388c42" },
  python: { front: "#3776ab", top: "#5c9bd0", side: "#24567f" },
  unity: { front: "#343b4a", top: "#667085", side: "#202631" },
  aws: { front: "#ee8b24", top: "#ffb65c", side: "#b95a0c" },
  docker: { front: "#2496ed", top: "#67b9f3", side: "#166ba9" },
};

export function CubeSticker({ color }: { color: CubeStickerColor }) {
  const palette = colors[color];
  return <svg aria-hidden="true" className="h-14 w-14 shrink-0 drop-shadow-[0_12px_20px_rgba(0,0,0,.3)] sm:h-16 sm:w-16" viewBox="0 0 48 48" fill="none"><path d="M24 4 42 14v20L24 44 6 34V14L24 4Z" fill="#0a1020" stroke="rgba(255,255,255,.18)" strokeWidth="1" /><path d="m24 4 18 10-18 10L6 14 24 4Z" fill={palette.top} /><path d="m24 24 18-10v20L24 44V24Z" fill={palette.side} /><path d="m6 14 18 10v20L6 34V14Z" fill={palette.front} /><path d="m24 8 13 7-13 7-13-7 13-7Z" fill="rgba(255,255,255,.15)" /></svg>;
}
