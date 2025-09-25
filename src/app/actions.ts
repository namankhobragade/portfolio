
"use server";

import { z } from "zod";
import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { format } from 'date-fns';
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { SITE_CONFIG } from "@/lib/data";
import { cookies } from 'next/headers';
import { supabase } from "@/lib/supabase/client";

// ========= Resume Download Logic =========
const resumeRequestSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  purpose: z.enum(['developer', 'fullstack', 'cyber-security', 'lead', 'other'], {
    required_error: "You need to select a purpose.",
  }),
});

export async function submitResumeRequest(prevState: any, formData: FormData) {
    const validatedFields = resumeRequestSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        purpose: formData.get('purpose'),
    });

    if (!validatedFields.success) {
        const errorMessages = Object.values(validatedFields.error.flatten().fieldErrors).flat().join(' ');
        return {
            success: false,
            message: errorMessages || "There was an error with your submission.",
        };
    }

    try {
        const { error } = await supabase.from('resume_downloads').insert([
            {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                purpose: validatedFields.data.purpose,
            }
        ]);
        if (error) throw error;

        return {
            success: true,
            message: "Thank you! You can now download the resume.",
        };
    } catch (error: any) {
        return {
            success: false,
            message: `Database error: ${error.message}`,
        };
    }
}


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
    
    try {
        const { error } = await supabase.from('contacts').insert([
            {
                name: validatedFields.data.name,
                email: validatedFields.data.email,
                message: validatedFields.data.message,
            }
        ]);

        if (error) throw error;

        return {
            success: true,
            message: "Message sent successfully! 🚀 I'll be in touch soon.",
        };

    } catch (error: any) {
         return {
            success: false,
            message: `Database error: ${error.message}`,
        };
    }
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

  try {
      const { error } = await supabase.from('subscribers').insert([
          { email: validatedFields.data.email }
      ]);
      if (error) {
        // Handle potential unique constraint violation gracefully
        if (error.code === '23505') {
            return { success: true, message: "You're already on the list! 👍" };
        }
        throw error;
      }
      return {
        success: true,
        message: "You're on the list! 🎉 Welcome aboard.",
      };
  } catch (error: any) {
    return {
        success: false,
        message: `Database error: ${error.message}`,
    };
  }
}


// ========= Blog Post Saving Logic =========

const blogPostSchema = z.object({
  topic: z.string(),
  imageUrl: z.string().optional(),
});

const generatedPostSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  content: z.string(),
  imageDataUri: z.string(),
  imagePrompt: z.string(),
});

export async function saveBlogPost(post: z.infer<typeof generatedPostSchema>) {
  const validatedPost = generatedPostSchema.safeParse(post);

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

// This function is currently not used as data is moving to Supabase
// but we'll keep it for now.
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

    const newContent = `export const SITE_CONFIG = ${JSON.stringify(newSiteConfig, null, 2)};\n`;

    try {
        await fs.writeFile(dataFilePath, newContent, 'utf-8');
        return { success: true, message: 'General settings updated successfully!' };
    } catch (error: any) {
        return { success: false, message: `Failed to update settings: ${error.message}` };
    }
}


// ---- Skills Management ----
const skillSchema = z.object({
    name: z.string(),
    icon: z.string(),
});
const skillCategorySchema = z.object({
    category: z.string(),
    description: z.string(),
    skills: z.array(skillSchema),
});

export async function updateSkills(skillsData: z.infer<typeof skillsFormSchema>['skills']) {
    const skillsFormSchema = z.object({
        skills: z.array(skillCategorySchema),
    });

    const validatedFields = skillsFormSchema.safeParse({ skills: skillsData });

    if (!validatedFields.success) {
        console.error("Skill validation failed:", validatedFields.error.flatten());
        return { success: false, message: 'Invalid skills data submitted.' };
    }
    
    const skillsToUpsert = validatedFields.data.skills.map((category, index) => ({
      id: index + 1, // Using order as id for simplicity. Be cautious with this in production.
      order: index + 1,
      category: category.category,
      description: category.description,
      skills: category.skills,
    }));

    try {
        const { error } = await supabase.from('skills').upsert(skillsToUpsert, { onConflict: 'id' });
        if (error) throw error;
        
        // Delete any skills that are no longer present
        const skillIds = skillsToUpsert.map(s => s.id);
        const { error: deleteError } = await supabase.from('skills').delete().not('id', 'in', `(${skillIds.join(',')})`);
        if (deleteError) throw deleteError;


        return { success: true, message: 'Skills updated successfully!' };
    } catch (error: any) {
        return { success: false, message: `Failed to update skills: ${error.message}` };
    }
}

