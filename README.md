# DevSec: AI-Powered Next.js Portfolio

Welcome to DevSec, a modern, feature-rich, and secure portfolio website built with Next.js, TypeScript, and Tailwind CSS. This project is designed to showcase the skills of a cybersecurity professional and full-stack developer, with a special focus on integrating AI-powered tools.

![DevSec Screenshot](public/screenshot.png)

## ✨ Features

- **Modern & Responsive Design**: A sleek, professional layout built with Tailwind CSS and ShadCN UI that looks great on all devices.
- **AI Proposal Generator**: An integrated Genkit flow that uses an LLM to generate personalized freelance proposals based on user input.
- **Dynamic Content**: Easily update skills, projects, experience, and blog posts by editing simple data and markdown files.
- **Smooth Animations & Transitions**: Engaging animations using Framer Motion to create a fluid and polished user experience.
- **Blog with Markdown**: Write and manage blog posts using simple Markdown files. Code blocks are automatically highlighted.
- **Dark & Light Mode**: Theme toggling with persistence in local storage.
- **Contact Form with Honeypot**: A server-side contact form that includes a honeypot field to filter out spam bots.
- **Optimized for Performance**: Built with Next.js App Router, Server Components, and image optimization.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit (Google AI)](https://firebase.google.com/docs/genkit)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Markdown**: [react-markdown](https://github.com/remarkjs/react-markdown)
- **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 🔧 Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/naman-mahi/devsec.git
    cd devsec
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Google AI API key for the proposal generator to work.
    ```
    GEMINI_API_KEY=your_google_ai_api_key
    ```
    You can get a free key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the development server:**
    The application runs on two parallel processes: the Next.js frontend and the Genkit AI server.

    - **In your first terminal, run the Next.js app:**
      ```bash
      npm run dev
      ```
      This will start the website on [http://localhost:9002](http://localhost:9002).

    - **In your second terminal, run the Genkit AI server:**
      ```bash
      npm run genkit:dev
      ```
      This starts the local Genkit development server, which the Next.js app will call for AI features.

## 🎨 Customization

This portfolio is designed to be easily personalized. For detailed instructions, please see the **[CUSTOMIZATION.md](docs/CUSTOMIZATION.md)** file.

Here's a quick overview of what you can change:

- **Personal Information**: Edit `src/lib/data.ts` to update your skills, projects, experience, education, and certifications.
- **Images**: Replace the images in the `public/images` folder. See the customization guide for exact file names.
- **Blog Posts**: Add, edit, or delete Markdown files in the `content/blog` directory.
- **Theme**: Modify the color scheme and fonts in `src/app/globals.css` and `tailwind.config.ts`.
- **AI Prompt**: Fine-tune the AI proposal generator's prompt in `src/ai/flows/ai-service-proposal-tool.ts`.

## 🚀 Deployment

This project is configured for seamless deployment on platforms that support Next.js's full feature set, including server-side rendering and API routes.

**Important**: Do not deploy this project to a static hosting provider like GitHub Pages, as it will break the AI features and contact form.

### Recommended Platforms

- **Vercel**: The easiest and most recommended way to deploy a Next.js application. Simply connect your Git repository, and Vercel handles the rest.
- **Firebase App Hosting**: A great choice within the Google ecosystem, fully compatible with modern web frameworks like Next.js.

### Deployment Steps (Vercel Example)

1.  Push your code to a GitHub, GitLab, or Bitbucket repository.
2.  Go to [Vercel](https://vercel.com/new) and create a new project.
3.  Import your Git repository.
4.  Add your `GEMINI_API_KEY` as an environment variable in the project settings.
5.  Click "Deploy". Vercel will automatically build and deploy your site.
