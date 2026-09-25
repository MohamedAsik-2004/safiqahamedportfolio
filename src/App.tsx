import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { AdminModal } from './components/admin/AdminModal';

export const App: React.FC = () => {
  return (
    <PortfolioProvider>
      <div className="relative min-h-screen bg-black text-[#E8DFD8] overflow-x-hidden selection:bg-[#cbb59d] selection:text-black">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
        <AdminModal />
      </div>
    </PortfolioProvider>
  );
};

export default App;