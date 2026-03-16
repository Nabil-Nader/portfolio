import type { StatItem } from '@/types';

export const PERSONAL = {
  name: 'Nabil Nader',
  title: 'Senior Backend Engineer',
  location: 'Cairo, Egypt',
  email: 'nabilnader@example.com',
  linkedin: 'https://linkedin.com/in/nabilnader',
  github: 'https://github.com/nabilnader',
  phone: '+20 100 371 0641',
  available: true,
  cvUrl: '/Nabil-Rizkalla-CV.pdf',
};

export const STATS: StatItem[] = [
  { value: 5, suffix: '+', label: 'Years in production' },
  { value: 50, suffix: '+', label: 'Microservices shipped' },
  { value: 3, suffix: '', label: 'Industries: FinTech, Retail, Insurance' },
  { value: 156, suffix: '', label: 'Files refactored to 0% dead code' },
];

export const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#stack', label: 'Stack' },
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export const ROLES = [
  'Senior Backend Engineer',
  'Spring Boot Architect',
  'Microservices Specialist',
  'Java Platform Engineer',
  'System Modernisation Lead',
];
