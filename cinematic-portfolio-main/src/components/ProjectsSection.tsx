import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../types/portfolio';
import { usePortfolio } from '../context/PortfolioContext';

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const projects: Project[] = data.projects;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', ...Array.from(new Set(projects.map((p) => (p.category || 'WORK').toUpperCase())))];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p) => (p.category || 'WORK').toUpperCase() === activeCategory);

  return (
    <section id="work" className="relative w-screen min-h-screen bg-black text-[#E8DFD8] font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#8C6D4F]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]">
                FEATURED ARCHIVE
              </span>
              <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8C6D4F]">WORKS</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] tracking-[0.2em] font-medium uppercase transition-all duration-300 rounded-sm border ${
                  activeCategory === cat
                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                    : 'border-[#8C6D4F]/30 hover:border-[#8C6D4F] text-[#A8988B] hover:text-white'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            const tags = project.tags || project.tech || [];
            const year = project.year || '2026';
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="group relative bg-[#120F0C]/80 border border-[#8C6D4F]/30 rounded-sm overflow-hidden cursor-pointer hover:border-[#D4AF37] transition-all duration-500 shadow-xl flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={project.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
                    alt={project.title}
                    className="w-full h-full object-cover filter brightness-[0.88] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120F0C] via-transparent to-transparent opacity-80" />
                  
                  {/* Year & Category Tag */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className="px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase bg-black/70 border border-[#D4AF37]/40 text-[#D4AF37] backdrop-blur-md rounded-xs">
                      {project.category}
                    </span>
                    <span className="px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase bg-black/70 border border-[#8C6D4F]/30 text-[#A8988B] backdrop-blur-md rounded-xs">
                      {year}
                    </span>
                  </div>
                </div>

                {/* Card Footer Content */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <h3 className="text-2xl font-normal text-white uppercase mb-2 group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      {project.title}
                    </h3>
                    <p className="text-xs font-light text-[#A8988B] line-clamp-2 leading-relaxed mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {project.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech stack badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tags.slice(0, 4).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[9px] font-medium tracking-wider text-[#C4B5A5] bg-[#8C6D4F]/10 px-2 py-0.5 rounded-xs border border-[#8C6D4F]/20">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#8C6D4F]/20 text-[10px] tracking-[0.2em] font-medium text-[#D4AF37] group-hover:text-white uppercase">
                      <span>VIEW CASE DETAILS</span>
                      <span className="transform transition-transform group-hover:translate-x-1">↗</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Modal Case Study */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#120F0C] border border-[#D4AF37]/50 p-6 sm:p-10 rounded-sm shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 text-2xl text-[#A8988B] hover:text-white transition-colors"
              >
                ✕
              </button>

              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37]">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-[#A8988B] tracking-widest uppercase">
                  {selectedProject.year || '2026'}
                </span>
              </div>

              <h2 className="text-4xl sm:text-5xl font-light text-white uppercase mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                {selectedProject.title}
              </h2>

              <img
                src={selectedProject.imageUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
                alt={selectedProject.title}
                className="w-full h-64 sm:h-96 object-cover rounded-sm mb-6 border border-[#8C6D4F]/30"
              />

              <p className="text-sm text-[#D5CBC0] leading-relaxed mb-6" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase mb-2">TECHNOLOGY STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedProject.tags || selectedProject.tech || []).map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs text-[#EAD8C7] bg-[#8C6D4F]/20 border border-[#8C6D4F]/40 px-3 py-1 rounded-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#8C6D4F]/30">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold tracking-widest uppercase hover:bg-transparent hover:text-[#D4AF37] transition-all"
                  >
                    LAUNCH LIVE DEMO ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-[#8C6D4F] text-[#EAD8C7] text-xs font-semibold tracking-widest uppercase hover:border-[#D4AF37] hover:text-white transition-all"
                  >
                    VIEW REPOSITORY ↗
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default ProjectsSection;