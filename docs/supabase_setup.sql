-- Supabase Setup Script for DevSec Portfolio
-- This script creates all necessary tables and inserts the initial data.
-- Run this entire script in your Supabase SQL Editor.

-- 1. Create 'skills' table
CREATE TABLE IF NOT EXISTS skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

-- 2. Create 'projects' table
CREATE TABLE IF NOT EXISTS projects (
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

-- 3. Create 'experience' table
CREATE TABLE IF NOT EXISTS experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

-- 4. Create 'education' table
CREATE TABLE IF NOT EXISTS education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    degree TEXT NOT NULL,
    institution TEXT,
    status TEXT,
    icon TEXT
);

-- 5. Create 'certifications' table
CREATE TABLE IF NOT EXISTS certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name TEXT NOT NULL,
    issuer TEXT,
    icon TEXT
);

-- 6. Create 'services' table
CREATE TABLE IF NOT EXISTS services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);


-- =================================================================
--                   INSERT DATA
-- =================================================================

-- IMPORTANT: It's best practice to run these inserts only once.
-- If you need to re-run, you should clear the tables first.

-- Insert data for 'skills'
INSERT INTO skills (category, description, skills, "order") VALUES
('Backend Development', 'Building robust server-side logic, APIs, and database integrations.', '[{"name": "PHP", "icon": "Code"}, {"name": "Laravel", "icon": "Code"}, {"name": "CodeIgniter", "icon": "Code"}, {"name": "Node.js", "icon": "Code"}, {"name": "Express.js", "icon": "Code"}, {"name": "Python", "icon": "Code"}]', 1),
('Frontend Development', 'Creating responsive and interactive user interfaces with modern JavaScript frameworks.', '[{"name": "Next.js", "icon": "Code"}, {"name": "JavaScript", "icon": "Code"}, {"name": "React", "icon": "Code"}, {"name": "TypeScript", "icon": "Code"}, {"name": "Tailwind CSS", "icon": "Code"}, {"name": "Framer Motion", "icon": "Code"}]', 2),
('Databases', 'Designing and managing both relational and NoSQL databases for optimal performance and security.', '[{"name": "MySQL", "icon": "Database"}, {"name": "MongoDB", "icon": "Database"}, {"name": "PostgreSQL", "icon": "Database"}, {"name": "Supabase", "icon": "Database"}]', 3),
('Cloud & DevOps', 'Deploying and managing applications in cloud environments with a focus on automation and security.', '[{"name": "AWS", "icon": "Cloud"}, {"name": "Docker", "icon": "Container"}, {"name": "Git", "icon": "GitBranch"}, {"name": "Nginx", "icon": "Server"}, {"name": "Linux", "icon": "Terminal"}]', 4),
('Cybersecurity', 'Applying a deep understanding of security principles to protect applications and infrastructure.', '[{"name": "Penetration Testing", "icon": "Shield"}, {"name": "Vulnerability Scanning", "icon": "SearchCheck"}, {"name": "OWASP Practices", "icon": "ShieldCheck"}, {"name": "Network Security", "icon": "Globe"}, {"name": "SOC", "icon": "Users"}, {"name": "Risk Assessment", "icon": "GanttChartSquare"}]', 5),
('AI Integration', 'Leveraging artificial intelligence and large language models to build intelligent features and tools.', '[{"name": "Genkit (Google AI)", "icon": "BrainCircuit"}, {"name": "LLM Integration", "icon": "Bot"}, {"name": "Chatbot Development", "icon": "Bot"}, {"name": "Prompt Engineering", "icon": "Terminal"}]', 6);

