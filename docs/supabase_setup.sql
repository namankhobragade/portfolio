-- ============================================================
-- Supabase Database Setup Script for DevSec Portfolio
-- ============================================================
-- This script creates and populates all necessary tables.
-- Run this in your Supabase SQL Editor.
--
-- Order of operations:
-- 1. Create `skills` table and insert data.
-- 2. Create `projects` table and insert data.
-- 3. Create `experience` table and insert data.
-- 4. Create `education` table and insert data.
-- 5. Create `certifications` table and insert data.
-- 6. Create `services` table and insert data.
-- 7. Create `resume_downloads` table.
-- 8. Create `contacts` table.
-- 9. Create `subscribers` table.
-- ============================================================

-- ============================================================
-- Skills Table
-- ============================================================
CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

INSERT INTO skills ("order", category, description, skills) VALUES
(1, 'Backend Development', 'Building robust server-side logic, APIs, and database integrations.', '[{"name": "PHP", "icon": "Code"}, {"name": "Laravel", "icon": "Code"}, {"name": "CodeIgniter", "icon": "Code"}, {"name": "Node.js", "icon": "Code"}, {"name": "Express.js", "icon": "Code"}, {"name": "Python", "icon": "Code"}]'),
(2, 'Frontend Development', 'Creating responsive and dynamic user interfaces with modern frameworks.', '[{"name": "JavaScript", "icon": "Code"}, {"name": "HTML & CSS", "icon": "Code"}, {"name": "Bootstrap", "icon": "Code"}, {"name": "Next.js", "icon": "Code"}, {"name": "React", "icon": "Code"}]'),
(3, 'Databases & Storage', 'Managing and optimizing relational and NoSQL databases for performance.', '[{"name": "MySQL", "icon": "Database"}, {"name": "MongoDB", "icon": "Database"}, {"name": "Redis", "icon": "Database"}]'),
(4, 'Cloud & DevOps', 'Deploying and managing applications on cloud platforms with a focus on automation.', '[{"name": "AWS", "icon": "Cloud"}, {"name": "IBM Cloud", "icon": "CloudCog"}, {"name": "Cloudflare", "icon": "Cloud"}, {"name": "Docker", "icon": "Container"}, {"name": "Linux", "icon": "Terminal"}]'),
(5, 'Version Control', 'Utilizing Git for collaborative development and CI/CD for automated workflows.', '[{"name": "Git & GitHub", "icon": "GitBranch"}, {"name": "GitLab", "icon": "GitBranch"}, {"name": "GitHub Actions", "icon": "GitCommit"}, {"name": "GitLab CI", "icon": "GitCommit"}]'),
(6, 'Cybersecurity', 'Applying security best practices, from penetration testing to threat modeling.', '[{"name": "Penetration Testing", "icon": "ShieldCheck"}, {"name": "Network Security", "icon": "Shield"}, {"name": "SOC & Risk Assessment", "icon": "Cpu"}, {"name": "OWASP Practices", "icon": "ShieldCheck"}]');

-- ============================================================
-- Projects Table
-- ============================================================
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

INSERT INTO projects ("order", title, slug, description, tech_stack, security_focus, github_url, demo_url, image_id, case_study) VALUES
(1, 'Proffid - Secure Identity Platform', 'proffid-secure-identity', 'A secure, plug-and-play user authentication and identity management layer designed for modern SaaS applications, providing role-based access control and JWT-based session management.', '{"Laravel", "MongoDB", "JWT", "OAuth 2.0"}', 'Role-Based Access Control (RBAC), JWT Hardening', 'https://github.com/naman-mahi', '#', 'project-1', 'This case study details the development of a secure identity platform focusing on modern authentication challenges. It covers the implementation of JWT, role-based permissions, and measures against common vulnerabilities like session hijacking and credential stuffing.'),
(2, 'AI-Powered SOC Assistant', 'ai-soc-assistant', 'A prototype chatbot designed to assist Security Operations Center (SOC) analysts by automating the initial triage of security alerts, parsing logs, and suggesting mitigation steps using a Large Language Model.', '{"Next.js", "Genkit", "LangChain", "Vector DB"}', 'Prompt Injection Defense, Secure AI Training', 'https://github.com/naman-mahi', '#', 'project-2', 'This project explores the intersection of AI and Cybersecurity. The case study explains the architecture of an LLM-based chatbot for SOC automation, including the challenges of securing AI models against adversarial attacks and ensuring the privacy of sensitive log data.'),
(3, 'E-Learning Platform Security Overhaul', 'elearning-security-overhaul', 'A comprehensive security enhancement for a live e-learning platform. The project involved a full code audit, implementation of secure payment processing, and hardening of student/teacher dashboards.', '{"CodeIgniter", "MySQL", "Stripe API", "BigBlueButton"}', 'CSRF Protection, XSS Mitigation, Secure Payment Gateway', '#', '#', 'project-3', 'This case study outlines the process of securing a high-traffic e-learning application. It covers vulnerability assessment, threat modeling, and the implementation of security controls like CSRF tokens, Content Security Policy (CSP), and secure integration with third-party services like Stripe.');

