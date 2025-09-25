-- 1. Create the skills table
CREATE TABLE skills (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" INT,
  category TEXT NOT NULL,
  description TEXT,
  skills JSONB
);

-- 2. Create the projects table
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

-- 3. Create the experience table
CREATE TABLE experience (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT,
    responsibilities TEXT[]
);

-- 4. Create the education table
CREATE TABLE education (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    status TEXT,
    icon TEXT
);

-- 5. Create the certifications table
CREATE TABLE certifications (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    name TEXT NOT NULL,
    issuer TEXT,
    icon TEXT
);

-- 6. Create the services table
CREATE TABLE services (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "order" INT,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT
);

-- 7. Create the resume_downloads table
CREATE TABLE resume_downloads (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    purpose TEXT
);

-- 8. Create the contacts table
CREATE TABLE contacts (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT
);

-- 9. Create the subscribers table
CREATE TABLE subscribers (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    email TEXT NOT NULL UNIQUE
);


-- ====================================================================
--                      INSERT DATA
-- ====================================================================

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
(1, 'Proffid – Secure Identity Platform', 'proffid-secure-identity', 'A secure, plug-and-play user authentication and identity management layer designed for modern SaaS applications.', '{"Laravel", "MongoDB", "JWT", "OAuth2"}', 'Role-Based Access Control (RBAC), session hardening, and secure token management.', '#', '#', 'project-1', '## The Challenge: Simplified, Secure Authentication...'),
(2, 'AI-Powered SOC Assistant', 'ai-soc-assistant', 'A proof-of-concept AI chatbot that parses security logs, triages alerts, and provides actionable mitigation suggestions for security analysts.', '{"Python", "Next.js", "Genkit", "LangChain"}', 'Prompt injection defense, data sanitization, and secure interaction with LLMs.', '#', NULL, 'project-2', '## The Problem: Alert Fatigue in the SOC...'),
(3, 'Full-Stack E-Learning Platform', 'elearning-platform', 'A comprehensive e-learning solution with live class capabilities, secure payment processing, and distinct dashboards for students and teachers.', '{"CodeIgniter 4", "MySQL", "BigBlueButton API", "Stripe"}', 'Cross-Site Request Forgery (CSRF) protection, secure payment gateway integration, and fine-grained access control.', NULL, '#', 'project-3', '## The Goal: A Modern Digital Classroom...');

-- Insert experience data
INSERT INTO experience ("order", role, company, period, responsibilities) VALUES
(1, 'Technical Lead', 'Confidential', '2025–Present', '{"Leading a full-stack team building secure, scalable platforms.", "Integrating AI-based tools for security automation.", "Enforcing secure coding practices across all development teams."}'),
(2, 'Freelance Full-Stack Developer', 'Self-Employed', '2020–Present', '{"Delivered over 20 custom web platforms for clients in e-commerce, education, and SaaS.", "Integrated secure payment gateways like Stripe and Razorpay.", "Applied OWASP best practices to mitigate common vulnerabilities like XSS, CSRF, and SQL Injection."}'),
(3, 'Full-Stack Developer', 'IBM', '2021–2022', '{"Developed and maintained secure MERN stack applications with Angular CLI.", "Collaborated on mainframe system programming and module integration."}');

-- Insert education data
INSERT INTO education ("order", degree, institution, status, icon) VALUES
(1, 'Master’s in Information Security', 'Indira Gandhi National Open University (IGNOU)', 'Ongoing', 'GraduationCap'),
(2, 'Postgraduate Diploma in Information Security', 'Indira Gandhi National Open University (IGNOU)', 'Completed', 'BookOpen');

-- Insert certifications data
INSERT INTO certifications ("order", name, issuer, icon) VALUES
(1, 'Certified Ethical Hacker (CEH) v13 AI', 'EC-Council', 'ShieldCheck'),
(2, 'Cybersecurity Fundamentals', 'IBM', 'Shield'),
(3, 'Introduction to Cloud Computing', 'IBM', 'CloudCog'),
(4, 'Networking Fundamentals', 'Cisco', 'Server');

-- Insert services data
INSERT INTO services ("order", title, description, icon) VALUES
(1, 'Secure Web Development', 'Building robust and secure web applications from the ground up using modern frameworks and best practices.', 'Code'),
(2, 'Cybersecurity Audits', 'Performing comprehensive security assessments, including penetration testing and vulnerability scanning, to identify and mitigate risks.', 'ShieldCheck'),
(3, 'AI & Chatbot Integration', 'Developing and integrating intelligent chatbots and AI-powered tools to automate tasks and enhance user experiences.', 'Bot'),
(4) , 'Cloud & SOC Consulting', 'Advising on secure cloud architecture, DevOps pipelines, and the setup of Security Operations Centers (SOC).', 'Settings');
