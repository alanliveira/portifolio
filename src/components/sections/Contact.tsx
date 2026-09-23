import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { CubeSticker } from "@/components/ui/CubeSticker";

const stickerColors = ["ruby", "node", "python", "unity", "aws", "docker"] as const;

export function Contact() { return <section id="contato" className="section"><Container><div className="card relative overflow-hidden px-6 py-12 sm:px-12 sm:py-16"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" /><div className="relative grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><div aria-hidden="true" className="-ml-2 flex -space-x-4 sm:-space-x-3">{stickerColors.map((color) => <span key={color} className="scale-75 sm:scale-90"><CubeSticker color={color} /></span>)}</div><p className="eyebrow mt-1">Contato</p><h2 className="mt-4 text-pretty text-4xl font-semibold tracking-tight text-white sm:text-5xl">Vamos construir algo incrível juntos?</h2><p className="mt-6 text-lg leading-8 text-muted">Estou sempre aberto a novos desafios, parcerias, projetos e boas conversas sobre tecnologia.</p><p className="mt-4 leading-7 text-slate-400">Se você tem um problema para resolver, uma ideia para transformar em produto ou simplesmente quer conversar sobre tecnologia, podemos começar por uma conversa.</p><div className="mt-8"><Button href="#formulario-contato">Entrar em contato</Button></div></div><ContactForm /></div></div></Container></section>; }
