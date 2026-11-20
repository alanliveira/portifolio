import type { ComponentType, SVGProps } from "react";
import AngularOriginalIcon from "react-devicons/angular/original";
import AmazonwebservicesOriginalWordmarkIcon from "react-devicons/amazonwebservices/original-wordmark";
import CsharpOriginalIcon from "react-devicons/csharp/original";
import DjangoPlainIcon from "react-devicons/django/plain";
import DockerOriginalIcon from "react-devicons/docker/original";
import FastapiOriginalIcon from "react-devicons/fastapi/original";
import GodotOriginalIcon from "react-devicons/godot/original";
import LinuxOriginalIcon from "react-devicons/linux/original";
import MongodbOriginalIcon from "react-devicons/mongodb/original";
import MysqlOriginalIcon from "react-devicons/mysql/original";
import NextjsOriginalIcon from "react-devicons/nextjs/original";
import NginxOriginalIcon from "react-devicons/nginx/original";
import NodejsOriginalIcon from "react-devicons/nodejs/original";
import PostgresqlOriginalIcon from "react-devicons/postgresql/original";
import PythonOriginalIcon from "react-devicons/python/original";
import ReactOriginalIcon from "react-devicons/react/original";
import RailsPlainIcon from "react-devicons/rails/plain";
import RubyOriginalIcon from "react-devicons/ruby/original";
import SupabaseOriginalIcon from "react-devicons/supabase/original";
import TailwindcssOriginalIcon from "react-devicons/tailwindcss/original";
import UnityOriginalIcon from "react-devicons/unity/original";
import UnrealengineOriginalIcon from "react-devicons/unrealengine/original";
import VuejsOriginalIcon from "react-devicons/vuejs/original";
import Css3OriginalIcon from "react-devicons/css3/original";
import FlutterOriginalIcon from "react-devicons/flutter/original";
import GitOriginalIcon from "react-devicons/git/original";
import GithubactionsOriginalIcon from "react-devicons/githubactions/original";
import Html5OriginalIcon from "react-devicons/html5/original";
import JavascriptOriginalIcon from "react-devicons/javascript/original";
import RabbitmqOriginalIcon from "react-devicons/rabbitmq/original";
import TypescriptOriginalIcon from "react-devicons/typescript/original";

type Devicon = ComponentType<SVGProps<SVGElement> & { size?: string | number }>;

const icons: Record<string, Devicon> = {
  "Ruby": RubyOriginalIcon,
  "Ruby on Rails": RailsPlainIcon,
  "Node.js": NodejsOriginalIcon,
  "Python": PythonOriginalIcon,
  "FastAPI": FastapiOriginalIcon,
  "Django": DjangoPlainIcon,
  "React": ReactOriginalIcon,
  "Next.js": NextjsOriginalIcon,
  "Angular": AngularOriginalIcon,
  "Vue": VuejsOriginalIcon,
  "Tailwind CSS": TailwindcssOriginalIcon,
  "PostgreSQL": PostgresqlOriginalIcon,
  "MySQL": MysqlOriginalIcon,
  "MongoDB": MongodbOriginalIcon,
  "Supabase": SupabaseOriginalIcon,
  "AWS": AmazonwebservicesOriginalWordmarkIcon,
  "Docker": DockerOriginalIcon,
  "Linux": LinuxOriginalIcon,
  "Nginx": NginxOriginalIcon,
  "Unity": UnityOriginalIcon,
  "C#": CsharpOriginalIcon,
  "Godot": GodotOriginalIcon,
  "Unreal": UnrealengineOriginalIcon,
  "TypeScript": TypescriptOriginalIcon,
  "JavaScript": JavascriptOriginalIcon,
  "HTML5": Html5OriginalIcon,
  "CSS3": Css3OriginalIcon,
  "Git": GitOriginalIcon,
  "GitHub Actions": GithubactionsOriginalIcon,
  "RabbitMQ": RabbitmqOriginalIcon,
  "Flutter": FlutterOriginalIcon,
};

export const hasTechIcon = (technology: string) => technology in icons;

export function TechIcon({ technology, className = "", size }: { technology: string; className?: string; size?: string | number }) {
  const Icon = icons[technology];
  return Icon ? <Icon aria-hidden="true" className={className} size={size} /> : null;
}

export function TechBadge({ children }: { children: string }) {
  const Icon = icons[children];
  return <span className="inline-flex items-center gap-1.5 rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-xs text-slate-300">{Icon ? <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" /> : null}{children}</span>;
}
