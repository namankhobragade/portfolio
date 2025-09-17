
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

export const SKILLS_DATA: Omit<SkillCategory, 'skills'> & { skills: { name: string; icon: string }[] }[] = [
  {
    category: 'Backend Development',
    description: 'Building robust server-side logic, APIs, and database integrations.',
    skills: [
      { name: 'PHP', icon: 'Code' },
      { name: 'Laravel', icon: 'Code' },
      { name: 'CodeIgniter', icon: 'Code' },
      { name: 'Node.js', icon: 'Code' },
      { name: 'Express.js', icon: 'Code' },
      { name: 'Python', icon: 'Code' },
    ],
  },
  {
    category: 'Frontend Development',
    description: 'Creating responsive and dynamic user interfaces with modern frameworks.',
    skills: [
      { name: 'JavaScript', icon: 'Code' },
      { name: 'HTML & CSS', icon: 'Code' },
      { name: 'Bootstrap', icon: 'Code' },
      { name: 'Next.js', icon: 'Code' },
      { name: 'React', icon: 'Code' },
    ],
  },
  {
    category: 'Databases & Storage',
    description: 'Managing and optimizing relational and NoSQL databases for performance.',
    skills: [
      { name: 'MySQL', icon: 'Database' },
      { name: 'MongoDB', icon: 'Database' },
      { name: 'Redis', icon: 'Database' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    description: 'Deploying and managing applications on cloud platforms with a focus on automation.',
    skills: [
      { name: 'AWS', icon: 'Cloud' },
      { name: 'IBM Cloud', icon: 'CloudCog' },
      { name: 'Cloudflare', icon: 'Cloud' },
      { name: 'Docker', icon: 'Container' },
      { name: 'Linux', icon: 'Terminal' },
    ],
  },
  {
    category: 'Version Control',
    description: 'Utilizing Git for collaborative development and CI/CD for automated workflows.',
    skills: [
      { name: 'Git & GitHub', icon: 'GitBranch' },
      { name: 'GitLab', icon: 'GitBranch' },
      { name: 'GitHub Actions', icon: 'GitCommit' },
      { name: 'GitLab CI', icon: 'GitCommit' },
    ],
  },
  {
    category: 'Cybersecurity',
    description: 'Applying security best practices, from penetration testing to threat modeling.',
    skills: [
      { name: 'Penetration Testing', icon: 'ShieldCheck' },
      { name: 'Network Security', icon: 'Shield' },
      { name: 'SOC & Risk Assessment', icon: 'Cpu' },
      { name: 'OWASP Practices', icon: 'ShieldCheck' },
    ],
  },
];

export const PROJECTS_DATA = [
  {
    title: 'Proffid – Secure Identity Platform',
    slug: 'proffid-secure-identity-platform',
    description: 'A secure, plug-and-play user authentication layer for SaaS applications.',
    techStack: ['Laravel', 'MongoDB'],
    securityFocus: 'Role-based auth, JWT, session hardening.',
    githubUrl: 'https://github.com/naman-mahi',
    demoUrl: '#',
    imageId: 'project-1',
    caseStudy: `
### Problem
Many SaaS applications struggle with implementing a secure and flexible authentication system. Building one from scratch is time-consuming and prone to security flaws.

### Solution
Proffid provides a ready-to-integrate authentication service with robust security features. It handles user registration, login, role management, and session security, allowing developers to focus on their core product.

\`\`\`javascript
// Example: Protecting a route with Proffid middleware
app.get('/api/admin/data', Proffid.auth, Proffid.role('admin'), (req, res) => {
  // Return sensitive data
});
\`\`\`

### Key Features
- **Role-Based Access Control (RBAC):** Easily define and manage user roles and permissions.
- **JWT Implementation:** Securely transmit information between parties as a JSON object.
- **Session Hardening:** Mitigates common session-based attacks.
- **Easy Integration:** Simple to add to any Laravel or Node.js application.
    `,
  },
  {
    title: 'E-Learning Platform (Client Project)',
    slug: 'elearning-platform-client-project',
    description: 'Full-stack platform with live classes, integrated billing, and secure student/teacher dashboards.',
    techStack: ['CodeIgniter 4', 'MySQLi', 'BigBlueButton'],
    securityFocus: 'CSRF protection, access control, tokenization.',
    imageId: 'project-2',
     caseStudy: `
### Problem
The client needed a comprehensive e-learning solution that could handle live classes, recurring subscriptions, and secure access for different user types (students, teachers, admins).

### Solution
I developed a full-stack platform from scratch using CodeIgniter 4. The solution included:
- **Live Class Integration:** Seamlessly integrated BigBlueButton for live video sessions.
- **Secure Payments:** Integrated Stripe for handling recurring subscriptions securely.
- **Role-Specific Dashboards:** Created separate, secure dashboards for students and teachers with distinct functionalities.

\`\`\`php
// Example: CSRF Protection in CodeIgniter 4
$this->security = \Config\Services::security();
// The token can be added to forms
$csrfToken = $this->security->getToken();
\`\`\`

### Security Measures
- Implemented site-wide CSRF protection.
- Enforced strict access control rules to prevent unauthorized access to student data or course materials.
- Used payment tokenization to ensure no sensitive credit card information ever touches the server.
    `,
  },
  {
    title: 'SOC Assistant (In Progress)',
    slug: 'soc-assistant-in-progress',
    description: 'Prototype chatbot for automated alert triage using LLMs. Goal: Parse security logs and respond with mitigation suggestions.',
    techStack: ['Python', 'LLM', 'FastAPI'],
    securityFocus: 'Automated Security Analysis, Prompt Injection Defense.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-3',
     caseStudy: `
### Problem
Security Operations Center (SOC) analysts are often overwhelmed by the sheer volume of alerts, leading to fatigue and missed threats.

### Vision
To create an AI-powered chatbot that acts as a "first responder" for security alerts. The bot will parse incoming logs, enrich the data with threat intelligence, and provide initial analysis and mitigation suggestions to human analysts.

### Current Stage
The project is currently a prototype. I have built a basic engine using Python and a fine-tuned open-source LLM. It can parse common log formats (e.g., firewall, web server) and identify basic patterns.

\`\`\`python
# Conceptual code for the SOC Assistant
def analyze_log(log_entry):
  prompt = f"Analyze this log for threats and suggest mitigation: {log_entry}"
  response = llm.generate(prompt)
  return response.text
\`\`\`

### Challenges & Next Steps
- **Prompt Injection:** A primary security concern is preventing attackers from manipulating the LLM through malicious log entries. I'm researching and implementing input sanitization and instructional defense techniques.
- **Accuracy:** The next step is to improve the model's accuracy by fine-tuning it on a larger, more diverse dataset of security incidents.
    `,
  },
  {
    title: 'Cloud Security Posture Manager',
    slug: 'cloud-security-posture-manager',
    description: 'A dashboard that scans AWS environments for misconfigurations and compliance violations.',
    techStack: ['Next.js', 'Node.js', 'AWS SDK'],
    securityFocus: 'IAM Role Analysis, Security Group Auditing.',
    demoUrl: '#',
    imageId: 'project-4',
     caseStudy: `
### Problem
Maintaining a secure and compliant AWS environment is complex. Misconfigurations in IAM, S3 buckets, or security groups are common and can lead to serious security breaches.

### Solution
I built a Cloud Security Posture Management (CSPM) tool that automates the process of auditing an AWS account. The tool connects to the AWS API, scans for common security issues, and presents the findings in an easy-to-understand dashboard.

### Key Scanning Modules
- **IAM Role Analysis:** Detects overly permissive IAM roles and suggests applying the principle of least privilege.
- **S3 Bucket Security:** Checks for publicly accessible S3 buckets.
- **Security Group Auditing:** Identifies security groups with inbound rules open to the world (0.0.0.0/0).

\`\`\`javascript
// Example: Using AWS SDK to check security groups
const { EC2Client, DescribeSecurityGroupsCommand } = require("@aws-sdk/client-ec2");
const client = new EC2Client({ region: "us-east-1" });

async function findOpenSecurityGroups() {
  const command = new DescribeSecurityGroupsCommand({});
  const response = await client.send(command);
  // ... logic to parse response for open ports
}
\`\`\`

The dashboard, built with Next.js, provides a prioritized list of findings and remediation guidance, helping teams to quickly improve their cloud security posture.
    `,
  },
  {
    title: 'Encrypted File Sharing Service',
    slug: 'encrypted-file-sharing-service',
    description: 'A web app for securely sharing files with end-to-end encryption using modern web cryptography.',
    techStack: ['React', 'Node.js', 'Web Crypto API'],
    securityFocus: 'End-to-End Encryption (E2EE), Secure File Deletion.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-5',
     caseStudy: `
### Problem
Most file-sharing services require you to trust the provider not to access your files. This project explores a "zero-trust" approach where files are encrypted in the browser before being uploaded.

### Solution
This application uses the Web Crypto API, available in all modern browsers, to perform end-to-end encryption.
1. A user selects a file to upload.
2. A strong encryption key is generated in the browser.
3. The file is encrypted locally.
4. The encrypted file is uploaded to the server. The server never sees the unencrypted data or the key.
5. A unique link containing the encryption key in the URL fragment (#) is generated. The fragment is never sent to the server.
6. When another user opens the link, the browser fetches the encrypted data and uses the key from the fragment to decrypt it locally.

\`\`\`javascript
// Simplified example of in-browser encryption
async function encryptFile(file, password) {
  const fileBuffer = await file.arrayBuffer();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const cryptoKey = await getKeyFromPassword(password); // Derived from a user password
  
  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    cryptoKey,
    fileBuffer
  );

  return { encryptedContent, iv };
}
\`\`\`

This ensures that only the sender and the intended recipient can view the files, providing true privacy.
    `,
  },
  {
    title: 'DevSecOps Pipeline Orchestrator',
    slug: 'devsecops-pipeline-orchestrator',
    description: 'A tool to automate security checks (SAST, DAST, Container Scanning) in CI/CD pipelines.',
    techStack: ['Python', 'Docker', 'Jenkins API'],
    securityFocus: 'Automated SAST/DAST, Vulnerability Management.',
    imageId: 'project-6',
     caseStudy: `
### Problem
Manually running security scans is slow and inconsistent. Integrating security into the DevOps pipeline ("shifting left") is crucial for catching vulnerabilities early.

### Solution
I created a tool that orchestrates multiple security scanners within a CI/CD pipeline. It's triggered after a new build is created and performs a series of automated checks.

\`\`\`yaml
# Example CI/CD pipeline stage
- name: Run DevSecOps Scan
  script: |
    python orchestrator.py --image $CI_REGISTRY_IMAGE:$CI_COMMIT_TAG
\`\`\`

The orchestrator, written in Python, performs the following steps:
1.  **Static Application Security Testing (SAST):** Scans the source code for vulnerabilities.
2.  **Container Scanning:** Uses Trivy to scan the newly built Docker image for known CVEs.
3.  **Dynamic Application Security Testing (DAST):** Deploys the application to a temporary environment and runs OWASP ZAP to find runtime vulnerabilities.

Findings are aggregated and can fail the build if critical vulnerabilities are detected, preventing insecure code from reaching production.
    `,
  },
  {
    title: 'AI-Powered Phishing Detector',
    slug: 'ai-powered-phishing-detector',
    description: 'A browser extension that uses a fine-tuned LLM to analyze emails for phishing indicators.',
    techStack: ['JavaScript', 'TensorFlow.js', 'Genkit'],
    securityFocus: 'Natural Language Processing, Real-time Threat Detection.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-7',
     caseStudy: `
### Problem
Traditional phishing filters rely on blocklists and simple heuristics, which sophisticated attackers can easily bypass.

### Solution
This project is a browser extension that analyzes the content of an email in real-time to detect subtle signs of phishing. It uses a compact, fine-tuned LLM (running locally with TensorFlow.js or via an API with Genkit) to evaluate factors like:
- **Urgency and Tone:** Is the language trying to create panic?
- **Sender Inconsistencies:** Does the "From" address match the email signature?
- **Suspicious Links:** Do the link texts match their actual destinations?

\`\`\`javascript
// Conceptual code for the extension
async function analyzeEmailForPhishing(emailBody) {
  const prompt = \`Is this email a phishing attempt? Analyze it and return JSON with a score and reasoning. Email: \\\`\\\`\\\`\$\{emailBody}\\\`\\\`\\\`\`;
  const { output } = await ai.generate(prompt);
  return JSON.parse(output.text);
}
\`\`\`

If an email is flagged as suspicious, the extension displays a prominent warning banner at the top of the message, alerting the user before they can click on any malicious links.
    `,
  },
  {
    title: 'Multi-Tenant SaaS Boilerplate',
    slug: 'multi-tenant-saas-boilerplate',
    description: 'A secure starter kit for building multi-tenant SaaS applications with Laravel and Next.js.',
    techStack: ['Laravel', 'Next.js', 'PostgreSQL'],
    securityFocus: 'Tenant Data Isolation, Row-Level Security.',
    githubUrl: 'https://github.com/naman-mahi',
    demoUrl: '#',
    imageId: 'project-8',
     caseStudy: `
### Problem
Building a multi-tenant SaaS application requires a solid foundation for isolating tenant data to prevent one customer from accessing another's information.

### Solution
I developed a boilerplate project that provides a secure starting point for multi-tenant applications. It uses a single database with a shared schema, but enforces data isolation at multiple levels.

- **Application Level:** A global scope in Laravel automatically adds a \`tenant_id\` condition to all database queries.
- **Database Level:** For PostgreSQL, it includes scripts to set up Row-Level Security (RLS) policies. This provides a hard security boundary directly in the database.

\`\`\`sql
-- Example PostgreSQL RLS Policy
CREATE POLICY tenant_isolation_policy ON invoices
FOR ALL
TO public
USING (tenant_id = current_setting('app.tenant_id'));
\`\`\`

This layered approach ensures that even if there's a bug in the application code, the database itself will prevent data leakage between tenants.
    `,
  },
  {
    title: 'Smart Home IoT Security Hub',
    slug: 'smart-home-iot-security-hub',
    description: 'A central dashboard to monitor network traffic from IoT devices and flag anomalous behavior.',
    techStack: ['Node.js', 'React', 'MQTT'],
    securityFocus: 'Network Anomaly Detection, Device Authentication.',
    imageId: 'project-9',
     caseStudy: `
### Problem
The proliferation of insecure IoT devices in smart homes creates a significant attack surface. Users have little visibility into what these devices are doing on their network.

### Solution
This project is a security hub that monitors local network traffic from IoT devices.
1.  It uses an MQTT broker to subscribe to messages from various smart devices.
2.  A Node.js backend analyzes this traffic, creating a baseline of normal activity.
3.  It flags anomalies, such as a smart lightbulb suddenly trying to connect to an unknown server in another country.
4.  A React-based dashboard visualizes the network activity and displays alerts.

### Security Features
- **Behavioral Anomaly Detection:** Identifies deviations from established device communication patterns.
- **Device Authentication:** Ensures that only authorized devices can connect to the MQTT broker.
- **Alerting:** Notifies the user of suspicious activity in real-time.
    `,
  },
  {
    title: 'Decentralized Bug Bounty Platform',
    slug: 'decentralized-bug-bounty-platform',
    description: 'A proof-of-concept platform using blockchain to facilitate transparent and secure bug bounty programs.',
    techStack: ['Solidity', 'Next.js', 'Ethers.js'],
    securityFocus: 'Smart Contract Security, Decentralized Identity.',
    githubUrl: 'https://github.com/naman-mahi',
    imageId: 'project-10',
     caseStudy: `
### Problem
Traditional bug bounty programs are centralized, which can lead to disputes over payouts and a lack of transparency.

### Solution
This project is a proof-of-concept for a bug bounty platform built on the Ethereum blockchain.
- **Smart Contracts:** A Solidity smart contract defines the rules of a bounty program, including the scope, rewards, and disclosure policy. Funds for the bounties are locked in the contract.
- **Transparent Submissions:** When a security researcher submits a vulnerability, a hash of the report is stored on the blockchain, creating an immutable timestamp.
- **Automated Payouts:** If the company confirms the vulnerability, they can trigger a function in the smart contract to automatically release the reward to the researcher's wallet.

\`\`\`solidity
// Simplified Solidity smart contract function
function awardBounty(address researcher, uint256 amount, string memory vulnerabilityId) public onlyCompanyOwner {
    require(bounties[vulnerabilityId].claimed == false, "Bounty already claimed.");
    payable(researcher).transfer(amount);
    bounties[vulnerabilityId].claimed = true;
}
\`\`\`

This approach increases trust and transparency for both companies and security researchers. The biggest challenge is ensuring the smart contract itself is free of vulnerabilities.
    `,
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
