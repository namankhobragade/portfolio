
# Supabase Table Schemas

To make your portfolio fully dynamic, you need to create the `services`, `experience`, `testimonials`, and `visitors` tables in your Supabase database.

## Instructions

1.  Navigate to your Supabase project dashboard.
2.  In the left sidebar, click on the **SQL Editor** icon.
3.  Click on **+ New query**.
4.  Copy the SQL code for each table below and paste it into the query editor.
5.  Click **RUN** to create the table.
6.  Repeat for all tables.
7.  After creating the tables, go to the **Table Editor** to add your content into the newly created tables.

---

### 1. Services Table

This table stores the services you offer.

```sql
-- Create the services table
CREATE TABLE public.services (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" smallint NOT NULL DEFAULT 0,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Enable read access for all users" ON public.services
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.services ("order", title, description, icon) VALUES
(1, 'Secure Web Development', 'Building robust, scalable web applications with a security-first mindset using technologies like Laravel and Next.js.', 'ShieldCheck'),
(2, 'Cybersecurity Audits', 'Conducting comprehensive vulnerability assessments and penetration testing to identify and mitigate security risks.', 'SearchCheck'),
(3, 'AI & Chatbot Integration', 'Leveraging LLMs and AI to create intelligent chatbots and automate security operations for threat detection and analysis.', 'Bot'),
(4, 'Cloud Security', 'Designing and implementing secure cloud architectures, ensuring compliance and protecting data on platforms like AWS and Azure.', 'CloudCog');
```

---

### 2. Experience Table

This table stores your professional work experience.

```sql
-- Create the experience table
CREATE TABLE public.experience (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" smallint NOT NULL DEFAULT 0,
  company text NOT NULL,
  role text NOT NULL,
  period text NOT NULL,
  responsibilities text[] NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Enable read access for all users" ON public.experience
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.experience ("order", company, role, period, responsibilities) VALUES
(1, 'Confidential Startup', 'Technical Lead', '2025 – Present', '{"Leading a full-stack team in building secure, scalable platforms.","Integrating AI-based tools for security automation and threat detection.","Enforcing secure coding practices (OWASP) across all development cycles.","Architecting microservices and managing cloud infrastructure security."}'),
(2, 'Freelance', 'Full-Stack Developer & Security Consultant', '2020 – Present', '{"Delivered over 20 custom web platforms for clients in education, e-commerce, and SaaS.","Integrated secure payment gateways like Stripe and Razorpay.","Applied deep knowledge of OWASP Top 10 to mitigate common vulnerabilities like XSS, CSRF, and SQLi.","Conducted vulnerability assessments and provided security hardening recommendations."}'),
(3, 'IBM', 'Full-Stack Developer', '2021 – 2022', '{"Developed and maintained secure MERN stack applications with Angular CLI.","Collaborated on system programming tasks involving mainframe modules and services.","Participated in agile development sprints, focusing on code quality and security."}');
```

---

### 3. Testimonials Table

This table stores testimonials from your clients and colleagues.

```sql
-- Create the testimonials table
CREATE TABLE public.testimonials (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  "order" smallint NOT NULL DEFAULT 0,
  name text NOT NULL,
  title text NOT NULL,
  quote text NOT NULL,
  avatar text NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Enable read access for all users" ON public.testimonials
  FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.testimonials ("order", name, title, quote, avatar) VALUES
(1, 'Amir Ahmed', 'Senior DevSecOps Engineer', 'Sunil’s mastery in full-stack development and unwavering dedication to security truly sets him apart. He consistently delivers code that is not only functional but also fortified against modern threats.', '/images/avatar-1.png'),
(2, 'Priya Sharma', 'Product Manager, Ed-Tech Startup', 'Working with Sunil was a game-changer for our platform. He single-handedly built our secure e-learning portal, and his proactive approach to security saved us from potential vulnerabilities down the line.', '/images/avatar-2.png'),
(3, 'Dr. Rajesh Gupta', 'Cybersecurity Professor', 'As a student in my Information Security program, Sunil shows a rare aptitude for bridging theoretical knowledge with practical application. His insights into AI''s role in cybersecurity are particularly impressive.', '/images/avatar-3.png');
```

---

### 4. Visitors Table

This table stores a log of visitor sessions for analytics.

#### **Step 1: Create the initial table**
Run this query first if you haven't created the `visitors` table yet.

```sql
-- Create the visitors table
CREATE TABLE public.visitors (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_agent text,
  platform text,
  language text,
  ip text,
  geolocation jsonb,
  connection_type text
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous inserts
CREATE POLICY "Enable anon insert for all users" ON public.visitors
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow you to read the data in the Studio
CREATE POLICY "Enable read access for all users" ON public.visitors
  FOR SELECT USING (true);
```

#### **Step 2: Add new columns for detailed analytics**
Run this `ALTER TABLE` query to add all the new columns for storing detailed visitor information. It's safe to run even if the table already exists.

```sql
-- Add new columns to the visitors table for detailed client info
ALTER TABLE public.visitors
ADD COLUMN IF NOT EXISTS cpu_cores smallint,
ADD COLUMN IF NOT EXISTS memory smallint,
ADD COLUMN IF NOT EXISTS screen_resolution text,
ADD COLUMN IF NOT EXISTS is_touch_enabled boolean,
ADD COLUMN IF NOT EXISTS gpu text,
ADD COLUMN IF NOT EXISTS network_info jsonb,
ADD COLUMN IF NOT EXISTS is_online boolean,
ADD COLUMN IF NOT EXISTS do_not_track text,
ADD COLUMN IF NOT EXISTS performance jsonb;

```
