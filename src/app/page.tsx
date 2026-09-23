import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Pillars } from "@/components/sections/Pillars";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { ProductMindset } from "@/components/sections/ProductMindset";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import { Contact } from "@/components/sections/Contact";
import { siteConfig } from "@/data/site";
export default function Home() { const schema = { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: siteConfig.siteUrl, jobTitle: siteConfig.role, sameAs: [siteConfig.github, siteConfig.linkedin] }; return <><Navbar /><main id="conteudo-principal"><Hero /><Pillars /><FeaturedProjects /><About /><Experience /><ProductMindset /><TechnologyStack /><Contact /></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>; }
