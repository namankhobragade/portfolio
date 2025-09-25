
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
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SectionSkeleton = () => <Skeleton className="h-96 w-full" />;

export default async function Home() {
  return (
    <div className="flex flex-col">
        <AnimatedSection id="home"><Hero /></AnimatedSection>
        <AnimatedSection id="services">
          <Suspense fallback={<SectionSkeleton />}>
            <Services />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="skills">
          <Suspense fallback={<SectionSkeleton />}>
            <Skills />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="projects">
          <Suspense fallback={<SectionSkeleton />}>
            <Projects />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="experience">
           <Suspense fallback={<SectionSkeleton />}>
            <Experience />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="studies"><Education /></AnimatedSection>
        <AnimatedSection id="certifications">
           <Suspense fallback={<SectionSkeleton />}>
            <Certifications />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="testimonials"><Testimonials /></AnimatedSection>
        <AnimatedSection id="blog">
          <Suspense fallback={<SectionSkeleton />}>
            <Blog />
          </Suspense>
        </AnimatedSection>
        <AnimatedSection id="proposal"><ProposalGenerator /></AnimatedSection>
        <AnimatedSection id="contact"><Contact /></AnimatedSection>
    </div>
  );
}
