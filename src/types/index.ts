export interface Skill {
  name: string;
  level: 'expert' | 'proficient' | 'familiar';
  icon?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export interface ExperienceEntry {
  id: string;
  company: string;
  companyShort: string;
  role: string;
  domain: string;
  period: string;
  start: string;
  end: string;
  current: boolean;
  color: string;
  bullets: string[];
  tags: string[];
  metrics?: { label: string; value: string }[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  company: string;
  companyShort: string;
  title: string;
  subtitle: string;
  period: string;
  domain: string;
  tags: string[];
  problem: string;
  approach: ApproachStep[];
  outcomes: Outcome[];
  architecture?: ArchNode[];
  color: string;
  accentColor: string;
}

export interface ApproachStep {
  step: number;
  title: string;
  description: string;
  tech: string[];
}

export interface Outcome {
  metric: string;
  value: string;
  description: string;
  positive: boolean;
}

export interface ArchNode {
  id: string;
  label: string;
  sublabel?: string;
  type: 'service' | 'queue' | 'db' | 'external' | 'gateway';
  x: number;
  y: number;
  connections?: string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
  prefix?: string;
}
