# DevSec: AI-Powered Next.js Portfolio

Welcome to DevSec, a modern, feature-rich, and secure portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This project is designed to showcase the skills of a cybersecurity professional and full-stack developer, with a special focus on integrating AI-powered tools for enhanced client engagement.

![Next.js 15](https://img.shields.io/badge/Next.js-15.5.3-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![Build Status](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)

## ✨ Key Features

### 🤖 AI-Powered Tools
- **Smart Proposal Generator**: Leverage Google's Gemini AI to create personalized freelance proposals in seconds
- **AI Blog Writer**: Generate technical blog posts with integrated code examples and professional insights
- **Intelligent Image Generation**: Create custom featured images for blog posts using AI

### 🎨 Modern Design & UX
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Dark/Light Theme**: Automatic theme switching with user preference persistence
- **Smooth Animations**: Fluid transitions using Framer Motion for professional polish
- **Interactive Components**: Engaging UI elements with hover effects and micro-interactions

### 📝 Content Management
- **Markdown Blog System**: Write and manage technical blog posts with syntax highlighting
- **Dynamic Project Showcase**: Case studies with detailed technical implementations
- **Skills Matrix**: Categorized expertise display with visual icons
- **Experience Timeline**: Professional journey with key achievements

### 🔒 Security & Performance
- **Server-Side Rendering**: Optimized for SEO and performance with Next.js App Router
- **Anti-Spam Protection**: Contact form with honeypot field and server-side validation
- **Type Safety**: Full TypeScript implementation for robust code quality
- **Optimized Assets**: Image optimization and code splitting for fast loading

## 🛠 Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with new features and improvements
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[ShadCN UI](https://ui.shadcn.com/)** - Re-usable components built on Radix UI
- **[Framer Motion 11](https://www.framer.com/motion/)** - Production-ready motion library
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icon library

### AI & Backend
- **[Genkit 1.14](https://firebase.google.com/docs/genkit)** - Google's AI application framework
- **[Google AI (Gemini)](https://ai.google.dev/)** - Advanced language model integration
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Content & Forms
- **[React Markdown](https://github.com/remarkjs/react-markdown)** - Markdown renderer
- **[React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)** - Code syntax highlighting
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with validation
- **[Gray Matter](https://github.com/jonschlinkert/gray-matter)** - Front matter parser

### Development Tools
- **[ESLint](https://eslint.org/)** - Code linting and formatting
- **[PostCSS](https://postcss.org/)** - CSS transformation
- **[Date-fns](https://date-fns.org/)** - Date utility library

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/naman-mahi/devsec.git
   cd devsec
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
3. **Environment setup:**
   Create a `.env.local` file in the root directory:
   ```env
   # Required for AI features
   GEMINI_API_KEY=your_google_ai_api_key_here
   
   # Optional: Site URL for production
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```
   
   > 💡 Get your free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Development Server

The project requires **two concurrent processes** for full functionality:

**Terminal 1 - Next.js Frontend:**
```bash
npm run dev
```
🌐 Opens at [http://localhost:9002](http://localhost:9002)

**Terminal 2 - Genkit AI Server:**
```bash
npm run genkit:dev
```
🤖 Starts the AI service for proposal generation

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint
```

## 🎨 Customization Guide

### Personal Information
Update your details in `src/lib/data.ts`:
```typescript
// Site configuration
export const SITE_CONFIG = {
  name: "Your Name",
  title: "Your Professional Title",
  description: "Your professional description",
  // ... other settings
};

// Skills, projects, experience data
export const SKILLS_DATA = [...]; 
export const PROJECTS_DATA = [...];
export const EXPERIENCE_DATA = [...];
```

### Blog Content
Add new blog posts in `content/blog/`:
```markdown
---
title: "Your Blog Post Title"
date: "2024-01-15"
description: "Brief description"
imageId: "your-image-id"
---

Your markdown content here...
```

### Styling & Themes
- **Colors**: Modify `tailwind.config.ts` for theme colors
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Global styles**: Edit `src/app/globals.css`

### AI Configuration
Customize AI prompts in `src/ai/flows/`:
- `ai-service-proposal-tool.ts` - Proposal generator
- `generate-blog-post-flow.ts` - Blog writer
- `generate-image-flow.ts` - Image generator

### Component Structure
```
src/
├── components/
│   ├── sections/     # Page sections (hero, about, skills, etc.)
│   ├── ui/          # Reusable UI components
│   └── ...          # Utility components
├── app/             # Next.js app router pages
├── lib/             # Utilities and data
└── ai/              # AI flows and configuration
```

## 🚀 Deployment

### Supported Platforms

✅ **Recommended Platforms:**
- **[Vercel](https://vercel.com/)** - Optimal for Next.js with zero configuration
- **[Firebase App Hosting](https://firebase.google.com/docs/hosting)** - Full Next.js support with Google ecosystem
- **[Netlify](https://netlify.com/)** - Good Next.js support with edge functions
- **[Railway](https://railway.app/)** - Simple deployment with database support

❌ **Not Compatible:**
- GitHub Pages, Surge.sh, or other static-only hosts (breaks AI features and contact form)

### Vercel Deployment (Recommended)

1. **Connect Repository:**
   - Push your code to GitHub/GitLab/Bitbucket
   - Visit [vercel.com/new](https://vercel.com/new)
   - Import your repository

2. **Configure Environment:**
   ```env
   GEMINI_API_KEY=your_google_ai_api_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

3. **Deploy:**
   - Click "Deploy" - Vercel handles the build automatically
   - Your site will be live with automatic HTTPS

### Firebase App Hosting

1. **Setup Firebase:**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init apphosting
   ```

2. **Configure `apphosting.yaml`:**
   ```yaml
   runConfig:
     runtime: nodejs18
   ```

3. **Deploy:**
   ```bash
   firebase deploy --only apphosting
   ```

### Custom Server Deployment

For VPS or dedicated servers:
```bash
# Build the application
npm run build

# Start with PM2 (recommended)
npm install -g pm2
pm2 start npm --name "devsec-portfolio" -- start

# Or start directly
npm start
```

### Environment Variables for Production

```env
# Required
GEMINI_API_KEY=your_google_ai_api_key

# Recommended
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NODE_ENV=production

# Optional
ANALYTICS_ID=your_analytics_id
```

## 📁 Project Structure

```
devsec-portfolio/
├── 📂 src/
│   ├── 📂 app/                    # Next.js App Router
│   │   ├── 📂 blog/[slug]/        # Dynamic blog routes
│   │   ├── 📂 projects/[slug]/    # Dynamic project routes
│   │   ├── 📂 studio/             # Content management
│   │   ├── 📄 layout.tsx          # Root layout
│   │   ├── 📄 page.tsx            # Homepage
│   │   └── 📄 actions.ts          # Server actions
│   ├── 📂 components/
│   │   ├── 📂 sections/           # Page sections
│   │   │   ├── 📄 hero.tsx
│   │   │   ├── 📄 about.tsx
│   │   │   ├── 📄 skills.tsx
│   │   │   ├── 📄 projects.tsx
│   │   │   ├── 📄 blog.tsx
│   │   │   └── 📄 contact.tsx
│   │   ├── 📂 ui/                 # Reusable UI components
│   │   └── 📄 markdown-content.tsx
│   ├── 📂 ai/                     # AI integration
│   │   ├── 📂 flows/              # Genkit AI flows
│   │   │   ├── 📄 ai-service-proposal-tool.ts
│   │   │   ├── 📄 generate-blog-post-flow.ts
│   │   │   └── 📄 generate-image-flow.ts
│   │   ├── 📄 genkit.ts           # AI configuration
│   │   └── 📄 dev.ts              # Development server
│   ├── 📂 lib/                    # Utilities and data
│   │   ├── 📄 data.ts             # Site content and configuration
│   │   ├── 📄 blog.ts             # Blog utilities
│   │   ├── 📄 utils.ts            # Helper functions
│   │   └── 📄 icons.ts            # Icon mappings
│   └── 📂 hooks/                  # Custom React hooks
├── 📂 content/
│   └── 📂 blog/                   # Markdown blog posts
├── 📂 public/                     # Static assets
├── 📄 package.json               # Dependencies and scripts
├── 📄 tailwind.config.ts         # Tailwind configuration
├── 📄 tsconfig.json              # TypeScript configuration
├── 📄 next.config.mjs            # Next.js configuration
└── 📄 README.md                  # This file
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start Next.js development server (port 9002)
npm run genkit:dev   # Start Genkit AI development server
npm run genkit:watch # Start Genkit with file watching

# Production
npm run build        # Build optimized production bundle
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run typecheck   # Run TypeScript compiler check
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) for seamless deployment
- [Google AI](https://ai.google.dev/) for powerful AI integration
- [ShadCN](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

If you have any questions or need help with setup, please:

1. Check the [Issues](https://github.com/naman-mahi/devsec/issues) page
2. Create a new issue with detailed information
3. Join discussions in the [Discussions](https://github.com/naman-mahi/devsec/discussions) tab

---

<div align="center">
  <p>Made with ❤️ by <strong>Proffid</strong></p>
  <p>
    <a href="https://github.com/naman-mahi/devsec">⭐ Star this repository</a> if you found it helpful!
  </p>
</div>