import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Education } from "@/components/sections/education";
import { Certifications } from "@/components/sections/certifications";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { ProposalGenerator } from "@/components/sections/proposal-generator";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Education />
      <Certifications />
      <Projects />
      <Testimonials />
      <Blog />
      <ProposalGenerator />
      <Contact />
    </main>
  );
}
