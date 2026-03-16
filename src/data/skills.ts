import type { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    id: 'core',
    label: 'Core Backend',
    icon: '⚙',
    skills: [
      { name: 'Java 21', level: 'expert' },
      { name: 'Spring Boot 3.5', level: 'expert' },
      { name: 'Spring MVC', level: 'expert' },
      { name: 'Spring Security', level: 'expert' },
      { name: 'Spring Data JPA', level: 'expert' },
      { name: 'Hibernate', level: 'expert' },
      { name: 'REST APIs', level: 'expert' },
      { name: 'Microservices', level: 'expert' },
      { name: 'Maven', level: 'proficient' },
    ],
  },
  {
    id: 'data',
    label: 'Data & Messaging',
    icon: '🗄',
    skills: [
      { name: 'MySQL', level: 'expert' },
      { name: 'PostgreSQL', level: 'proficient' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'Redis', level: 'proficient' },
      { name: 'AWS SQS', level: 'proficient' },
      { name: 'AWS SNS', level: 'proficient' },
      { name: 'Apache Kafka', level: 'familiar' },
      { name: 'HikariCP', level: 'expert' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: '☁',
    skills: [
      { name: 'AWS (EC2, S3, SQS, SNS)', level: 'proficient' },
      { name: 'Docker', level: 'proficient' },
      { name: 'Kubernetes', level: 'familiar' },
      { name: 'CI/CD Pipelines', level: 'proficient' },
      { name: 'Git / GitHub', level: 'expert' },
      { name: 'Linux', level: 'proficient' },
    ],
  },
  {
    id: 'security',
    label: 'Security & IAM',
    icon: '🔐',
    skills: [
      { name: 'Keycloak', level: 'expert' },
      { name: 'LDAP', level: 'proficient' },
      { name: 'JWT', level: 'expert' },
      { name: 'OAuth 2.0', level: 'expert' },
      { name: 'RBAC', level: 'expert' },
      { name: 'OWASP Top 10', level: 'proficient' },
      { name: 'OpenAPI / Swagger', level: 'expert' },
    ],
  },
  {
    id: 'quality',
    label: 'Quality & Testing',
    icon: '🧪',
    skills: [
      { name: 'JUnit 5', level: 'expert' },
      { name: 'Mockito', level: 'expert' },
      { name: 'JaCoCo', level: 'expert' },
      { name: 'SonarQube', level: 'expert' },
      { name: 'SonarLint', level: 'proficient' },
      { name: 'TDD', level: 'proficient' },
      { name: 'Static Analysis', level: 'proficient' },
    ],
  },
  {
    id: 'integration',
    label: 'Integrations',
    icon: '🔗',
    skills: [
      { name: 'Apache POI', level: 'expert' },
      { name: 'Fawry Payments', level: 'proficient' },
      { name: 'Postman', level: 'expert' },
      { name: 'Service Virtualization', level: 'proficient' },
      { name: 'SMS Gateway (VictorLink)', level: 'familiar' },
      { name: 'MNGM E-commerce', level: 'familiar' },
    ],
  },
];

export const allSkills = skillCategories.flatMap(c => c.skills);
