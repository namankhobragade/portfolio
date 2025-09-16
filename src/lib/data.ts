import { ShieldCheck, Code, Cpu, Server, BrainCircuit, Bot, Award, CloudCog, GraduationCap, Briefcase, BookOpen, Star, Database, Cloud, GitBranch, Terminal, Globe, CreditCard, GitCommit, Container, Users, Settings } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'Backend',
    skills: [
      { name: 'PHP', icon: Code },
      { name: 'Laravel', icon: Code },
      { name: 'CodeIgniter', icon: Code },
      { name: 'Node.js', icon: Code },
      { name: 'Express.js', icon: Code },
      { name: 'Python', icon: Code },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'JavaScript', icon: Code },
      { name: 'HTML', icon: Code },
      { name: 'Bootstrap', icon: Code },
      { name: 'Next.js', icon: Code },
      { name: 'React', icon: Code },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', icon: Database },
      { name: 'MongoDB', icon: Database },
      { name: 'Redis', icon: Database },
    ],
  },
  {
    category: 'Web Servers',
    skills: [
      { name: 'Nginx', icon: Server },
      { name: 'Apache', icon: Server },
    ],
  },
  {
    category: 'Version Control',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitBranch },
      { name: 'GitLab', icon: GitBranch },
      { name: 'GitHub Actions', icon: GitCommit },
      { name: 'GitLab CI', icon: GitCommit },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: Cloud },
      { name: 'IBM Cloud', icon: CloudCog },
      { name: 'Cloudflare', icon: Cloud },
      { name: 'Docker', icon: Container },
      { name: 'Microservices', icon: Settings },
      { name: 'Linux', icon: Terminal },
    ],
  },
  {
    category: 'Payment Gateways',
    skills: [
      { name: 'Stripe', icon: CreditCard },
      { name: 'PhonePe', icon: CreditCard },
      { name: 'Razorpay', icon: CreditCard },
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
    demoUrl: '#',
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
    githubUrl: 'https://github.com/naman-mahi',
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
