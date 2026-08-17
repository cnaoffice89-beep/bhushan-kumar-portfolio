export type SkillLevel =
  | "Hands-on"
  | "Working Knowledge"
  | "Project Experience"
  | "Professional Exposure";

export type Skill = {
  id: string;
  name: string;
  level: SkillLevel;
  description: string;
  relation: string;
};

export type TimelineItem = {
  id: string;
  year: string;
  title: string;
  summary: string;
  details: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
};

export type ExperienceItem = {
  id: string;
  role: string;
  field: string;
  company?: string;
  isCurrent: boolean;
  focus: string[];
  details: string;
};

export type ProjectStatus = "live" | "coming-soon" | "in-progress";

export type ProjectCaseStudy = {
  overview?: string;
  role?: string;
  technology?: string;
  built?: string;
  process?: string;
  features?: string[];
  result?: string;
};

export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  role: string;
  technologies: string[];
  deployment?: string;
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  status: ProjectStatus;
  featured?: boolean;
  caseStudy: ProjectCaseStudy;
};

export type Certificate = {
  id: string;
  name: string;
  organization?: string;
  date?: string;
  credential?: string;
  image?: string;
  verificationUrl?: string;
  status: "active" | "coming-soon";
};

export type FormStatus = "idle" | "loading" | "success" | "error";
