import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: siteConfig.siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }, { url: `${siteConfig.siteUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: .8 }, ...projects.map((project) => ({ url: `${siteConfig.siteUrl}${project.href}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 }))]; }
