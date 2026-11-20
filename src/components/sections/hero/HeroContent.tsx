import { hero } from "@/data/hero";
import { ContactActions } from "@/components/contact/ContactActions";

export function HeroContent() {
  return <div className="relative z-10 py-12 lg:py-20">
    <p className="eyebrow">{hero.eyebrow}</p>
    <h1 className="mt-5 max-w-3xl text-pretty text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">{hero.title}</h1>
    <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">{hero.description}</p>
    <ContactActions location="hero" className="mt-8" />
    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">{hero.trust.map((item) => <li key={item} className="flex items-center gap-2"><span aria-hidden="true" className="text-[#65d9d2]">✓</span>{item}</li>)}</ul>
  </div>;
}