export async function updateSkillsAction(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    const skillsData: any[] = [];

    // This logic reconstructs the nested array structure from the flat form data
    for (const [key, value] of Object.entries(rawData)) {
        const categoryMatch = key.match(/^skills\[(\d+)\]\.category$/);
        const descriptionMatch = key.match(/^skills\[(\d+)\]\.description$/);
        const skillNameMatch = key.match(/^skills\[(\d+)\]\.skills\[(\d+)\]\.name$/);
        const skillIconMatch = key.match(/^skills\[(\d+)\]\.skills\[(\d+)\]\.icon$/);

        if (categoryMatch) {
            const index = parseInt(categoryMatch[1], 10);
            if (!skillsData[index]) skillsData[index] = { skills: [] };
            skillsData[index].category = value as string;
        } else if (descriptionMatch) {
            const index = parseInt(descriptionMatch[1], 10);
            if (!skillsData[index]) skillsData[index] = { skills: [] };
            skillsData[index].description = value as string;
        } else if (skillNameMatch) {
            const catIndex = parseInt(skillNameMatch[1], 10);
            const skillIndex = parseInt(skillNameMatch[2], 10);
            if (!skillsData[catIndex]) skillsData[catIndex] = { skills: [] };
            if (!skillsData[catIndex].skills[skillIndex]) skillsData[catIndex].skills[skillIndex] = {};
            skillsData[catIndex].skills[skillIndex].name = value as string;
        } else if (skillIconMatch) {
            const catIndex = parseInt(skillIconMatch[1], 10);
            const skillIndex = parseInt(skillIconMatch[2], 10);
            if (!skillsData[catIndex]) skillsData[catIndex] = { skills: [] };
            if (!skillsData[catIndex].skills[skillIndex]) skillsData[catIndex].skills[skillIndex] = {};
            skillsData[catIndex].skills[skillIndex].icon = value as string;
        }
    }
    
    // Filter out any potentially empty/undefined array elements
    const cleanedSkillsData = skillsData.filter(Boolean);

    return updateSkills(cleanedSkillsData);
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

        tailwindConfig = tailwindConfig.replace(/body: \['[^']+'[^\]]+\]/, `body: ['${fontBodyVar}', 'sans-serif']`);
        tailwindConfig = tailwindConfig.replace(/headline: \['[^']+'[^\]]+\]/, `headline: ['${fontHeadlineVar}', 'sans-serif']`);
        
        await fs.writeFile(tailwindConfigPath, tailwindConfig, 'utf-8');

        // --- Update layout.tsx ---
        let layoutContent = await fs.readFile(layoutFilePath, 'utf-8');

        const fontBodyConst = fontBody.replace(/ /g, '_');
        const fontHeadlineConst = fontHeadline.replace(/ /g, '_');
        
        // Remove old font imports, but keep Source Code Pro
        const importRegex = /import { [^}]+ } from 'next\/font\/google';/;
        const currentImportMatch = layoutContent.match(importRegex);
        
        if (currentImportMatch) {
            // Add new fonts to the existing import
            const existingFonts = currentImportMatch[0].match(/{([^}]+)}/)?.[1].split(',').map(f => f.trim()) || [];
            const newFontSet = new Set([...existingFonts, fontBodyConst, fontHeadlineConst, 'Source_Code_Pro']);
            const newImport = `import { ${Array.from(newFontSet).filter(f => f).join(', ')} } from 'next/font/google';`;
            layoutContent = layoutContent.replace(importRegex, newImport);
        }

        // Update font instantiation
        const bodyRegex = /const \w+ = \w+\({[\s\S]*?variable: '--font-inter'[\s\S]*?}\);/;
        const headlineRegex = /const \w+ = \w+\({[\s\S]*?variable: '--font-space-grotesk'[\s\S]*?}\);/;
        
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
        
        // This is tricky. Let's find a more robust way.
        // We'll replace the variables in the className instead.
        const bodyVarName = layoutContent.match(/const (\w+) = \w+\({[\s\S]+?variable: '--font-inter'[\s\S]+?}\);/)?.[1];
        const headlineVarName = layoutContent.match(/const (\w+) = \w+\({[\s\S]+?variable: '--font-space-grotesk'[\s\S]+?}\);/)?.[1];

        if (bodyVarName && headlineVarName) {
            const htmlClassRegex = new RegExp(`className={\`\\\$\\{${bodyVarName}.variable\\} \\\$\\{${headlineVarName}.variable\\}`);
            layoutContent = layoutContent.replace(htmlClassRegex, `className={\`\$\{${fontBodyConst.toLowerCase()}.variable\} \$\{${fontHeadlineConst.toLowerCase()}.variable\}`);
        }
        
        layoutContent = layoutContent.replace(/const inter = Inter\({[\s\S]*?}\);/, newBodyConst);
        layoutContent = layoutContent.replace(/const spaceGrotesk = Space_Grotesk\({[\s\S]*?}\);/, newHeadlineConst);

        await fs.writeFile(layoutFilePath, layoutContent, 'utf-8');
        
        return { success: true, message: 'Typography updated! Please wait for the server to restart.' };
    } catch (error: any) {
        return { success: false, message: `Failed to update typography: ${error.message}` };
    }
}


// ========= Studio Auth Logic =========

const STUDIO_PASSWORD_COOKIE = 'devsec_studio_pass';
const loginSchema = z.object({
  password: z.string(),
});

export async function authenticateStudio(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid data.' };
  }

  const { password } = validatedFields.data;

  if (password === process.env.STUDIO_PASSWORD) {
    cookies().set({
      name: STUDIO_PASSWORD_COOKIE,
      value: process.env.STUDIO_PASSWORD_COOKIE_VALUE!,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return { success: true, message: 'Authentication successful.' };
  } else {
    return { success: false, message: 'Invalid password.' };
  }
}

export async function logoutStudio() {
    cookies().delete(STUDIO_PASSWORD_COOKIE);
    redirect('/studio/login');
}
