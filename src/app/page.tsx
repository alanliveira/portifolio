import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/hero/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Experience } from "@/components/sections/Experience";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppFloatingButton } from "@/components/contact/WhatsAppFloatingButton";
import { faq } from "@/data/faq";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";

export default function Home() {
  const schema = [
    { "@context": "https://schema.org", "@type": "Person", name: siteConfig.name, url: siteConfig.siteUrl, jobTitle: siteConfig.role, sameAs: [siteConfig.github, siteConfig.linkedin] },
    { "@context": "https://schema.org", "@type": "ProfessionalService", name: `${siteConfig.name} — Desenvolvimento de sites, sistemas e automações`, url: siteConfig.siteUrl, image: `${siteConfig.siteUrl}/images/og.png`, areaServed: { "@type": "Country", name: "Brasil" }, founder: { "@type": "Person", name: siteConfig.name }, hasOfferCatalog: { "@type": "OfferCatalog", name: "Serviços", itemListElement: services.map((service) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: service.title, description: service.description } })) } },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];
  return <><Navbar /><main id="conteudo-principal"><Hero /><Services /><FeaturedProjects /><Process /><About /><Testimonials /><Experience /><TechnologyStack /><Contact /><Faq /></main><Footer /><WhatsAppFloatingButton /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></>;
}
