// src/types/portfolio.ts

export interface HeroData {
  name: string;
  headlineLine1: string;
  headlineLine2: string;
  headlineLine3: string;
  rolesText: string;
  descriptionParagraph1: string;
  descriptionParagraph2: string;
  exploreWorkText: string;
  resumeUrl: string;
  quoteTitle: string;
  quoteSubtitle: string;
  watermarkUrl?: string;
  heroVideoUrl?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface AboutData {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  bioName: string;
  bioRole: string;
  bioDescription: string;
  stats: StatItem[];
  aboutImageUrl?: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  year?: string;
  longDescription?: string;
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  tags?: string[];
  number?: string;
  tech?: string[];
  metrics?: ProjectMetric[];
}

export interface SkillItem {
  name: string;
  level?: number;
}

export interface SkillBlock {
  id?: string;
  category: string;
  icon?: string;
  items: SkillItem[] | string[];
  title?: string;
  badge?: string;
  description?: string;
  stat?: string;
  colSpan?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  year?: string;
  title?: string;
  organization?: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface SocialLinksMap {
  github?: string;
  linkedin?: string;
  twitter?: string;
  leetcode?: string;
  instagram?: string;
}

export interface ContactInfo {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  heading?: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  availabilityStatus?: string;
  socials: SocialLink[] | SocialLinksMap;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface PortfolioData {
  adminPin: string;
  hero: HeroData;
  about: AboutData;
  projects: Project[];
  skills: any[];
  experience: any[];
  contact: any;
  messages: ContactMessage[];
}

export const PORTFOLIO_VERSION = '1.0.0';
