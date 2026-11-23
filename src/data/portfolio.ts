/**
 * All portfolio content lives here. Edit this file to update the site —
 * components read from it and contain no hard-coded personal data.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Layout,
  Server,
  Database,
  ShieldCheck,
  BarChart3,
  Wrench,
  Layers,
  FolderGit2,
  Award,
  Boxes,
} from 'lucide-react';

export const profile = {
  name: 'Rohit R',
  firstName: 'Rohit',
  title: 'Software Developer | QA Engineer | Data Analytics Enthusiast',
  roles: ['Software Developer', 'QA Engineer', 'Data Analytics Enthusiast'],
  location: 'Coimbatore, Tamil Nadu, India',
  email: 'rohitramesh2910@gmail.com',
  github: 'https://github.com/Rohit-Ramesh29',
  linkedin: 'https://linkedin.com/in/rohit-ramesh-27b500290',
  /** Drop your photo at public/images/profile.jpg (square, ~800×800). Initials are shown until it exists. */
  photo: '/images/profile.jpg',
  /** Drop your resume at public/resume/Rohit_R_Resume.pdf. The button tells visitors if it's not uploaded yet. */
  resume: '/resume/Rohit_R_Resume.pdf',
  intro: [
    'I am a passionate Information Technology engineering student with strong interests in Software Development, Quality Assurance, and Data Analytics. I enjoy building real-world applications, solving technical problems, ensuring software quality, and transforming raw data into meaningful insights.',
    'I have hands-on experience developing business applications through freelance projects and working with modern technologies across frontend, backend, databases, and data analytics.',
  ],
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'qa', label: 'QA' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;

export const heroBadges = ['Java', 'SQL', 'React', 'Node.js', 'MongoDB', 'Python'];

export const aboutPoints = [
  'Final-year B.Tech Information Technology student at Sri Krishna College of Technology.',
  'Interested in software engineering and software quality assurance.',
  'Hands-on experience in full-stack development across frontend, backend and databases.',
  'Developed business applications for real clients through freelance work.',
  'Knowledge of exploratory data analysis with Python and its analytical libraries.',
  'Passionate about continuous learning and problem-solving.',
];

export type Stat = { value?: number; suffix?: string; text?: string; label: string; icon: LucideIcon };
export const stats: Stat[] = [
  { value: 2, suffix: '+', label: 'Development Domains', icon: Layers },
  { value: 3, suffix: '+', label: 'Major Technical Projects', icon: FolderGit2 },
  { text: 'Multiple', label: 'Technology Stacks', icon: Boxes },
  { value: 2, label: 'Professional Certifications', icon: Award },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  accent: 'blue' | 'purple' | 'cyan';
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: Code2,
    accent: 'blue',
    skills: [
      'Java',
      'Python',
      'JavaScript',
      'SQL',
    ],
  },
  {
    title: 'Frontend',
    icon: Layout,
    accent: 'purple',
    skills: [
      'HTML5',
      'CSS3',
      'React.js',
      'Bootstrap',
    ],
  },
  {
    title: 'Backend',
    icon: Server,
    accent: 'cyan',
    skills: [
      'Node.js',
      'Express.js',
    ],
  },
  {
    title: 'Database',
    icon: Database,
    accent: 'blue',
    skills: [
      'MySQL',
      'MongoDB',
    ],
  },
  {
    title: 'Software Testing / QA',
    icon: ShieldCheck,
    accent: 'purple',
    skills: [
      'Manual Testing',
      'Exploratory Testing',
      'Test Case Design',
      'Bug Reporting',
      'Selenium',
      'Automation Testing',
    ],
  },
  {
    title: 'Data Analytics',
    icon: BarChart3,
    accent: 'cyan',
    skills: [
      'Python',
      'Pandas',
      'NumPy',
      'Exploratory Data Analysis',
      'Data Visualization',
    ],
  },
  {
    title: 'Tools',
    icon: Wrench,
    accent: 'blue',
    skills: [
      'Git',
      'GitHub',
      'Postman',
      'VS Code',
    ],
  },
];

