export interface Project {
  title: string;
  description?: string;
  url: string;
  demo?: string;
  topics: string[];
  stars: number;
  updatedAt?: string;
  tech: string[];
}

export interface Blog {
  title: string;
  summary: string;
  url: string;
  topics: string[];
  publishedAt: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  issued: string;
  link: string;
}

export interface Education {
  school: string;
  program: string;
  period: string;
  coursework?: string[];
}

export interface UIConfig {
  name: string;
  role: string;
  avatar: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
}

export interface AppConfig {
  githubUser: string;
  projects: {
    mode: "auto" | "json";
    jsonUrl: string;
    maxRepos: number;
  };
  blogs: {
    mode: "json" | "devto";
    jsonUrl?: string;
    devtoUsername?: string;
  };
  ui: UIConfig;
}

export type TabType = 'projects' | 'blogs' | 'experience' | 'certs' | 'education' | 'skills';
export type SortType = 'stars' | 'updated';
export type MatchType = 'any' | 'all';
export type ScopeType = 'all' | 'blogs' | 'projects';
