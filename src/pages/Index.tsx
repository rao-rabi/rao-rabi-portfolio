import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Work } from "@/components/portfolio/Work";
import { Experience } from "@/components/portfolio/Experience";
import { Skills } from "@/components/portfolio/Skills";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    document.title = "Rao Rabi Khan — Software Engineer & Web/Mobile Architect";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Rao Muhammad Rabi Khan — Senior Software Engineer building scalable React, Next.js, React Native and AI products. 4+ years shipping to thousands of users."
    );
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Work />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
