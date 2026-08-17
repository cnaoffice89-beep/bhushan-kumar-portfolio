import { Navigation, Footer } from "@/components/layout";
import {
  Hero,
  About,
  Automation,
  Development,
  Experience,
  Projects,
  Services,
  Certifications,
  Explore,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Automation />
        <Development />
        <Experience />
        <Projects />
        <Services />
        <Certifications />
        <Explore />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
