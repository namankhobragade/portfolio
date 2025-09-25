
-- Drop tables if they exist to start fresh
DROP TABLE IF EXISTS skills, projects, experience, education, certifications, services;

-- Create Skills Table
CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

-- Create Projects Table
CREATE TABLE projects (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  tech_stack TEXT[],
  security_focus TEXT,
  github_url TEXT,
  demo_url TEXT,
  image_id TEXT,
  case_study TEXT
);

-- Create Experience Table
CREATE TABLE experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

-- Create Education Table
CREATE TABLE education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    status TEXT,
    icon TEXT
);

-- Create Certifications Table
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    name TEXT NOT NULL,
    issuer TEXT,
    icon TEXT
);

-- Create Services Table
CREATE TABLE services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

-- Insert Data for Skills
INSERT INTO skills (category, description, skills, "order")
VALUES 
(
  'Full-Stack Development', 
  'Expertise in both frontend and backend technologies to build complete, scalable applications.',
  '[
    {"name": "Laravel", "icon": "Code"},
    {"name": "CodeIgniter", "icon": "Code"},
    {"name": "Next.js", "icon": "Code"},
    {"name": "MongoDB", "icon": "Database"},
    {"name": "MySQLi", "icon": "Database"},
    {"name": "REST APIs", "icon": "Server"}
  ]',
  1
),
(
  'Cybersecurity', 
  'Specialized in securing applications and infrastructures against modern threats.',
  '[
    {"name": "CEH v13 AI Certified", "icon": "ShieldCheck"},
    {"name": "OWASP Practices", "icon": "Shield"},
    {"name": "Penetration Testing", "icon": "Terminal"},
    {"name": "Vulnerability Scanning", "icon": "SearchCheck"},
    {"name": "Network Security", "icon": "Globe"},
    {"name": "SOC & Risk Assessment", "icon": "GanttChartSquare"}
  ]',
  2
),
(
  'AI & Innovation', 
  'Leveraging artificial intelligence to create smarter, more efficient solutions.',
  '[
    {"name": "LLM Integration", "icon": "BrainCircuit"},
    {"name": "Genkit", "icon": "Bot"},
    {"name": "Chatbot Development", "icon": "Bot"},
    {"name": "Secure AI Development", "icon": "ShieldCheck"}
  ]',
  3
),
(
  'Tools & Platforms',
  'Proficient with a wide range of industry-standard development and security tools.',
  '[
    {"name": "Git & GitHub", "icon": "GitBranch"},
    {"name": "Linux", "icon": "Terminal"},
    {"name": "Docker", "icon": "Container"},
    {"name": "Nginx", "icon": "Server"},
    {"name": "Burp Suite", "icon": "SearchCheck"},
    {"name": "Wireshark", "icon": "Network"}
  ]',
  4
);


-- Insert Data for Projects
INSERT INTO projects ("order", title, slug, description, tech_stack, security_focus, github_url, demo_url, image_id, case_study) VALUES
(1, 'Proffid - Secure Identity Platform', 'proffid-secure-identity', 'A secure, plug-and-play user authentication and identity management layer designed for SaaS applications, offering robust security features out-of-the-box.', '{"Laravel", "MongoDB", "JWT", "OAuth 2.0"}', 'Role-Based Access Control (RBAC), JWT session hardening, secure password policies, and rate limiting.', '#', '#', 'project-1', 'The Proffid platform was developed to solve the recurring challenge of building secure authentication systems for new projects. The case study involved designing a microservice architecture where the identity service is completely decoupled from the main application. Key security measures included implementing multi-factor authentication (MFA) flows, creating a granular permissions system using JWT custom claims, and ensuring all data at rest and in transit is encrypted. The platform successfully reduced development time for new applications by 40% while significantly improving their security posture.'),
(2, 'Comprehensive E-Learning Platform', 'e-learning-platform', 'A full-stack e-learning platform for a client, featuring live video classes, integrated payment gateways, and separate, secure dashboards for students and teachers.', '{"CodeIgniter 4", "MySQLi", "BigBlueButton API", "Stripe"}', 'CSRF protection on all forms, strict access control lists (ACLs), and payment tokenization.', '#', NULL, 'project-2', 'This project involved building a multi-tenant e-learning system from scratch. The primary challenge was securely handling user data and payment information. We implemented a robust security model that included input validation to prevent XSS, parameterized queries to prevent SQL injection, and CSRF tokens on all state-changing requests. The integration with BigBlueButton for live classes required secure API key management and webhook validation to ensure the integrity of session data.'),
(3, 'AI-Powered SOC Assistant', 'ai-soc-assistant', 'A prototype chatbot designed for Security Operations Centers (SOCs) to automate the initial triage of security alerts using Large Language Models (LLMs).', '{"Next.js", "Genkit", "Python", "Docker"}', 'Preventing prompt injection, securing API endpoints, and ensuring data sanitization.', '#', '#', 'project-3', 'This is an ongoing research project focused on leveraging AI for security automation. The goal is to build an LLM-based agent that can parse security alerts from various sources (like SIEMs), enrich them with threat intelligence, and suggest initial mitigation steps. The core security focus is on defending the LLM from prompt injection attacks by implementing input validation, output encoding, and instructional defense mechanisms. The system is containerized with Docker for easy deployment and scalability.');

