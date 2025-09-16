import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Certifications } from '@/components/sections/certifications';
import { Blog } from '@/components/sections/blog';
import { ProposalGenerator } from '@/components/sections/proposal-generator';
import { Contact } from '@/components/sections/contact';

export default function Home() {
  return (
    <div className="flex flex-col">
        <Hero />
        <div id="about" className="scroll-mt-14"><About /></div>
        <div id="skills" className="scroll-mt-14"><Skills /></div>
        <div id="projects" className="scroll-mt-14"><Projects /></div>
        <div id="experience" className="scroll-mt-14"><Experience /></div>
        <div id="certifications" className="scroll-mt-14"><Certifications /></div>
        <div id="blog" className="scroll-mt-14"><Blog /></div>
        <div id="services" className="scroll-mt-14"><ProposalGenerator /></div>
        <div id="contact" className="scroll-mt-14"><Contact /></div>
    </div>
  );
}
