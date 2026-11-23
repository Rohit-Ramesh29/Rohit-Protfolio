import { MotionConfig } from 'framer-motion';
import { AnimatedBackground, BackToTop, CursorGlow, ScrollProgress } from './components/layout/Effects';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { DataAnalytics } from './components/sections/DataAnalytics';
import { Education } from './components/sections/Education';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { QualityAssurance } from './components/sections/QualityAssurance';
import { Skills } from './components/sections/Skills';
import { ToastProvider } from './components/ui/Toast';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <AnimatedBackground />
        <CursorGlow />
        <ScrollProgress />
        <Navbar />
        <main id="main" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <QualityAssurance />
          <DataAnalytics />
          <Education />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </ToastProvider>
    </MotionConfig>
  );
}
