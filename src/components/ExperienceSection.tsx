import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const ExperienceSection: React.FC = () => {
  const { data } = usePortfolio();
  const experience = data.experience || [];

  return (
    <section id="experience" className="relative w-screen min-h-screen bg-black text-[#E8DFD8] font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/4 left-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]">
              CAREER TIMELINE
            </span>
            <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            PROFESSIONAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8C6D4F]">JOURNEY</span>
          </h2>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-[#8C6D4F]/30 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experience.map((item, idx) => {
            const roleName = item.role || item.title || 'ROLE';
            const companyName = item.company || item.organization || 'ORGANIZATION';
            const periodStr = item.period || item.year || 'TIMELINE';
            const locationStr = item.location || 'GLOBAL';

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Timeline Dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-[#120F0C] border-2 border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:scale-125 transition-all duration-300 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

                {/* Card Container */}
                <div className="bg-[#120F0C]/80 border border-[#8C6D4F]/30 hover:border-[#D4AF37] p-6 sm:p-8 rounded-sm backdrop-blur-md transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-medium text-white uppercase tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {roleName}
                      </h3>
                      <div className="text-sm text-[#D4AF37] font-light tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {companyName} <span className="text-[#8C6D4F]">•</span> <span className="text-[#A8988B]">{locationStr}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-[10px] font-semibold tracking-widest uppercase bg-[#8C6D4F]/10 border border-[#8C6D4F]/30 text-[#EAD8C7] rounded-xs self-start sm:self-auto">
                      {periodStr}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#A8988B] leading-relaxed mb-6 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.description}
                  </p>

                  {/* Highlights */}
                  {item.highlights && item.highlights.length > 0 && (
                    <div className="space-y-2 mb-6">
                      {item.highlights.map((h: string, hIdx: number) => (
                        <div key={hIdx} className="flex items-start space-x-2 text-xs text-[#D5CBC0]">
                          <span className="text-[#D4AF37] text-xs">◆</span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#8C6D4F]/20">
                      {item.technologies.map((tech: string, tIdx: number) => (
                        <span key={tIdx} className="text-[9px] font-medium tracking-wider text-[#C4B5A5] bg-[#8C6D4F]/10 px-2.5 py-0.5 rounded-xs border border-[#8C6D4F]/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;