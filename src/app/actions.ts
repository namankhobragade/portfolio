
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { SKILLS_DATA, SITE_CONFIG, EXPERIENCE_DATA, EDUCATION_DATA, CERTIFICATIONS_DATA, SERVICES_DATA, PROJECTS_DATA } from "@/lib/data";

// ========= Contact Form Logic =========

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
    const validatedFields = contactFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            message: "There was an error with your submission.",
        };
    }
    
    // This is a server action, so we can safely handle form submissions here
    // without exposing sensitive info to the client-side.
    // In a real application, you would send an email or save to a database.
    console.log('Contact form submitted:', validatedFields.data);

    return {
        success: true,
        message: "Message sent successfully! 🚀 I'll be in touch soon.",
    };
}


// ========= Newsletter Subscription Logic =========

const newsletterFormSchema = z.object({
  email: z.string().email("Invalid email address."),
});

export async function subscribeToNewsletter(prevState: any, formData: FormData) {
  const validatedFields = newsletterFormSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
        success: false,
        message: "Please enter a valid email address.",
    };
  }

  // Same as above, handle the subscription server-side.
  console.log('New newsletter subscription:', validatedFields.data.email);

  return {
    success: true,
    message: "You're on the list! 🎉 Welcome aboard.",
  };
}


// ========= Blog Post Saving Logic =========

const blogPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  imageDataUri: z.string(),
  imagePrompt: z.string(),
});

export async function saveBlogPost(post: z.infer<typeof blogPostSchema>) {
  const validatedPost = blogPostSchema.safeParse(post);

  if (!validatedPost.success) {
    return {
      success: false,
      message: 'Invalid post data.',
    };
  }

  const { title, slug, description, content, imageDataUri, imagePrompt } = validatedPost.data;
  const postsDirectory = path.join(process.cwd(), 'content/blog');
  const imagesDirectory = path.join(process.cwd(), 'public/images/blog');
  const placeholderImagesPath = path.join(process.cwd(), 'src/lib/placeholder-images.json');
  
  const mdFilePath = path.join(postsDirectory, `${slug}.md`);
  const imageFileName = `${slug}.png`;
  const imageFilePath = path.join(imagesDirectory, imageFileName);
  const publicImageUrl = `/images/blog/${imageFileName}`;
  const imageId = `blog-${slug}`;

  try {
    // Check if markdown file already exists
    await fs.access(mdFilePath);
    return {
        success: false,
        message: `A post with the slug "${slug}" already exists.`,
    };
  } catch (error) {
    // File does not exist, which is good.
  }
  
  try {
     // Check if image file already exists
     await fs.access(imageFilePath);
     return {
         success: false,
         message: `An image with the name "${imageFileName}" already exists.`,
     };
   } catch (error) {
     // File does not exist, which is good.
   }


  // 1. Save the image file
  try {
    await fs.mkdir(imagesDirectory, { recursive: true });
    const base64Data = imageDataUri.split(';base64,').pop();
    if (!base64Data) throw new Error('Invalid image data URI.');
    await fs.writeFile(imageFilePath, base64Data, 'base64');
  } catch (error: any) {
    console.error('Failed to write image file:', error);
    return {
      success: false,
      message: `Failed to save image file: ${error.message}`,
    };
  }

  // 2. Update placeholder-images.json
  try {
    const placeholderImagesFile = await fs.readFile(placeholderImagesPath, 'utf-8');
    const placeholderData = JSON.parse(placeholderImagesFile);
    
    const newImageEntry: ImagePlaceholder = {
        id: imageId,
        description: `Featured image for blog post titled: ${title}`,
        imageUrl: publicImageUrl,
        imageHint: imagePrompt.split(' ').slice(0, 2).join(' '),
    };

    placeholderData.placeholderImages.unshift(newImageEntry); // Add to the beginning

    await fs.writeFile(placeholderImagesPath, JSON.stringify(placeholderData, null, 2));

  } catch (error: any) {
     console.error('Failed to update placeholder-images.json:', error);
     return {
       success: false,
       message: `Failed to update image manifest: ${error.message}`,
     };
  }

  // 3. Save the blog post markdown file
  const frontmatter = {
    title,
    slug,
    date: format(new Date(), 'yyyy-MM-dd'),
    imageId: imageId,
    description,
  };

  const fileContent = matter.stringify(content, frontmatter);

  try {
    await fs.writeFile(mdFilePath, fileContent);
    return {
      success: true,
      message: 'Blog post saved successfully!',
    };
  } catch (error: any) {
    console.error('Failed to write blog post file:', error);
    return {
      success: false,
      message: `Failed to save markdown file: ${error.message}`,
    };
  }
}

// ========= Studio Settings Logic =========

const dataFilePath = path.join(process.cwd(), 'src/lib/data.ts');

async function writeDataFile(content: string) {
    const header = `import { ShieldCheck, Code, Cpu, Server, BrainCircuit, Bot, Award, CloudCog, GraduationCap, Briefcase, BookOpen, Star, Database, Cloud, GitBranch, Terminal, Globe, CreditCard, GitCommit, Container, Users, Settings, SearchCheck, Shield, GanttChartSquare, Layers, LucideIcon } from 'lucide-react';\n\n`;
    const fullContent = header + content;
    await fs.writeFile(dataFilePath, fullContent, 'utf-8');
}

