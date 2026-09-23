import type { Pillar } from "@/types/pillar";

export const pillars: Pillar[] = [
  { id: "web", number: "01", title: "Desenvolvimento Web", description: "Aplicações web, APIs e sistemas escaláveis construídos para resolver problemas reais e acompanhar a evolução do produto.", technologies: ["Ruby on Rails", "Node.js", "React", "Next.js", "PostgreSQL"], accent: "blue" },
  { id: "games", number: "02", title: "Desenvolvimento de Games", description: "Jogos, protótipos e experiências interativas que combinam programação, sistemas, criatividade e experiência do usuário.", technologies: ["Unity", "C#", "Godot", "Game Design"], accent: "violet" },
  { id: "ai", number: "03", title: "Desenvolvimento de IA", description: "Automação, integração de modelos de IA e construção de ferramentas capazes de ampliar produtividade e criar novas experiências.", technologies: ["Python", "LLMs", "n8n", "APIs", "Whisper"], accent: "cyan" },
  { id: "deploy", number: "04", title: "Deploy de Aplicações", description: "Infraestrutura, containers, cloud e pipelines para levar aplicações do ambiente de desenvolvimento até produção.", technologies: ["AWS", "Docker", "Linux", "Nginx", "CI/CD"], accent: "orange" },
];
