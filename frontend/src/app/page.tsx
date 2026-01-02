import { Hero } from "@/components/sections/hero";
import dynamic from "next/dynamic";

// Lazy load non-critical sections to speed up initial load
const About = dynamic(() => import("@/components/sections/about").then(mod => mod.About));
const Services = dynamic(() => import("@/components/sections/services").then(mod => mod.Services));
const Projects = dynamic(() => import("@/components/sections/projects").then(mod => mod.Projects));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}