// ---- General Settings ----
const generalSettingsSchema = z.object({
    name: z.string().min(1),
    jobTitle: z.string().min(1),
    heroDescription1: z.string().min(1),
    heroDescription2: z.string().min(1),
    siteTitle: z.string().min(1),
    siteDescription: z.string().min(1),
    siteKeywords: z.string(),
    githubUrl: z.string().url(),
    linkedinUrl: z.string().url(),
});

export async function updateGeneralSettings(prevState: any, formData: FormData) {
    const validatedFields = generalSettingsSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid data submitted.' };
    }

    const { siteKeywords, ...rest } = validatedFields.data;

    const newSiteConfig = {
        ...SITE_CONFIG,
        ...rest,
        keywords: siteKeywords.split(',').map(k => k.trim()),
    };

    const newContent = `export const SITE_CONFIG = ${JSON.stringify(newSiteConfig, null, 2)};\n\n`
        + `export const SKILLS_DATA = ${JSON.stringify(SKILLS_DATA, null, 2)};\n\n`
        + `export const PROJECTS_DATA = ${JSON.stringify(PROJECTS_DATA, null, 2)};\n\n`
        + `export const EXPERIENCE_DATA = ${JSON.stringify(EXPERIENCE_DATA, null, 2)};\n\n`
        + `export const EDUCATION_DATA = ${JSON.stringify(EDUCATION_DATA, null, 2)};\n\n`
        + `export const CERTIFICATIONS_DATA = ${JSON.stringify(CERTIFICATIONS_DATA, null, 2)};\n\n`
        + `export const SERVICES_DATA = ${JSON.stringify(SERVICES_DATA, null, 2)};`;

    try {
        await writeDataFile(newContent);
        return { success: true, message: 'General settings updated successfully!' };
    } catch (error: any) {
        return { success: false, message: `Failed to update settings: ${error.message}` };
    }
}


// ---- Skills Management ----
const skillSchema = z.object({
    name: z.string(),
    icon: z.string(), // We'll just store the name. The component will map it to the icon.
});
const skillCategorySchema = z.object({
    category: z.string(),
    description: z.string(),
    skills: z.array(skillSchema),
});
const skillsFormSchema = z.object({
    skills: z.array(skillCategorySchema),
});

export async function updateSkills(prevState: any, formData: FormData) {
    const jsonString = formData.get('skills') as string;
    let data;
    try {
        data = JSON.parse(jsonString);
    } catch {
        return { success: false, message: 'Invalid JSON data for skills.' };
    }

    const validatedFields = skillsFormSchema.safeParse(data);

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid skills data structure.' };
    }

    const newSkillsData = validatedFields.data.skills;

    const newContent = `export const SITE_CONFIG = ${JSON.stringify(SITE_CONFIG, null, 2)};\n\n`
        + `export const SKILLS_DATA = ${JSON.stringify(newSkillsData, null, 2)};\n\n`
        + `export const PROJECTS_DATA = ${JSON.stringify(PROJECTS_DATA, null, 2)};\n\n`
        + `export const EXPERIENCE_DATA = ${JSON.stringify(EXPERIENCE_DATA, null, 2)};\n\n`
        + `export const EDUCATION_DATA = ${JSON.stringify(EDUCATION_DATA, null, 2)};\n\n`
        + `export const CERTIFICATIONS_DATA = ${JSON.stringify(CERTIFICATIONS_DATA, null, 2)};\n\n`
        + `export const SERVICES_DATA = ${JSON.stringify(SERVICES_DATA, null, 2)};`;
    
    try {
        await writeDataFile(newContent);
        return { success: true, message: 'Skills updated successfully!' };
    } catch (error: any) {
        return { success: false, message: `Failed to update skills: ${error.message}` };
    }
}



// ---- Theme Customizer ----
const themeColorSchema = z.object({
    primary: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 240 5.9% 10%"),
    background: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 0 0% 100%"),
    accent: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 240 5.9% 10%"),
    primaryDark: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 0 0% 98%"),
    backgroundDark: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 240 10% 3.9%"),
    accentDark: z.string().regex(/^(\d{1,3})\s(\d{1,3})%\s(\d{1,3})%$/, "Invalid HSL format. Example: 0 0% 98%"),
});

