import { ShieldCheck, Code, Cpu, Server, BrainCircuit, PenTool, Database, Cloud, GitBranch, Bot, Award, CloudCog } from 'lucide-react';

export const SKILLS_DATA = [
  {
    category: 'Web Development',
    skills: [
      { name: 'React / Next.js', level: 95, icon: Code },
      { name: 'TypeScript', level: 90, icon: Code },
      { name: 'Node.js', level: 85, icon: Server },
      { name: 'GraphQL', level: 75, icon: GitBranch },
    ],
  },
  {
    category: 'Cybersecurity',
    skills: [
      { name: 'Penetration Testing', level: 88, icon: ShieldCheck },
      { name: 'Secure SDLC', level: 92, icon: ShieldCheck },
      { name: 'Cloud Security (AWS, GCP)', level: 80, icon: Cloud },
      { name: 'Threat Modeling', level: 85, icon: ShieldCheck },
    ],
  },
  {
    category: 'AI / LLMs',
    skills: [
      { name: 'Prompt Engineering', level: 90, icon: Bot },
      { name: 'Genkit / Firebase AI', level: 85, icon: BrainCircuit },
      { name: 'RAG Implementation', level: 78, icon: Database },
      { name: 'AI Ethics & Safety', level: 82, icon: Bot },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker & Kubernetes', level: 85, icon: Server },
      { name: 'CI/CD Pipelines', level: 90, icon: GitBranch },
      { name: 'Infrastructure as Code', level: 80, icon: PenTool },
      { name: 'Monitoring & Logging', level: 88, icon: Cpu },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'SecureAuth SSO Platform',
    description: 'A robust single sign-on solution with multi-factor authentication, biometric security, and advanced session management to protect enterprise applications.',
    techStack: ['Next.js', 'Go', 'PostgreSQL', 'Docker', 'AWS'],
    securityFocus: 'OAuth 2.1, OIDC, FIDO2/WebAuthn, XSS/CSRF Prevention.',
    githubUrl: 'https://github.com',
    imageId: 'project-1',
  },
  {
    title: 'AI Threat Detection System',
    description: 'A real-time threat intelligence platform using machine learning models to detect and mitigate anomalous network behavior and potential breaches.',
    techStack: ['Python', 'TensorFlow', 'Kafka', 'GCP', 'Kubernetes'],
    securityFocus: 'Adversarial ML Defense, Data Encryption, Anomaly Detection.',
    githubUrl: 'https://github.com',
    imageId: 'project-2',
  },
  {
    title: 'DevSecOps Pipeline Automation',
    description: 'Automated CI/CD pipeline incorporating SAST, DAST, and SCA scanning to ensure code quality and security from development to deployment.',
    techStack: ['Jenkins', 'SonarQube', 'OWASP ZAP', 'Ansible'],
    securityFocus: 'Automated Security Testing, Secret Management, IaC Security.',
    imageId: 'project-3',
  },
];

export const EXPERIENCE_DATA = [
  {
    role: 'Freelance Developer & Security Consultant',
    company: 'Self-Employed',
    period: '2022 - Present',
    responsibilities: [
      'Developed full-stack applications for clients using Next.js, Node.js, and Python.',
      'Conducted security audits and penetration testing for web applications to identify and mitigate vulnerabilities.',
      'Integrated AI-powered features, including chatbots and data analysis tools, using modern LLM frameworks.',
      'Designed and implemented secure authentication and authorization systems (OAuth 2.0, JWT, OIDC).',
    ],
  },
  {
    role: 'Cybersecurity Research Intern',
    company: 'SecureTech Labs',
    period: 'Summer 2021',
    responsibilities: [
      'Researched emerging threats in IoT and cloud environments.',
      'Assisted in developing proof-of-concept exploits for controlled security demonstrations.',
      'Contributed to a threat intelligence report on new malware strains.',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'Digital Solutions Inc.',
    period: '2020 - 2022',
    responsibilities: [
      'Contributed to the development of client websites using React and a headless CMS.',
      'Collaborated with senior developers to debug and resolve issues in existing codebases.',
      'Participated in code reviews and learned best practices for web development and version control.',
    ],
  },
];

export const CERTIFICATIONS_DATA = [
    {
        name: 'Certified Ethical Hacker (CEH)',
        issuer: 'EC-Council',
        icon: ShieldCheck,
    },
    {
        name: 'AWS Certified Security - Specialty',
        issuer: 'Amazon Web Services',
        icon: CloudCog,
    },
    {
        name: 'IBM AI Engineering Professional',
        issuer: 'IBM',
        icon: BrainCircuit,
    },
    {
        name: 'Cisco Certified CyberOps Associate',
        issuer: 'Cisco',
        icon: Cpu,
    },
     {
        name: 'CompTIA Security+',
        issuer: 'CompTIA',
        icon: Award,
    },
    {
        name: 'Certified Full-Stack Developer',
        issuer: 'Codecademy',
        icon: Code,
    }
];

export const BLOG_POSTS_DATA = [
    {
        title: "The Future of Authentication: Beyond Passwords",
        fullContent: "The traditional password system is becoming increasingly obsolete in the face of sophisticated cyber threats. This article explores the rise of passwordless authentication methods like FIDO2, WebAuthn, and biometric verification. We'll delve into the security benefits, implementation challenges, and how these technologies are shaping a more secure digital identity for users and organizations. We will cover the core principles of public-key cryptography that underpin these standards and provide a step-by-step guide to integrating a simple WebAuthn flow into a modern web application.",
        link: "#",
        imageId: "blog-1",
    },
    {
        title: "How AI is Revolutionizing Threat Intelligence",
        fullContent: "Artificial intelligence is no longer a buzzword in cybersecurity; it's a critical component of modern defense strategies. This post examines how machine learning models are being used to analyze vast datasets, identify subtle patterns of malicious activity, and predict future threats with unprecedented accuracy. From anomaly detection in network traffic to automated malware analysis, we'll uncover the practical applications of AI that are helping security teams stay one step ahead of attackers. We'll also discuss the challenges, such as model poisoning and adversarial attacks against AI systems themselves.",
        link: "#",
        imageId: "blog-2",
    },
    {
        title: "A Practical Guide to Secure Coding in JavaScript",
        fullContent: "JavaScript's ubiquity makes it a prime target for attackers. This guide provides developers with actionable advice and best practices for writing secure JavaScript code. We'll cover common vulnerabilities like Cross-Site Scripting (XSS), Cross-Site Request Forgery (CSRF), and insecure direct object references. Each section includes code examples of both vulnerable and secured implementations, focusing on modern frameworks like React and Next.js. Learn how to leverage built-in security features, sanitize inputs, and use security headers to build more resilient web applications.",
        link: "#",
        imageId: "blog-3",
    }
];
