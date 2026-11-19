import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { KonamiSealRain } from "@/components/easter-eggs/KonamiSealRain";
import { siteConfig } from "@/data/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

const GTM_ID = "GTM-WNJDSGRP";

const title = "Alan Oliveira — Desenvolvedor Full Stack freelancer";
const description = "Desenvolvimento de sites, sistemas web, landing pages e automações com IA para empresas e empreendedores. Do layout ao deploy, com proposta clara de escopo, prazo e valor.";
const shortDescription = "Sites, sistemas web, automações e IA — do layout ao deploy.";

export const metadata: Metadata = { metadataBase: new URL(siteConfig.siteUrl), title: { default: title, template: "%s | Alan Oliveira" }, description, keywords: ["desenvolvedor freelancer", "desenvolvedor full stack", "criação de sites", "landing page", "sistema web sob medida", "automação de processos", "n8n", "MVP"], alternates: { canonical: "/" }, icons: { icon: "/icon.svg" }, openGraph: { type: "website", locale: "pt_BR", url: siteConfig.siteUrl, siteName: "Alan Oliveira", title, description: shortDescription, images: [{ url: "/images/og.png", width: 1200, height: 630, alt: title }] }, twitter: { card: "summary_large_image", title, description: shortDescription, images: ["/images/og.png"] }, robots: { index: true, follow: true } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={geist.variable}>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <a className="skip-link rounded-md bg-white px-4 py-3 text-sm font-semibold text-slate-950" href="#conteudo-principal">
          Pular para o conteúdo principal
        </a>
        {children}
        <KonamiSealRain />

        {/* Google Tag Manager — beforeInteractive garante a ordem no <head>:
            o dataLayer é inicializado antes do gtm.js carregar. */}
        <Script
          id="gtm-data-layer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`,
          }}
        />
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`}
        />
        {/* End Google Tag Manager */}
      </body>
    </html>
  );
}