export async function updateThemeColors(prevState: any, formData: FormData) {
    const validatedFields = themeColorSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: "Invalid HSL color format.",
        };
    }

    const { primary, background, accent, primaryDark, backgroundDark, accentDark } = validatedFields.data;
    const cssFilePath = path.join(process.cwd(), 'src/app/globals.css');

    try {
        let cssContent = await fs.readFile(cssFilePath, 'utf-8');

        // Replace light theme colors
        cssContent = cssContent.replace(/--primary:\s*[^;]+;/, `--primary: ${primary};`);
        cssContent = cssContent.replace(/--background:\s*[^;]+;/, `--background: ${background};`);
        cssContent = cssContent.replace(/--accent:\s*[^;]+;/, `--accent: ${accent};`);

        // A more robust way to replace dark mode colors
        cssContent = cssContent.replace(
            /(\.dark\s*{)([\s\S]*?)(--background:\s*)[^;]+(;[\s\S]*?)(--primary:\s*)[^;]+(;[\s\S]*?)(--accent:\s*)[^;]+(;[\s\S]*?)}/,
            `$1$2$3${backgroundDark}$4$5${primaryDark}$6$7${accentDark}$8}`
        );


        await fs.writeFile(cssFilePath, cssContent, 'utf-8');

        return {
            success: true,
            message: "Theme updated successfully! Changes will be visible on next refresh.",
        };

    } catch (error: any) {
        console.error("Failed to update theme:", error);
        return {
            success: false,
            message: `Failed to update theme file: ${error.message}`,
        };
    }
}


// ---- Typography Customizer ----
const typographySchema = z.object({
  fontBody: z.string(),
  fontHeadline: z.string(),
});

export async function updateTypography(prevState: any, formData: FormData) {
    const validatedFields = typographySchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return { success: false, message: 'Invalid font selection.' };
    }

    const { fontBody, fontHeadline } = validatedFields.data;
    const layoutFilePath = path.join(process.cwd(), 'src/app/layout.tsx');
    const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.ts');

    try {
        // --- Update tailwind.config.ts ---
        let tailwindConfig = await fs.readFile(tailwindConfigPath, 'utf-8');
        
        const fontBodyVar = `var(--font-${fontBody.toLowerCase().replace(/ /g, '-')})`;
        const fontHeadlineVar = `var(--font-${fontHeadline.toLowerCase().replace(/ /g, '-')})`;

        tailwindConfig = tailwindConfig.replace(/body: \['[^']+'\s*,\s*'sans-serif'\]/, `body: ['${fontBodyVar}', 'sans-serif']`);
        tailwindConfig = tailwindConfig.replace(/headline: \['[^']+'\s*,\s*'sans-serif'\]/, `headline: ['${fontHeadlineVar}', 'sans-serif']`);
        
        await fs.writeFile(tailwindConfigPath, tailwindConfig, 'utf-8');

        // --- Update layout.tsx ---
        let layoutContent = await fs.readFile(layoutFilePath, 'utf-8');

        const fontBodyConst = fontBody.replace(/ /g, '_');
        const fontHeadlineConst = fontHeadline.replace(/ /g, '_');
        
        // This regex will find all existing font imports from next/font/google except Source_Code_Pro
        const fontImportRegex = /import\s*{\s*([^}]+)\s*}\s*from\s*'next\/font\/google';/;
        const match = layoutContent.match(fontImportRegex);
        let existingFonts = ['Source_Code_Pro'];
        if(match) {
            existingFonts = match[1].split(',').map(f => f.trim()).filter(f => f !== fontBodyConst && f !== fontHeadlineConst && f !== 'Source_Code_Pro');
        }

        const newImport = `import { ${fontBodyConst}, ${fontHeadlineConst}, Source_Code_Pro } from 'next/font/google';`;
        if (!layoutContent.includes(newImport)) {
             layoutContent = layoutContent.replace(/import {[^}]+} from 'next\/font\/google';/, newImport);
        }

        // Update font instantiation
        const bodyRegex = /const\s+\w+\s*=\s*\w+\({[\s\S]*?variable:\s*'--font-inter'[\s\S]*?}\);/;
        const headlineRegex = /const\s+\w+\s*=\s*\w+\({[\s\S]*?variable:\s*'--font-space-grotesk'[\s\S]*?}\);/;
        
        const newBodyConst = `const ${fontBodyConst.toLowerCase()} = ${fontBodyConst}({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-${fontBody.toLowerCase().replace(/ /g, '-')}',
});`;
         const newHeadlineConst = `const ${fontHeadlineConst.toLowerCase()} = ${fontHeadlineConst}({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-${fontHeadline.toLowerCase().replace(/ /g, '-')}',
});`;
        
        layoutContent = layoutContent.replace(bodyRegex, `const inter = ${fontBodyConst}({...});`); // temporary placeholder
        layoutContent = layoutcontent.replace(headlineRegex, `const spaceGrotesk = ${fontHeadlineConst}({...});`); // temporary placeholder

        layoutContent = layoutContent.replace(/const\s+inter\s*=.*/, newBodyConst);
        layoutContent = layoutContent.replace(/const\s+spaceGrotesk\s*=.*/, newHeadlineConst);

        // Update html className
        const htmlClassRegex = /className=\{`\$\{inter\.variable\}\s*\$\{spaceGrotesk\.variable\}/;
        layoutContent = layoutContent.replace(htmlClassRegex, `className={\`\$\{${fontBodyConst.toLowerCase()}.variable\} \$\{${fontHeadlineConst.toLowerCase()}.variable\}`);
        
        await fs.writeFile(layoutFilePath, layoutContent, 'utf-8');
        
        return { success: true, message: 'Typography updated! Please wait for the server to restart.' };
    } catch (error: any) {
        return { success: false, message: `Failed to update typography: ${error.message}` };
    }
}

  