export function HeroBackground() {
  return <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
    <defs>
      <pattern id="hero-grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M36 0H0V36" stroke="#91a7d6" strokeOpacity=".07" strokeWidth="1" />
      </pattern>
      <linearGradient id="hero-fade" x1="0" x2="1">
        <stop stopColor="#7187e8" stopOpacity=".26" />
        <stop offset=".48" stopColor="#7187e8" stopOpacity=".05" />
        <stop offset="1" stopColor="#7187e8" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="hero-glow" cx="0" cy="0" r="1" gradientTransform="rotate(24 -380 940) scale(610 540)" gradientUnits="userSpaceOnUse">
        <stop stopColor="#5547c6" stopOpacity=".17" />
        <stop offset="1" stopColor="#5547c6" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="650" height="900" fill="url(#hero-grid)" />
    <rect width="760" height="900" fill="url(#hero-glow)" />
    <g stroke="url(#hero-fade)" strokeWidth="1">
      <path d="M64 150H246L322 226H520" />
      <path d="M0 604H154L244 514H458" />
      <path d="M107 86V708" strokeDasharray="4 10" />
      <path d="M386 172V304L472 390V652" strokeDasharray="3 9" />
    </g>
    <g fill="#9eabff">
      <circle cx="64" cy="150" r="4" />
      <circle cx="322" cy="226" r="4" />
      <circle cx="154" cy="604" r="4" />
      <circle cx="244" cy="514" r="4" />
      <circle cx="472" cy="390" r="3" />
    </g>
    <g fill="none" stroke="#91a7d6" strokeOpacity=".13">
      <rect x="46" y="118" width="122" height="64" rx="8" />
      <rect x="282" y="194" width="80" height="64" rx="8" />
      <rect x="202" y="482" width="84" height="64" rx="8" />
    </g>
  </svg>;
}
