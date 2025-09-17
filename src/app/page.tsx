
import { Hero } from '@/components/sections/hero';
import { Skills } from '@/components/sections/skills';
import { Projects } from '@/components/sections/projects';
import { Experience } from '@/components/sections/experience';
import { Certifications } from '@/components/sections/certifications';
import { Blog } from '@/components/sections/blog';
import { ProposalGenerator } from '@/components/sections/proposal-generator';
import { Contact } from '@/components/sections/contact';
import { Education } from '@/components/sections/education';
import { AnimatedSection } from '@/components/animated-section';
import { Services } from '@/components/sections/services';
import { Testimonials } from '@/components/sections/testimonials';

export default function Home() {
  return (
    <div className="flex flex-col">
        <AnimatedSection id="home"><Hero /></AnimatedSection>
        <AnimatedSection id="services"><Services /></AnimatedSection>
        <AnimatedSection id="skills"><Skills /></AnimatedSection>
        <AnimatedSection id="projects"><Projects /></AnimatedSection>
        <AnimatedSection id="experience"><Experience /></AnimatedSection>
        <AnimatedSection id="studies"><Education /></AnimatedSection>
        <AnimatedSection id="certifications"><Certifications /></AnimatedSection>
        <AnimatedSection id="testimonials"><Testimonials /></AnimatedSection>
        <AnimatedSection id="blog"><Blog /></AnimatedSection>
        <AnimatedSection id="proposal"><ProposalGenerator /></AnimatedSection>
        <AnimatedSection id="contact"><Contact /></AnimatedSection>
    </div>
  );
}
