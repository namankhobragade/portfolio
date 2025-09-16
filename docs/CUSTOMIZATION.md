# Customizing Your Securefolio

This guide provides detailed instructions on how to personalize your portfolio website. Most customizations can be done by editing data files, replacing images, or writing Markdown, with no complex coding required.

## 1. Personal Content

All the personal content for the different sections of the portfolio (Skills, Projects, Experience, etc.) is managed in a single file: `src/lib/data.ts`.

### Skills (`SKILLS_DATA`)

Update this array to reflect your technical skills. You can change the category, skill name, proficiency level (0-100), and even the icon from `lucide-react`.

### Projects (`PROJECTS_DATA`)

Showcase your best work by updating this array. Each project object includes:
- `title`, `description`, `techStack`, `securityFocus`
- `githubUrl` and `demoUrl` (if available)
- `imageId`: This ID links to an image defined in `src/lib/placeholder-images.json`. Make sure to add a corresponding image for your project.

### Experience (`EXPERIENCE_DATA`)

Detail your professional history here. Each object represents a role and includes `company`, `period`, and a list of `responsibilities`.

### Education & Certifications (`EDUCATION_DATA`, `CERTIFICATIONS_DATA`)

Update these arrays to list your academic background and professional certifications.

## 2. Images

Your portfolio uses both your own images and placeholder images.

### Uploading Your Images

Place your images in the `public/images` folder. For the site to automatically pick them up, use the following file names:

- **Profile Pictures**:
  - `profile-hero.jpg`
  - `profile-about.jpg`
- **Project Images**: Create images for your projects and name them descriptively (e.g., `project-my-app.jpg`).
- **Blog Images**: Create images for your blog posts (e.g., `blog-my-post-title.jpg`).

### Linking Images

Image data is managed in `src/lib/placeholder-images.json`. To use your own images:

1.  Add a new entry to the `placeholderImages` array in this JSON file.
2.  Set the `id` to a unique identifier (e.g., `"my-new-project-image"`).
3.  Set the `imageUrl` to the path of your image in the `public` folder (e.g., `"/images/project-my-app.jpg"`).
4.  In `src/lib/data.ts` (for projects) or your blog's frontmatter, use the `id` you created as the `imageId`.

## 3. Blog Posts

Your blog is powered by Markdown files located in the `content/blog` directory.

### Creating a New Post

1.  Create a new file with a `.md` extension in `content/blog` (e.g., `my-new-article.md`).
2.  At the top of the file, add the "frontmatter" section. This is YAML metadata that provides details about the post.

    ```markdown
    ---
    title: "My New Article Title"
    slug: "my-new-article-slug"
    date: "YYYY-MM-DD"
    imageId: "blog-image-id-from-json"
    description: "A short, compelling summary of the article."
    ---

    Your article content, written in Markdown, starts here.
    ```

3.  Write your content using standard Markdown syntax. The site automatically handles syntax highlighting for code blocks.

## 4. Theme and Styling

### Colors

The site's color palette is defined using CSS variables in `src/app/globals.css`. You can easily change the primary, accent, and background colors to match your personal brand.

```css
/* In src/app/globals.css */
:root {
  --primary: 215 70% 40%; /* Professional Blue */
  --accent: 180 100% 35%; /* Tech Teal */
  /* ... other colors */
}

.dark {
  --primary: 215 70% 50%;
  --accent: 180 100% 45%;
  /* ... other dark mode colors */
}
```

The colors are defined using HSL values (`Hue Saturation Lightness`), which makes it easy to adjust them.

### Fonts

The fonts are imported from Google Fonts in `src/app/layout.tsx` and configured in `tailwind.config.ts`. You can change these to any other font of your choice.

## 5. AI Proposal Generator

The AI model's behavior is controlled by the prompt located in `src/ai/flows/ai-service-proposal-tool.ts`. You can edit the `prompt` string within the `ai.definePrompt` function to change its tone, structure, or instructions.
```javascript
const prompt = ai.definePrompt({
  // ...
  prompt: `You are an expert freelance proposal writer...
// ... (edit the instructions here)
`,
});
```

This allows you to fine-tune the AI to generate proposals that perfectly match your style.
