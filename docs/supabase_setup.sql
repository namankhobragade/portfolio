
-- Supabase Setup SQL
-- This script creates and populates all necessary tables for the DevSec portfolio.

-- Drop tables in reverse order of dependency if they exist, to ensure a clean slate.
DROP TABLE IF EXISTS "services";
DROP TABLE IF EXISTS "certifications";
DROP TABLE IF EXISTS "education";
DROP TABLE IF EXISTS "experience";
DROP TABLE IF EXISTS "projects";
DROP TABLE IF EXISTS "skills";


-- =================================================================
-- Skills Table
-- Stores categorized technical skills.
-- =================================================================
CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

-- Insert data for Skills
INSERT INTO skills ("order", category, description, skills)
VALUES 
(
  1, 
  'Backend Development', 
  'Building robust server-side logic, APIs, and database integrations.',
  '[{"name": "PHP", "icon": "Code"}, {"name": "Laravel", "icon": "Code"}, {"name": "CodeIgniter", "icon": "Code"}, {"name": "Node.js", "icon": "Code"}, {"name": "Express.js", "icon": "Code"}, {"name": "Python", "icon": "Code"}]'
),
(
  2,
  'Frontend Development',
  'Creating responsive and dynamic user interfaces with modern frameworks.',
  '[{"name": "JavaScript", "icon": "Code"}, {"name": "HTML & CSS", "icon": "Code"}, {"name": "Bootstrap", "icon": "Code"}, {"name": "Next.js", "icon": "Code"}, {"name": "React", "icon": "Code"}]'
),
(
  3,
  'Databases & Storage',
  'Managing and optimizing relational and NoSQL databases for performance.',
  '[{"name": "MySQL", "icon": "Database"}, {"name": "MongoDB", "icon": "Database"}, {"name": "Redis", "icon": "Database"}]'
),
(
  4,
  'Cloud & DevOps',
  'Deploying and managing applications on cloud platforms with a focus on automation.',
  '[{"name": "AWS", "icon": "Cloud"}, {"name": "IBM Cloud", "icon": "CloudCog"}, {"name": "Cloudflare", "icon": "Cloud"}, {"name": "Docker", "icon": "Container"}, {"name": "Linux", "icon": "Terminal"}]'
),
(
  5,
  'Version Control',
  'Utilizing Git for collaborative development and CI/CD for automated workflows.',
  '[{"name": "Git & GitHub", "icon": "GitBranch"}, {"name": "GitLab", "icon": "GitBranch"}, {"name": "GitHub Actions", "icon": "GitCommit"}, {"name": "GitLab CI", "icon": "GitCommit"}]'
),
(
  6,
  'Cybersecurity',
  'Applying security best practices, from penetration testing to threat modeling.',
  '[{"name": "Penetration Testing", "icon": "ShieldCheck"}, {"name": "Network Security", "icon": "Shield"}, {"name": "SOC & Risk Assessment", "icon": "Cpu"}, {"name": "OWASP Practices", "icon": "ShieldCheck"}]'
);


-- =================================================================
-- Projects Table
-- Stores portfolio projects with detailed information.
-- =================================================================
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

-- Insert data for Projects
INSERT INTO projects ("order", title, slug, description, tech_stack, security_focus, github_url, demo_url, image_id, case_study)
VALUES
(
  1,
  'Proffid - Secure SaaS Identity Layer',
  'proffid-saas-identity',
  'A secure, plug-and-play user authentication and identity management layer designed for modern SaaS applications. It simplifies adding complex security features like RBAC and JWT handling.',
  '{"Laravel", "MongoDB", "JWT", "OAuth 2.0"}',
  'Role-Based Access Control (RBAC), JWT session hardening, secure password policies, and rate limiting.',
  'https://github.com/naman-mahi/devsec',
  '#',
  'project-1',
  'The Proffid project was born out of a need for a reusable and secure authentication system for various client projects. Instead of rebuilding the wheel each time, I developed a modular identity layer that can be integrated into any SaaS platform. The core challenge was designing a flexible Role-Based Access Control (RBAC) system that could adapt to different business needs. Using Laravel''s robust ecosystem and MongoDB''s flexible schema, I created a system where permissions are granular and easily managed through an admin interface. Security was paramount: all API endpoints are protected with JSON Web Tokens (JWTs) with short-lived access tokens and refresh token rotation to mitigate token hijacking. The case study involved penetration testing against common attack vectors like credential stuffing and session fixation, resulting in a hardened and reliable identity solution.'
),
(
  2,
  'AI-Powered SOC Assistant',
  'ai-soc-assistant',
  'A prototype chatbot that uses Large Language Models (LLMs) to automate the initial triage of security alerts from a Security Operations Center (SOC), providing instant analysis and mitigation suggestions.',
  '{"Python", "Next.js", "Genkit", "LangChain", "Docker"}',
  'Prompt injection defense, secure API design for the model, and sandboxing model execution.',
  'https://github.com/naman-mahi/devsec',
  '#',
  'project-2',
  'As part of my research into AI in cybersecurity, I developed this SOC Assistant to explore the potential of LLMs in automating security workflows. The system ingests security alerts from sources like SIEMs or firewalls. The core of the project is a Genkit flow that analyzes the alert data. The model is trained on a corpus of security incident reports and mitigation techniques. The main technical challenge was preventing prompt injection, where a malicious actor could craft an alert that tricks the LLM into executing unintended commands. I implemented a multi-layered defense, including strict input sanitization, instructional defense in the prompt, and using a separate, non-internet-connected model for final validation. The frontend, built with Next.js, provides a real-time interface for security analysts to interact with the AI, review its findings, and approve actions.'
),
(
  3,
  'Secure E-Learning Platform',
  'secure-elearning-platform',
  'A full-stack e-learning platform for a client, featuring live video classes, integrated payment processing with Stripe, and secure dashboards for students and teachers.',
  '{"CodeIgniter 4", "MySQL", "BigBlueButton", "Stripe API", "JavaScript"}',
  'CSRF protection on all forms, strict access control between user roles, and secure payment tokenization.',
  'https://github.com/naman-mahi/devsec',
  '#',
  'project-3',
  'A client required a comprehensive e-learning platform that was both feature-rich and secure. Built on CodeIgniter 4, the platform integrates with BigBlueButton for live video conferencing. One of the key security challenges was ensuring that students could not access teacher-only resources or other students'' data. I implemented a strict access control list (ACL) at the middleware level, verifying user roles on every request. All forms are protected against Cross-Site Request Forgery (CSRF) using token-based validation. For payments, I integrated the Stripe API using their recommended tokenization method (Stripe.js), ensuring that sensitive credit card information never touches the server, which significantly reduces PCI compliance scope.'
);


