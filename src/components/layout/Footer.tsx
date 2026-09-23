"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { MobileKonamiChallenge } from "@/components/easter-eggs/MobileKonamiChallenge";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";
import { Container } from "./Container";

const secrets = ["Alguns jogos escondem seus melhores segredos em comandos antigos.", "Nem todo cofre abre com uma chave.", "Os testadores da Konami sabiam que curiosidade também é uma habilidade.", "Há atalhos que só aparecem para quem tenta combinações improváveis.", "Certos segredos foram feitos para serem encontrados por acidente.", "Há uma sala secreta entre duas teclas que parecem comuns.", "Os melhores mapas têm caminhos que não aparecem na legenda.", "Às vezes, a fase bônus começa antes de você perceber.", "Quem conhece o jogo sempre testa a parede mais suspeita.", "Nem toda sequência é uma senha. Algumas são um convite."];
const secretForVisit = secrets[Math.floor(Math.random() * secrets.length)];
const touchSecretForVisit = [...secrets, "Em telas de toque, A e B atendem por dois toques."][Math.floor(Math.random() * (secrets.length + 1))];
const subscribe = () => () => {};
const touchQuery = "(pointer: coarse)";
const getTouchScreenSnapshot = () => navigator.maxTouchPoints > 0 || window.matchMedia(touchQuery).matches;
const subscribeToTouchScreen = (onChange: () => void) => { const mediaQuery = window.matchMedia(touchQuery); mediaQuery.addEventListener("change", onChange); return () => mediaQuery.removeEventListener("change", onChange); };

export function Footer() { const year = new Date().getFullYear(); const secret = useSyncExternalStore(subscribe, () => secretForVisit, () => ""); const hasTouchScreen = useSyncExternalStore(subscribeToTouchScreen, getTouchScreenSnapshot, () => false); const [challengeOpen, setChallengeOpen] = useState(false); const displayedSecret = hasTouchScreen ? touchSecretForVisit : secret; return <footer className="border-t border-white/8 py-10"><Container className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-semibold text-white">{siteConfig.name}</p><p className="mt-1 text-sm text-muted">{siteConfig.role}</p><p className="mt-5 text-xs text-slate-400">© {year} Alan Oliveira. Todos os direitos reservados.</p></div><div className="flex flex-col gap-5 sm:items-end"><nav aria-label="Navegação do rodapé" className="flex flex-wrap gap-x-4 gap-y-2">{navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-white">{item.label}</Link>)}</nav><div className="flex gap-4 text-sm text-slate-300"><a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub, abre em nova aba">GitHub</a><a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn, abre em nova aba">LinkedIn</a><a href={`mailto:${siteConfig.email}`}>Email</a></div>{displayedSecret && (hasTouchScreen ? <button type="button" onClick={() => setChallengeOpen(true)} className="max-w-xs text-left text-xs leading-5 text-slate-500 underline decoration-slate-700 underline-offset-4 sm:text-right">{displayedSecret}</button> : <p className="max-w-xs text-xs leading-5 text-slate-500 sm:text-right">{displayedSecret}</p>)}</div></Container>{challengeOpen && <MobileKonamiChallenge onClose={() => setChallengeOpen(false)} />}</footer>; }
