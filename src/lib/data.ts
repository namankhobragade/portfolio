import { ShieldCheck, Code, Cpu, Server, BrainCircuit, PenTool, Database, Cloud, GitBranch, Bot, Award, CloudCog, GraduationCap, Briefcase, BookOpen, Star } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'Top Skills',
    skills: [
      { name: 'Technology Leadership', icon: Briefcase },
      { name: 'Managing Technical Personnel', icon: Briefcase },
      { name: 'Laravel', icon: Code },
    ],
  },
  {
    category: 'Full-Stack Development',
    skills: [
      { name: 'Next.js', icon: Code },
      { name: 'MongoDB', icon: Database },
      { name: 'MySQLi', icon: Database },
      { name: 'CodeIgniter', icon: Code },
      { name: 'Stripe/Razorpay', icon: Server },
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'Penetration Testing', icon: ShieldCheck },
      { name: 'Network Security', icon: Cloud },
      { name: 'SOC & Risk Assessment', icon: Cpu },
      { name: 'OWASP Practices', icon: ShieldCheck },
      { name: 'Vulnerability Assessment', icon: ShieldCheck },
    ],
  },
  {
    category: 'AI & Innovation',
    skills: [
      { name: 'AI/LLMs for Security', icon: BrainCircuit },
      { name: 'SOC Automation', icon: Bot },
      { name: 'Threat Detection', icon: BrainCircuit },
      { name: 'Secure Coding Audit', icon: Bot },
    ],
  },
   {
    category: 'Languages',
    skills: [
      { name: 'English', icon: BookOpen },
      { name: 'Hindi', icon: BookOpen },
      { name: 'Marathi', icon: BookOpen },
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
    period: 'March 2025 – Present',
    responsibilities: [
      'Leading a cross-functional team to develop secure and scalable web applications.',
      'Architecting full-stack solutions using Laravel, Next.js, MongoDB, and MySQLi.',
      'Enforcing secure coding practices and optimizing performance across microservices.',
      'Exploring integration of AI/LLM tools to automate and enhance software security.',
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
    role: 'Freelance Full-Stack Developer',
    company: 'Self-employed',
    period: 'Jan 2020 – Present',
    responsibilities: [
      'Built secure, custom web applications for clients in education, e-commerce, and SaaS.',
      'Used Laravel + Next.js stack with MongoDB and MySQLi for backend and frontend.',
      'Integrated third-party services like Stripe, Razorpay, and OAuth.',
      'Applied OWASP practices to prevent XSS, CSRF, and SQLi vulnerabilities.'
    ],
  },
  {
    role: 'Full-stack Developer',
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
];

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
];


export const BLOG_POSTS_DATA = [];
