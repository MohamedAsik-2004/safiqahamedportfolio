import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsSection: React.FC = () => {
  const { data } = usePortfolio();
  const skills = data.skills || [];

  return (
    <section id="skills" className="relative w-screen min-h-screen bg-black text-[#E8DFD8] font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]">
                TECHNICAL CAPABILITIES
              </span>
              <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
            </div>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              SKILLS & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8C6D4F]">EXPERTISE</span>
            </h2>
          </div>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((block, idx) => {
            const categoryName = block.category || block.title || 'CATEGORY';
            const icon = block.icon || '❖';
            const rawItems: any[] = block.items || [];

            return (
              <motion.div
                key={block.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-[#120F0C]/80 border border-[#8C6D4F]/30 hover:border-[#D4AF37]/80 p-6 sm:p-8 rounded-sm backdrop-blur-md transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl text-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity">
                      {icon}
                    </span>
                    <span className="text-[10px] font-semibold tracking-widest text-[#8C6D4F]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-medium uppercase text-white mb-6 tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {categoryName}
                  </h3>

                  <div className="space-y-4">
                    {rawItems.map((item, sIdx) => {
                      const name = typeof item === 'string' ? item : item.name;
                      const level = typeof item === 'object' && item !== null && 'level' in item ? item.level : null;

                      return (
                        <div key={sIdx} className="group/skill">
                          <div className="flex justify-between items-center text-xs mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                            <span className="text-[#EAD8C7] group-hover/skill:text-white transition-colors">{name}</span>
                            {level !== null && level !== undefined && (
                              <span className="text-[10px] text-[#D4AF37] font-mono">{level}%</span>
                            )}
                          </div>
                          {level !== null && level !== undefined && (
                            <div className="w-full h-1 bg-[#8C6D4F]/20 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 + sIdx * 0.05 }}
                                className="h-full bg-gradient-to-r from-[#8C6D4F] to-[#D4AF37]"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#8C6D4F]/20 flex items-center justify-between text-[9px] tracking-widest uppercase text-[#8C6D4F] group-hover:text-[#D4AF37] transition-colors">
                  <span>MASTERED TECH</span>
                  <span>◆</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;