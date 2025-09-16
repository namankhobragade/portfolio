
import { ShieldCheck, Code, Cpu, Server, BrainCircuit, Bot, Award, CloudCog, GraduationCap, Briefcase, BookOpen, Star, Database, Cloud, GitBranch, Terminal, Globe, CreditCard, GitCommit, Container, Users, Settings, SearchCheck, Shield, GanttChartSquare, Layers } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'Backend',
    skills: [
      { name: 'PHP', icon: Code, proficiency: 95 },
      { name: 'Laravel', icon: Code, proficiency: 90 },
      { name: 'CodeIgniter', icon: Code, proficiency: 85 },
      { name: 'Node.js', icon: Code, proficiency: 80 },
      { name: 'Express.js', icon: Code, proficiency: 80 },
      { name: 'Python', icon: Code, proficiency: 75 },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: Code, proficiency: 90 },
      { name: 'HTML', icon: Code, proficiency: 95 },
      { name: 'Bootstrap', icon: Code, proficiency: 90 },
      { name: 'Next.js', icon: Code, proficiency: 85 },
      { name: 'React', icon: Code, proficiency: 80 },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', icon: Database, proficiency: 95 },
      { name: 'MongoDB', icon: Database, proficiency: 85 },
      { name: 'Redis', icon: Database, proficiency: 70 },
    ],
  },
  {
    category: 'Web Servers',
    skills: [
      { name: 'Nginx', icon: Server, proficiency: 80 },
      { name: 'Apache', icon: Server, proficiency: 85 },
    ],
  },
  {
    category: 'Version Control',
    skills: [
      { name: 'Git', icon: GitBranch, proficiency: 90 },
      { name: 'GitHub', icon: GitBranch, proficiency: 90 },
      { name: 'GitLab', icon: GitBranch, proficiency: 80 },
      { name: 'GitHub Actions', icon: GitCommit, proficiency: 75 },
      { name: 'GitLab CI', icon: GitCommit, proficiency: 75 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: Cloud, proficiency: 70 },
      { name: 'IBM Cloud', icon: CloudCog, proficiency: 65 },
      { name: 'Cloudflare', icon: Cloud, proficiency: 80 },
      { name: 'Docker', icon: Container, proficiency: 75 },
      { name: 'Microservices', icon: Settings, proficiency: 70 },
      { name: 'Linux', icon: Terminal, proficiency: 85 },
    ],
  },
  {
    category: 'Payment Gateways',
    skills: [
      { name: 'Stripe', icon: CreditCard, proficiency: 90 },
      { name: 'PhonePe', icon: CreditCard, proficiency: 85 },
      { name: 'Razorpay', icon: CreditCard, proficiency: 85 },
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'Penetration Testing', icon: ShieldCheck, proficiency: 85 },
      { name: 'Network Security', icon: Cloud, proficiency: 80 },
      { name: 'SOC & Risk Assessment', icon: Cpu, proficiency: 75 },
      { name: 'OWASP Practices', icon: ShieldCheck, proficiency: 90 },
      { name: 'Vulnerability Assessment', icon: ShieldCheck, proficiency: 85 },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'Proffid – Secure Identity Platform',
    description: 'A secure, plug-and-play user authentication layer for SaaS applications.',
    techStack: ['Laravel', 'MongoDB'],
    securityFocus: 'Role-based auth, JWT, session hardening.',
    githubUrl: 'https://github.com/naman-mahi',
    demoUrl: '#',
    imageId: 'project-1',
  },
  {
    title: 'E-Learning Platform (Client Project)',
    description: 'Full-stack platform with live classes, integrated billing, and secure student/teacher dashboards.',
    techStack: ['CodeIgniter 4', 'MySQLi', 'BigBlueButton'],
    securityFocus: 'CSRF protection, access control, tokenization.',
    imageId: 'project-2',
  },
  {
    title: 'SOC Assistant (In Progress)',
    description: 'Prototype chatbot for automated alert triage using LLMs. Goal: Parse security logs and respond with mitigation suggestions.',
    techStack: ['Python', 'LLM', 'FastAPI'],
    securityFocus: 'Automated Security Analysis, Prompt Injection Defense.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-3',
  },
  {
    title: 'Cloud Security Posture Manager',
    description: 'A dashboard that scans AWS environments for misconfigurations and compliance violations.',
    techStack: ['Next.js', 'Node.js', 'AWS SDK'],
    securityFocus: 'IAM Role Analysis, Security Group Auditing.',
    demoUrl: '#',
    imageId: 'project-4',
  },
  {
    title: 'Encrypted File Sharing Service',
    description: 'A web app for securely sharing files with end-to-end encryption using modern web cryptography.',
    techStack: ['React', 'Node.js', 'Web Crypto API'],
    securityFocus: 'End-to-End Encryption (E2EE), Secure File Deletion.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-5',
  },
  {
    title: 'DevSecOps Pipeline Orchestrator',
    description: 'A tool to automate security checks (SAST, DAST, Container Scanning) in CI/CD pipelines.',
    techStack: ['Python', 'Docker', 'Jenkins API'],
    securityFocus: 'Automated SAST/DAST, Vulnerability Management.',
    imageId: 'project-6',
  },
  {
    title: 'AI-Powered Phishing Detector',
    description: 'A browser extension that uses a fine-tuned LLM to analyze emails for phishing indicators.',
    techStack: ['JavaScript', 'TensorFlow.js', 'Genkit'],
    securityFocus: 'Natural Language Processing, Real-time Threat Detection.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-7',
  },
  {
    title: 'Multi-Tenant SaaS Boilerplate',
    description: 'A secure starter kit for building multi-tenant SaaS applications with Laravel and Next.js.',
    techStack: ['Laravel', 'Next.js', 'PostgreSQL'],
    securityFocus: 'Tenant Data Isolation, Row-Level Security.',
    githubUrl: 'https://github.com/naman-mahi',
    demoUrl: '#',
    imageId: 'project-8',
  },
  {
    title: 'Smart Home IoT Security Hub',
    description: 'A central dashboard to monitor network traffic from IoT devices and flag anomalous behavior.',
    techStack: ['Node.js', 'React', 'MQTT'],
    securityFocus: 'Network Anomaly Detection, Device Authentication.',
    imageId: 'project-9',
  },
  {
    title: 'Decentralized Bug Bounty Platform',
    description: 'A proof-of-concept platform using blockchain to facilitate transparent and secure bug bounty programs.',
    techStack: ['Solidity', 'Next.js', 'Ethers.js'],
    securityFocus: 'Smart Contract Security, Decentralized Identity.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-10',
  },
];

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
];

    