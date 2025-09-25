
-- This script sets up the entire database schema and populates it with initial data.
-- Run this in your Supabase SQL Editor.

-- skills table
CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

-- projects table
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

-- experience table
CREATE TABLE experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

-- education table
CREATE TABLE education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    status TEXT,
    icon TEXT
);

-- certifications table
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    name TEXT NOT NULL,
    issuer TEXT,
    icon TEXT
);

-- services table
CREATE TABLE services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);


-- INSERT DATA

-- Insert skills data
INSERT INTO skills ("order", category, description, skills) VALUES
(1, 'Backend Development', 'Building robust server-side logic, APIs, and database integrations.', '[{"name": "PHP", "icon": "Code"}, {"name": "Laravel", "icon": "Code"}, {"name": "CodeIgniter", "icon": "Code"}, {"name": "Node.js", "icon": "Code"}, {"name": "Express.js", "icon": "Code"}, {"name": "Python", "icon": "Code"}]'),
(2, 'Frontend Development', 'Creating responsive and dynamic user interfaces with modern frameworks.', '[{"name": "JavaScript", "icon": "Code"}, {"name": "HTML & CSS", "icon": "Code"}, {"name": "Bootstrap", "icon": "Code"}, {"name": "Next.js", "icon": "Code"}, {"name": "React", "icon": "Code"}]'),
(3, 'Databases & Storage', 'Managing and optimizing relational and NoSQL databases for performance.', '[{"name": "MySQL", "icon": "Database"}, {"name": "MongoDB", "icon": "Database"}, {"name": "Redis", "icon": "Database"}]'),
(4, 'Cloud & DevOps', 'Deploying and managing applications on cloud platforms with a focus on automation.', '[{"name": "AWS", "icon": "Cloud"}, {"name": "IBM Cloud", "icon": "CloudCog"}, {"name": "Cloudflare", "icon": "Cloud"}, {"name": "Docker", "icon": "Container"}, {"name": "Linux", "icon": "Terminal"}]'),
(5, 'Version Control', 'Utilizing Git for collaborative development and CI/CD for automated workflows.', '[{"name": "Git & GitHub", "icon": "GitBranch"}, {"name": "GitLab", "icon": "GitBranch"}, {"name": "GitHub Actions", "icon": "GitCommit"}, {"name": "GitLab CI", "icon": "GitCommit"}]'),
(6, 'Cybersecurity', 'Applying security best practices, from penetration testing to threat modeling.', '[{"name": "Penetration Testing", "icon": "ShieldCheck"}, {"name": "Network Security", "icon": "Shield"}, {"name": "SOC & Risk Assessment", "icon": "Cpu"}, {"name": "OWASP Practices", "icon": "ShieldCheck"}]');


-- Insert projects data
INSERT INTO projects ("order", title, slug, description, tech_stack, security_focus, github_url, demo_url, image_id, case_study) VALUES
(1, 'Proffid - Secure Identity Platform', 'proffid-secure-identity', 'A secure, plug-and-play user authentication and identity management layer for SaaS applications, featuring multi-factor authentication and social logins.', '{"Laravel", "MongoDB", "JWT", "OAuth 2.0"}', 'Role-Based Access Control (RBAC), JWT session hardening, secure password policies.', '#', '#', 'project-1', 'This is a markdown case study for the Proffid project. It details the architecture, security measures, and implementation challenges.'),
(2, 'AI-Powered SOC Assistant', 'ai-soc-assistant', 'A prototype chatbot designed to assist Security Operations Center (SOC) analysts by automating alert triage, providing contextual threat intelligence, and suggesting mitigation steps.', '{"Next.js", "Python", "Genkit", "LangChain"}', 'LLM prompt injection defense, secure API design for AI services, data sanitization.', '#', NULL, 'project-2', 'Case study content for the AI-Powered SOC Assistant. Focuses on the AI integration and security considerations.'),
(3, 'CodeGuardian - Static Analysis Tool', 'codeguardian-sast', 'A custom Static Application Security Testing (SAST) tool that integrates into CI/CD pipelines to scan for common vulnerabilities in PHP and JavaScript codebases.', '{"Python", "Docker", "GitHub Actions"}', 'Vulnerability pattern matching, low false-positive detection, secure baseline reporting.', '#', NULL, 'project-3', 'Detailed case study for the CodeGuardian SAST tool, explaining its scanning engine and integration process.'),
(4, 'CloudSec Dashboard', 'cloudsec-dashboard', 'A centralized dashboard for visualizing cloud security posture, aggregating findings from AWS GuardDuty, Security Hub, and custom security scripts.', '{"Next.js", "Recharts", "AWS SDK"}', 'Secure IAM role configuration, data visualization of security events, API authentication.', '#', '#', 'project-4', 'Case study for the CloudSec Dashboard, focusing on data aggregation and visualization techniques for security metrics.');

-- Insert experience data
INSERT INTO experience ("order", role, company, period, responsibilities) VALUES
(1, 'Technical Lead', 'Confidential', '2025 – Present', '{"Leading a full-stack team building secure, scalable platforms.", "Integrating AI-based tools for security automation.", "Enforcing secure coding practices across teams."}'),
(2, 'Freelance Developer', 'Self-Employed', '2020 – Present', '{"Delivered 20+ custom web platforms across education, e-commerce, and SaaS.", "Integrated secure payment systems (Stripe, Razorpay).", "Applied OWASP practices: XSS, CSRF, SQLi mitigation."}'),
(3, 'Full-Stack Developer', 'IBM', '2021 – 2022', '{"Built secure MERN apps with Angular CLI.", "Collaborated on system programming with mainframe modules."}');

-- Insert education data
INSERT INTO education ("order", degree, institution, status, icon) VALUES
(1, 'Master’s in Information Security', 'Indira Gandhi National Open University', 'Ongoing', 'GraduationCap'),
(2, 'Postgraduate Diploma in Information Security', 'Indira Gandhi National Open University', 'Completed', 'BookOpen');

-- Insert certifications data
INSERT INTO certifications ("order", name, issuer, icon) VALUES
(1, 'Certified Ethical Hacker (CEH) v13', 'EC-Council', 'Award'),
(2, 'Cybersecurity Fundamentals', 'IBM', 'ShieldCheck'),
(3, 'Networking Basics', 'Cisco', 'Server');

-- Insert services data
INSERT INTO services ("order", title, description, icon) VALUES
(1, 'Secure Web Development', 'Building robust and scalable web applications with a security-first mindset, using modern frameworks like Laravel and Next.js.', 'ShieldCheck'),
(2, 'AI & Chatbot Integration', 'Integrating intelligent chatbots and AI-powered features into your applications to automate tasks and enhance user engagement.', 'Bot'),
(3, 'Cybersecurity Consulting', 'Providing expert guidance on security best practices, vulnerability assessments, and implementing a strong defensive posture.', 'SearchCheck'),
(4, 'Cloud & DevOps', 'Streamlining your development and deployment processes with CI/CD, Docker, and cloud infrastructure on AWS and IBM Cloud.', 'CloudCog');
