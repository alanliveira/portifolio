export interface Service {
  id: string;
  title: string;
  problem: string;
  description: string;
  deliverables: string[];
  accent: "blue" | "violet" | "cyan" | "orange";
}

export const services: Service[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    problem: "Sua empresa não aparece bem na internet ou o site atual não gera contatos?",
    description: "Sites institucionais e páginas de venda rápidos, bonitos no celular e preparados para o Google, com chamadas que levam o visitante a falar com você.",
    deliverables: ["Layout responsivo", "SEO e performance", "Integração com WhatsApp", "Formulários e analytics"],
    accent: "blue",
  },
  {
    id: "sistemas",
    title: "Sistemas web e MVPs",
    problem: "Ainda controla tudo em planilha ou tem uma ideia de produto para validar?",
    description: "Sistemas sob medida, painéis administrativos e MVPs para colocar seu produto na mão dos primeiros usuários — com base sólida para crescer depois.",
    deliverables: ["Painéis e áreas logadas", "APIs e integrações", "Banco de dados", "Ruby on Rails, Node.js, React e Next.js"],
    accent: "violet",
  },
  {
    id: "automacao",
    title: "Automações e IA",
    problem: "Sua equipe perde horas com tarefas repetitivas e copia-e-cola entre sistemas?",
    description: "Automação de processos, integração entre ferramentas e uso de inteligência artificial para responder, resumir e organizar informações por você.",
    deliverables: ["Fluxos com n8n", "Integração de APIs", "Chatbots e LLMs", "Captação e qualificação de leads"],
    accent: "cyan",
  },
  {
    id: "manutencao",
    title: "Manutenção, modernização e deploy",
    problem: "Tem um sistema antigo, lento ou que ninguém mais consegue mexer?",
    description: "Correções, novas funcionalidades e modernização de sistemas legados, além de hospedagem e publicação em cloud com processo previsível.",
    deliverables: ["Evolução de sistemas existentes", "Migração de tecnologia", "AWS, Docker e Linux", "CI/CD"],
    accent: "orange",
  },
];
