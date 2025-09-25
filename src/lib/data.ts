
import { ShieldCheck, Code, Cpu, Server, BrainCircuit, Bot, Award, CloudCog, GraduationCap, Briefcase, BookOpen, Star, Database, Cloud, GitBranch, Terminal, Globe, CreditCard, GitCommit, Container, Users, Settings, SearchCheck, Shield, GanttChartSquare, Layers, LucideIcon } from 'lucide-react';

type Skill = {
  name: string;
  icon: LucideIcon;
};

type SkillCategory = {
  category: string;
  description: string;
  skills: Skill[];
};

export const SITE_CONFIG = {
  name: "Sunil Khobragade",
  jobTitle: "Freelance Full-Stack Developer & Cybersecurity Specialist",
  heroDescription1: "I’m a Hyderabad-based freelance developer and cybersecurity enthusiast with a passion for transforming complex challenges into simple, elegant solutions.",
  heroDescription2: "My work spans secure full-stack development, AI integration, and the convergence of robust code and proactive security. I leverage my expertise in Laravel, Next.js, and cybersecurity best practices to build applications that are not only functional but also resilient.",
  siteTitle: "Sunil Khobragade | Freelance Full-Stack Developer & Cybersecurity Specialist",
  siteDescription: "The professional portfolio of Sunil Khobragade, a freelance Full-Stack Developer and Cybersecurity expert specializing in secure, AI-powered web applications.",
  keywords: ["Sunil Khobragade", "Freelance Developer", "Full-Stack Developer", "Cybersecurity Specialist", "AI Developer", "Laravel", "Next.js", "Portfolio"],
  githubUrl: "https://github.com/naman-mahi",
  linkedinUrl: "https://www.linkedin.com/in/sunilkhobragade",
};

export const EXPERIENCE_DATA = [
  {
    role: 'Freelance Full-Stack Developer & Security Consultant',
    company: 'Self-Employed',
    period: '2020 – Present',
    responsibilities: [
      'Delivered over 20 secure, custom web applications for clients in education, e-commerce, and SaaS.',
      'Architected and built full-stack solutions using Laravel, Next.js, MongoDB, and MySQLi.',
      'Integrated third-party services like Stripe, Razorpay, and OAuth, ensuring secure data handling.',
      'Applied OWASP Top 10 practices to prevent XSS, CSRF, and SQLi vulnerabilities, conducting regular security audits.'
    ],
  },
  {
    role: 'Technical Lead',
    company: 'Confidential',
    period: 'March 2025 – Present',
    responsibilities: [
      'Led a cross-functional team to develop secure and scalable web applications.',
      'Architecting full-stack solutions using Laravel, Next.js, MongoDB, and MySQLi.',
      'Enforced secure coding practices and optimized performance across microservices.',
      'Explored integration of AI/LLM tools to automate and enhance software security.',
    ],
  },
  {
    role: 'Full-stack Developer',
    company: 'Confidential',
    period: 'Aug 2024 – Present',
    responsibilities: [
      'Designed and maintained e-learning platforms with live class integrations (BigBlueButton).',
      'Developed secure REST APIs with CodeIgniter 4 and integrated Stripe/Billplz payments.',
      'Conducted vulnerability assessments and handled technical issue resolution.',
    ],
  },
  {
    role: 'Full-stack Developer',
    company: 'Confidential',
    period: 'Oct 2022 – July 2024',
    responsibilities: [
      'Collaborated with cross-functional teams to enhance our e-learning platform.',
      'Designed, developed, and maintained responsive web applications for exceptional user experiences.',
      'Ensured platform reliability, security, and optimization.',
    ],
  },
  {
    role: 'Full-stack Developer (Contract)',
    company: 'IBM',
    period: 'Sep 2021 – March 2022',
    responsibilities: [
      'Built MERN stack applications with focus on scalable architecture and UI/UX.',
      'Designed secure RESTful APIs and implemented frontend using Angular CLI.',
      'Collaborated on system programming modules with mainframe integrations.',
    ],
  },
];

export const EDUCATION_DATA = [
    {
        degree: 'Master’s in Information Security',
        institution: 'Indira Gandhi National Open University',
        status: '2025 - 2025',
        icon: GraduationCap,
    },
    {
        degree: 'PG Diploma in Information Security',
        institution: 'Indira Gandhi National Open University',
        status: '2023 - 2024',
        icon: Award,
    },
    {
        degree: 'Bachelor of Commerce',
        institution: 'Yashwantrao Chavan Maharashtra Open University',
        status: '2019 - 2022',
        icon: GraduationCap,
    },
    {
        degree: 'Diploma in IT',
        institution: 'National Skill Training Institute Hyderabad',
        status: '2019 - 2022',
        icon: Award,
    }
].map(item => ({...item, icon: item.icon.displayName }));

export const CERTIFICATIONS_DATA = [
  {
    name: 'Introduction to Cybersecurity',
    issuer: 'Cisco',
    icon: ShieldCheck,
  },
  {
      name: 'IBM z/OS Mainframe Practitioner',
      issuer: 'IBM',
      icon: CloudCog,
  },
  {
      name: 'Introduction to Packet Tracer',
      issuer: 'Cisco',
      icon: Cpu,
  },
  {
      name: 'Cybersecurity Fundamentals',
      issuer: 'IBM',
      icon: Star,
  }
].map(item => ({...item, icon: item.icon.displayName }));


export const BLOG_POSTS_DATA = [];

export const SERVICES_DATA = [
  {
    title: 'Secure Web Development',
    description: 'Building robust, scalable, and secure web applications from the ground up using modern frameworks like Next.js and Laravel.',
    icon: Shield,
  },
  {
    title: 'Cybersecurity Audits',
    description: 'Comprehensive security assessments, including penetration testing and vulnerability scanning, to identify and mitigate risks.',
    icon: SearchCheck,
  },
  {
    title: 'AI/Chatbot Prototyping',
    description: 'Developing intelligent chatbots and AI-powered tools to automate tasks and enhance security operations.',
    icon: Bot,
  },
  {
    title: 'SOC Architecture Consulting',
    description: 'Designing and implementing effective Security Operations Center (SOC) architectures for proactive threat monitoring and response.',
    icon: GanttChartSquare,
  },
].map(item => ({...item, icon: item.icon.displayName }));