export type Project = {
  id: 'gold' | 'mentor' | 'eda';
  title: string;
  category: string;
  description: string;
  features: string[];
  tech: string[];
  github?: string;
  demo?: string;
  /** Shown when there is no public repository. */
  privateNote?: string;
};

export const projects: Project[] = [
  {
    id: 'gold',
    title: 'Gold Business Management Application',
    category: 'Freelance Development Project',
    description:
      'Developed a business management application for a jewellery shop to simplify daily business operations. The application focuses on billing, barcode scanning and generation, inventory management, and customer installment tracking.',
    features: [
      'Billing Management',
      'Barcode Generation and Scanning',
      'Inventory Management',
      'Chit Fund / Installment Tracking',
      'Inventory Valuation',
      'Admin and Role Management',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    privateNote: 'Client project · source is private',
  },
  {
    id: 'mentor',
    title: 'AI-Powered Personalized Interview Mentor',
    category: 'AI / Full-Stack Project',
    description:
      'An AI-powered interview preparation platform designed to provide personalized interview experiences using resume analysis, intelligent question generation, and performance evaluation.',
    features: [
      'Resume Parsing',
      'AI-Based Interview Questions',
      'Mock Interview Sessions',
      'Performance Evaluation',
      'Analytics Dashboard',
    ],
    tech: ['React', 'TypeScript', 'FastAPI', 'MongoDB', 'ChromaDB', 'RAG'],
    github: 'https://github.com/Rohit-Ramesh29/AI-Powered-Personalized-Interview-Mentor',
  },
  {
    id: 'eda',
    title: 'Exploratory Data Analysis',
    category: 'Data Analytics Project',
    description:
      'Performed exploratory data analysis using Python to understand datasets, identify patterns, discover trends, and generate meaningful insights through data visualization.',
    features: ['Data Cleaning', 'Pattern Discovery', 'Trend Analysis', 'Statistical Summaries', 'Visual Storytelling'],
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    privateNote: 'More analysis work on my GitHub profile',
  },
];

export const qaSkills = [
  'Manual Testing',
  'Exploratory Testing',
  'Functional Testing',
  'Test Case Preparation',
  'Bug Identification',
  'Regression Testing',
  'Selenium Automation Fundamentals',
];

export const qaWorkflow = [
  {
    title: 'Requirement Analysis',
    detail: 'Study the requirements, clarify ambiguities early and identify what is testable — the cheapest place to catch a defect.',
    output: 'Testable requirements',
  },
  {
    title: 'Test Planning',
    detail: 'Define scope, approach, priorities, environments and the entry / exit criteria for the testing effort.',
    output: 'Test plan & scope',
  },
  {
    title: 'Test Case Design',
    detail: 'Write clear, traceable test cases covering positive, negative and boundary scenarios with expected results.',
    output: 'Test cases & data',
  },
  {
    title: 'Test Execution',
    detail: 'Run test cases manually or with Selenium scripts, explore beyond the script and record actual results.',
    output: 'Execution results',
  },
  {
    title: 'Bug Reporting',
    detail: 'Log reproducible defects with steps, expected vs. actual behaviour, severity, priority and evidence.',
    output: 'Actionable bug reports',
  },
  {
    title: 'Regression Testing',
    detail: 'Re-test fixes and verify that new changes have not broken existing, previously working functionality.',
    output: 'Release confidence',
  },
];

export const analyticsSkills = ['Python', 'Pandas', 'NumPy', 'Data Cleaning', 'Exploratory Data Analysis', 'Data Visualization'];

export const education = [
  {
    degree: 'B.Tech — Information Technology',
    institution: 'Sri Krishna College of Technology, Coimbatore',
    period: '2023 – 2027',
    score: 'CGPA: 7.67',
    current: true,
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'Sri Jayendra Matriculation Higher Secondary School',
    period: '2023',
    score: 'Percentage: 90.5%',
    current: false,
  },
];

/** Add `issuer` / `credentialUrl` when available — fields left undefined are simply not shown. */
export const certifications: { title: string; issuer?: string; area: string; credentialUrl?: string }[] = [
  { title: 'Python Programming', issuer: 'Cisco', area: 'Programming' },
  { title: 'Data Science', area: 'Data Analytics' },
];