-- ============================================================
-- Experience Table
-- ============================================================
CREATE TABLE experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

INSERT INTO experience ("order", role, company, period, responsibilities) VALUES
(1, 'Technical Lead', 'Confidential', '2025–Present', '{"Leading a full-stack team in building secure, scalable web platforms.", "Integrating AI-based tools for security automation and log analysis.", "Enforcing secure coding practices and conducting regular code reviews."}'),
(2, 'Freelance Developer & Security Consultant', 'Self-Employed', '2020–Present', '{"Delivered over 20 custom web platforms for clients in e-commerce, education, and SaaS.", "Implemented secure payment systems using Stripe and Razorpay.", "Applied OWASP Top 10 mitigation strategies, including XSS, CSRF, and SQLi prevention."}'),
(3, 'Full-Stack Developer', 'IBM', '2021–2022', '{"Developed and maintained secure MERN stack applications with a focus on performance.", "Collaborated on system programming tasks involving mainframe modules.", "Contributed to the development of internal tools and dashboards."}');

-- ============================================================
-- Education Table
-- ============================================================
CREATE TABLE education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    degree TEXT NOT NULL,
    institution TEXT,
    status TEXT,
    icon TEXT
);

INSERT INTO education ("order", degree, institution, status, icon) VALUES
(1, 'Master’s in Information Security', 'Indira Gandhi National Open University', 'Ongoing', 'GraduationCap'),
(2, 'Postgraduate Diploma in Information Security', 'Indira Gandhi National Open University', 'Completed', 'BookOpen');

-- ============================================================
-- Certifications Table
-- ============================================================
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    name TEXT NOT NULL,
    issuer TEXT,
    icon TEXT
);

INSERT INTO certifications ("order", name, issuer, icon) VALUES
(1, 'Certified Ethical Hacker (CEH) v13 AI', 'EC-Council', 'ShieldCheck'),
(2, 'IBM Certified Security Specialist', 'IBM', 'CloudCog'),
(3, 'Cisco Certified Network Associate (CCNA)', 'Cisco', 'Server'),
(4, 'Advanced Laravel Development', 'Udemy', 'Code');

-- ============================================================
-- Services Table
-- ============================================================
CREATE TABLE services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

INSERT INTO services ("order", title, description, icon) VALUES
(1, 'Secure Full-Stack Development', 'Creating robust, end-to-end web applications with security integrated at every stage of the development lifecycle.', 'Shield'),
(2, 'AI & LLM Integration', 'Building and integrating intelligent solutions, from chatbots to AI-powered data analysis, to solve complex business problems.', 'Bot'),
(3, 'Cybersecurity Auditing & Penetration Testing', 'Performing comprehensive security assessments, vulnerability scanning, and penetration testing to identify and mitigate risks.', 'SearchCheck'),
(4, 'Cloud & SOC Consulting', 'Advising on secure cloud architecture, DevOps pipelines, and the setup of Security Operations Centers (SOC).', 'Settings');

-- ============================================================
-- Resume Downloads Table
-- ============================================================
CREATE TABLE resume_downloads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    purpose TEXT
);

-- ============================================================
-- Contacts Table
-- ============================================================
CREATE TABLE contacts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT
);

-- ============================================================
-- Subscribers Table
-- ============================================================
CREATE TABLE subscribers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE
);