-- Insert data for 'projects'
INSERT INTO projects ("order", title, slug, description, tech_stack, security_focus, github_url, demo_url, image_id, case_study) VALUES
(1, 'Proffid - Secure SaaS Identity Layer', 'proffid-secure-saas-identity', 'A secure, plug-and-play user authentication and identity management layer designed for modern SaaS applications. It simplifies adding features like role-based access, JWT session management, and social logins.', '{"Laravel", "MongoDB", "JWT", "OAuth 2.0"}', 'Role-Based Access Control (RBAC), JWT session hardening, secure password policies, and brute-force protection.', '#', '#', 'project-1', E'## Case Study: Building a Reusable and Secure Identity Layer\n\n### The Problem\nMany SaaS applications rebuild authentication and authorization from scratch, leading to inconsistencies and potential security vulnerabilities. The goal was to create a standalone, robust service that any application could use for identity management, saving development time and enforcing security best practices.\n\n### The Solution\nI built Proffid using Laravel for the backend API and MongoDB for its flexible data structure, which is ideal for storing varied user profiles and roles. The core of the system is built around JSON Web Tokens (JWT) for stateless, secure session management.\n\nKey features implemented:\n\n* **Stateless Authentication with JWT**: Every login request returns a signed JWT containing the user ID, role, and expiration. This token must be sent with every subsequent request to access protected resources.\n* **Role-Based Access Control (RBAC)**: The system defines roles (e.g., admin, editor, viewer) with specific permissions. Middleware on the API server checks the role from the JWT payload against the required permissions for each endpoint, denying access if the user is not authorized.\n* **Session Hardening**: Implemented refresh tokens to allow for short-lived access tokens, reducing the window of opportunity if a token is compromised. Secure, HTTP-only cookies were used to store refresh tokens, protecting them from XSS attacks.\n* **Secure Registration**: Enforced strong password policies and included email verification to prevent spam and ensure user authenticity.\n\n### Challenges & Learnings\nOne of the main challenges was ensuring the system was both secure and easy to integrate. I created detailed API documentation and provided simple client-side examples. This project deepened my understanding of OAuth 2.0 flows and the critical importance of stateless architecture in modern microservices.'),
(2, 'AI-Powered SOC Assistant', 'ai-soc-assistant', 'A prototype of a conversational AI (chatbot) designed to assist Security Operations Center (SOC) analysts. It can parse security logs, summarize alerts, and suggest initial mitigation steps.', '{"Python", "Next.js", "LangChain", "Genkit"}', 'Securing the Large Language Model (LLM) from prompt injection attacks and ensuring data sanitization.', '#', NULL, 'project-2', E'## Case Study: Automating Alert Triage with an AI Assistant\n\n### The Problem\nSOC analysts are often overwhelmed by a high volume of alerts, many of which are false positives. This alert fatigue can lead to missed critical threats. The goal was to build a tool that could perform an initial, automated analysis of alerts to help analysts prioritize their work.\n\n### The Solution\nI developed a proof-of-concept AI assistant using Google\'s Genkit framework for the backend and Next.js for the user interface. The chatbot was designed to be a "first responder" for security alerts.\n\nHere’s how it works:\n\n1.  **Log Ingestion**: The system takes a security log entry (e.g., from a firewall or intrusion detection system) as input.\n2.  **AI Analysis**: The Genkit flow sends the log data to a Large Language Model (LLM) with a carefully crafted prompt. The prompt instructs the model to act as a junior SOC analyst, identify key information (IP addresses, timestamps, attack type), assess the severity, and check for known patterns.\n3.  **Structured Output**: The LLM returns a structured JSON object containing its analysis, a summary in plain English, and a suggested action (e.g., "Block IP," "Investigate further," "Likely false positive").\n4.  **Security Measures**: A key focus was securing the LLM itself. I implemented input sanitization to strip potentially malicious characters from the logs before sending them to the model. I also used instructional defense in the prompt, telling the model to ignore any instructions hidden within the user input to prevent prompt injection.\n\n### Challenges & Learnings\nThe biggest challenge was "prompt engineering" – creating a prompt that consistently produced accurate and safe analysis. It required many iterations to balance the model\'s analytical capabilities with strict security boundaries. This project was a fantastic exploration of the practical application of LLMs in cybersecurity and highlighted the new attack surfaces that AI introduces.');

-- Insert data for 'experience'
INSERT INTO experience ("order", role, company, period, responsibilities) VALUES
(1, 'Technical Lead', 'Confidential', '2025–Present', '{"Leading a full-stack team in building secure, scalable web platforms.", "Integrating AI-based tools for security automation and enhanced functionality.", "Enforcing secure coding practices (OWASP) through code reviews and training.", "Architecting and maintaining CI/CD pipelines with integrated security scanning."}'),
(2, 'Freelance Full-Stack Developer', 'Self-Employed', '2020–Present', '{"Delivered over 20 custom web platforms for clients in e-commerce, education, and SaaS.", "Integrated secure payment gateways like Stripe and Razorpay.", "Applied OWASP best practices to mitigate common vulnerabilities like XSS, CSRF, and SQL Injection.", "Managed client communication, project scoping, and delivery from end to end."}'),
(3, 'Full-Stack Developer', 'IBM', '2021–2022', '{"Developed and maintained secure MERN stack applications with a focus on Angular CLI.", "Collaborated on system programming tasks involving mainframe modules.", "Participated in agile development cycles, including sprint planning and retrospectives."}');

-- Insert data for 'education'
INSERT INTO education (degree, institution, status, icon) VALUES
('Master’s in Information Security', 'Indira Gandhi National Open University', '2025 - 2025', 'GraduationCap'),
('PG Diploma in Information Security', 'Indira Gandhi National Open University', '2023 - 2024', 'Award'),
('Bachelor of Commerce', 'Yashwantrao Chavan Maharashtra Open University', '2019 - 2022', 'GraduationCap'),
('Diploma in IT', 'National Skill Training Institute Hyderabad', '2019 - 2022', 'Award');

-- Insert data for 'certifications'
INSERT INTO certifications (name, issuer, icon) VALUES
('Introduction to Cybersecurity', 'Cisco', 'ShieldCheck'),
('IBM z/OS Mainframe Practitioner', 'IBM', 'CloudCog'),
('Introduction to Packet Tracer', 'Cisco', 'Cpu'),
('Cybersecurity Fundamentals', 'IBM', 'Star');

-- Insert data for 'services'
INSERT INTO services (title, description, icon) VALUES
('Secure Web Development', 'Building robust, scalable, and secure web applications from the ground up using modern frameworks like Next.js and Laravel.', 'Shield'),
('Cybersecurity Audits', 'Comprehensive security assessments, including penetration testing and vulnerability scanning, to identify and mitigate risks.', 'SearchCheck'),
('AI/Chatbot Prototyping', 'Developing intelligent chatbots and AI-powered tools to automate tasks and enhance security operations.', 'Bot'),
('SOC Architecture Consulting', 'Designing and implementing effective Security Operations Center (SOC) architectures for proactive threat monitoring and response.', 'GanttChartSquare');