-- Insert Data for Experience
INSERT INTO experience ("order", role, company, period, responsibilities) VALUES
(1, 'Technical Lead', 'Confidential', '2025 – Present', '{"Leading a full-stack team in building secure, scalable web platforms.", "Integrating AI-based tools for security automation and enhanced functionality.", "Enforcing secure coding practices (OWASP Top 10) through code reviews and training.", "Architecting microservices and managing cloud infrastructure."}'),
(2, 'Freelance Full-Stack Developer', 'Self-Employed', '2020 – Present', '{"Delivered over 20 custom web platforms for clients in e-commerce, education, and SaaS.", "Integrated secure payment systems using Stripe and Razorpay, ensuring PCI-DSS compliance.", "Applied deep knowledge of OWASP standards to mitigate common vulnerabilities like XSS, CSRF, and SQLi.", "Managed client communication, project scoping, and timely delivery."}'),
(3, 'Full-Stack Developer', 'IBM', '2021 – 2022', '{"Developed and maintained secure MERN stack applications using Angular CLI for the frontend.", "Collaborated on system programming with mainframe modules, focusing on secure data exchange.", "Contributed to the development of internal tools and dashboards."}');

-- Insert Data for Education
INSERT INTO education ("order", degree, institution, status, icon) VALUES
(1, 'Master’s in Information Security', 'Indira Gandhi National Open University', '2025 - 2025', 'GraduationCap'),
(2, 'PG Diploma in Information Security', 'Indira Gandhi National Open University', '2023 - 2024', 'Award'),
(3, 'Bachelor of Commerce', 'Yashwantrao Chavan Maharashtra Open University', '2019 - 2022', 'GraduationCap'),
(4, 'Diploma in IT', 'National Skill Training Institute Hyderabad', '2019 - 2022', 'Award');

-- Insert Data for Certifications
INSERT INTO certifications ("order", name, issuer, icon) VALUES
(1, 'Introduction to Cybersecurity', 'Cisco', 'ShieldCheck'),
(2, 'IBM z/OS Mainframe Practitioner', 'IBM', 'CloudCog'),
(3, 'Introduction to Packet Tracer', 'Cisco', 'Cpu'),
(4, 'Cybersecurity Fundamentals', 'IBM', 'Star');

-- Insert Data for Services
INSERT INTO services ("order", title, description, icon) VALUES
(1, 'Secure Web Development', 'Building robust, scalable, and secure web applications from the ground up using modern frameworks like Next.js and Laravel.', 'Shield'),
(2, 'Cybersecurity Audits', 'Comprehensive security assessments, including penetration testing and vulnerability scanning, to identify and mitigate risks.', 'SearchCheck'),
(3, 'AI/Chatbot Prototyping', 'Developing intelligent chatbots and AI-powered tools to automate tasks and enhance security operations.', 'Bot'),
(4, 'SOC Architecture Consulting', 'Designing and implementing effective Security Operations Center (SOC) architectures for proactive threat monitoring and response.', 'GanttChartSquare');
