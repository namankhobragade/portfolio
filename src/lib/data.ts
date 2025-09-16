import { ShieldCheck, Code, Cpu, Server, BrainCircuit, PenTool, Database, Cloud, GitBranch, Bot, Award, CloudCog, GraduationCap } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'Full-Stack Development',
    skills: [
      { name: 'Laravel', level: 95, icon: Code },
      { name: 'CodeIgniter', level: 90, icon: Code },
      { name: 'Next.js', level: 85, icon: Code },
      { name: 'MongoDB', level: 80, icon: Database },
      { name: 'MySQLi', level: 88, icon: Database },
      { name: 'REST APIs', level: 92, icon: Server },
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'CEH v13 AI Certified', level: 90, icon: ShieldCheck },
      { name: 'OWASP Secure Coding', level: 92, icon: ShieldCheck },
      { name: 'Penetration Testing', level: 85, icon: ShieldCheck },
      { name: 'Network Security', level: 80, icon: Cloud },
      { name: 'SOC & Risk Assessment', level: 78, icon: Cpu },
    ],
  },
  {
    category: 'AI & Innovation',
    skills: [
      { name: 'LLMs for Threat Detection', level: 85, icon: BrainCircuit },
      { name: 'Chatbot Integration', level: 88, icon: Bot },
      { name: 'Secure AI Development', level: 82, icon: Bot },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 95, icon: GitBranch },
      { name: 'Linux', level: 90, icon: Server },
      { name: 'Docker', level: 85, icon: Server },
      { name: 'Nginx', level: 82, icon: Server },
      { name: 'Burp Suite', level: 80, icon: PenTool },
      { name: 'Wireshark', level: 75, icon: PenTool },
      { name: 'Nmap', level: 78, icon: PenTool },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'Proffid – Secure Identity Platform',
    description: 'A secure, plug-and-play user authentication layer for SaaS applications.',
    techStack: ['Laravel', 'MongoDB'],
    securityFocus: 'Role-based auth, JWT, session hardening.',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: 'project-1',
  },
  {
    title: 'E-Learning Platform (Client Project)',
    description: 'Full-stack platform with live classes, integrated billing, and secure student/teacher dashboards.',
    techStack: ['CodeIgniter 4', 'MySQLi', 'BigBlueButton'],
    securityFocus: 'CSRF protection, access control, tokenization.',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: 'project-2',
  },
  {
    title: 'SOC Assistant (In Progress)',
    description: 'Prototype chatbot for automated alert triage using LLMs. Goal: Parse security logs and respond with mitigation suggestions.',
    techStack: ['Python', 'LLM', 'FastAPI'],
    securityFocus: 'Automated Security Analysis, Prompt Injection Defense.',
    githubUrl: 'https://github.com',
    demoUrl: '#',
    imageId: 'project-3',
  },
];

export const EXPERIENCE_DATA = [
    {
    role: 'Technical Lead',
    company: 'Confidential',
    period: '2025–Present',
    responsibilities: [
      'Leading a full-stack team building secure, scalable platforms.',
      'Integrating AI-based tools for security automation.',
      'Enforcing secure coding practices across teams.',
    ],
  },
  {
    role: 'Freelance Developer',
    company: 'Self-Employed',
    period: '2020–Present',
    responsibilities: [
      'Delivered 20+ custom web platforms across education, e-commerce, and SaaS.',
      'Integrated secure payment systems (Stripe, Razorpay).',
      'Applied OWASP practices: XSS, CSRF, SQLi mitigation.',
    ],
  },
  {
    role: 'Full-Stack Developer',
    company: 'IBM',
    period: '2021–2022',
    responsibilities: [
      'Built secure MERN apps with Angular CLI.',
      'Collaborated on system programming with mainframe modules.',
    ],
  },
];

export const EDUCATION_DATA = [
    {
        degree: 'Master’s in Information Security',
        institution: 'IGNOU',
        status: 'Ongoing',
        icon: GraduationCap,
    },
    {
        degree: 'PG Diploma in Information Security',
        institution: 'IGNOU',
        status: 'Completed',
        icon: Award,
    }
];

export const CERTIFICATIONS_DATA = [
    {
        name: 'Certified Ethical Hacker (CEH v13 AI)',
        issuer: 'EC-Council',
        icon: ShieldCheck,
    },
    {
        name: 'IBM Security Course',
        issuer: 'IBM',
        icon: CloudCog,
    },
     {
        name: 'Cisco Security Course',
        issuer: 'Cisco',
        icon: Cpu,
    },
    {
        name: 'Full-Stack Developer',
        issuer: 'Self-accredited',
        icon: Code,
    }
];


export const BLOG_POSTS_DATA = [];
