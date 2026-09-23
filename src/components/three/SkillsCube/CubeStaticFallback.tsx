const colors = ["bg-[#b91c3a]", "bg-[#5dba65]", "bg-[#3776ab]", "bg-[#343b4a]", "bg-[#ee8b24]", "bg-[#2496ed]"];

export function CubeStaticFallback() {
  return <div role="img" aria-label="Representação estática das principais tecnologias: Ruby, Node.js, Python, Unity, AWS e Docker." className="absolute right-[8%] top-1/2 grid w-44 -translate-y-1/2 grid-cols-3 gap-1 rounded-xl border border-white/15 bg-[#0b111e]/80 p-2 shadow-2xl sm:w-56">{Array.from({ length: 9 }, (_, index) => <span key={index} className={`aspect-square rounded-sm border border-white/15 ${colors[index % colors.length]}`} />)}</div>;
}
