import type { TechnologyCategory } from "@/types/technology";

export const technologyCategories: TechnologyCategory[] = [
  { name: "Backend", technologies: ["Ruby", "Ruby on Rails", "Node.js", "Python", "FastAPI", "Django"] },
  { name: "Frontend", technologies: ["React", "Next.js", "Angular", "Vue", "Tailwind CSS"] },
  { name: "Dados", technologies: ["PostgreSQL", "MySQL", "MongoDB", "Supabase"] },
  { name: "Cloud & DevOps", technologies: ["AWS", "Docker", "Linux", "Nginx", "CI/CD"] },
  { name: "IA & Automação", technologies: ["LLMs", "n8n", "Whisper", "APIs", "Automação"] },
  { name: "Games", technologies: ["Unity", "C#", "Godot", "Unreal", "Roblox Studio"] },
];