-- =================================================================
-- Experience Table
-- Stores professional work experience.
-- =================================================================
CREATE TABLE experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

-- Insert data for Experience
INSERT INTO experience ("order", role, company, period, responsibilities)
VALUES
(
  1,
  'Technical Lead',
  'Confidential',
  '2025 – Present',
  '{"Leading a full-stack development team in building secure and scalable web platforms.", "Integrating AI-based tools for security automation and log analysis.", "Enforcing secure coding practices (OWASP) and conducting regular code audits."}'
),
(
  2,
  'Freelance Full-Stack Developer',
  'Self-Employed',
  '2020 – Present',
  '{"Delivered over 20 custom web platforms for clients in e-commerce, education, and SaaS.", "Integrated secure payment gateways like Stripe and Razorpay.", "Applied OWASP best practices to mitigate common vulnerabilities like XSS, CSRF, and SQL injection."}'
),
(
  3,
  'Full-Stack Developer',
  'IBM',
  '2021 – 2022',
  '{"Developed and maintained secure MERN stack applications using Angular CLI.", "Collaborated on system programming tasks involving mainframe modules and databases.", "Participated in agile development cycles and peer code reviews to ensure quality and security."}'
);


-- =================================================================
-- Education Table
-- Stores academic and educational background.
-- =================================================================
CREATE TABLE education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    status TEXT,
    icon TEXT
);

-- Insert data for Education
INSERT INTO education ("order", degree, institution, status, icon)
VALUES
(
  1,
  'Master’s in Information Security',
  'IGNOU',
  'Ongoing',
  'GraduationCap'
),
(
  2,
  'Postgraduate Diploma in Information Security',
  'IGNOU',
  'Completed',
  'BookOpen'
);


-- =================================================================
-- Certifications Table
-- Stores professional certifications.
-- =================================================================
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    name TEXT NOT NULL,
    issuer TEXT NOT NULL,
    icon TEXT
);

-- Insert data for Certifications
INSERT INTO certifications ("order", name, issuer, icon)
VALUES
(1, 'Certified Ethical Hacker (CEH) v13 AI', 'EC-Council', 'ShieldCheck'),
(2, 'Cybersecurity Tools & Cyber Attacks', 'IBM', 'Shield'),
(3, 'Penetration Testing & Security Analysis', 'IBM', 'SearchCheck'),
(4, 'Networking in Google Cloud', 'Google / Coursera', 'CloudCog');


-- =================================================================
-- Services Table
-- Stores freelance services offered.
-- =================================================================
CREATE TABLE services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

-- Insert data for Services
INSERT INTO services ("order", title, description, icon)
VALUES
(
  1,
  'Secure Web Development',
  'Building robust and scalable web applications with a security-first mindset, from initial architecture to deployment.',
  'Code'
),
(
  2,
  'Cybersecurity Audits',
  'Conducting comprehensive security assessments, including penetration testing and vulnerability scanning, to identify and mitigate risks.',
  'ShieldCheck'
),
(
  3,
  'AI & Chatbot Integration',
  'Developing and integrating intelligent chatbots and AI-powered features to automate tasks and enhance user engagement.',
  'Bot'
),
(
  4,
  'SOC & Cloud Security Consulting',
  'Designing and advising on Security Operations Center (SOC) architecture and cloud security best practices for AWS and GCP.',
  'CloudCog'
);
