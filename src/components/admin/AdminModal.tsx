import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminGate } from './AdminGate';
import { HeroTab } from './HeroTab';
import { AboutTab } from './AboutTab';
import { ProjectsTab } from './ProjectsTab';
import { SkillsTab } from './SkillsTab';
import { ExperienceTab } from './ExperienceTab';
import { ContactTab } from './ContactTab';
import { InboxTab } from './InboxTab';
import { SettingsTab } from './SettingsTab';

type AdminTab = 'hero' | 'about' | 'projects' | 'skills' | 'experience' | 'contact' | 'inbox' | 'settings';

export const AdminModal: React.FC = () => {
  const { data, isAdminOpen, setIsAdminOpen, isAuthenticated, logoutAdmin } = usePortfolio();
  const [activeTab, setActiveTab] = useState<AdminTab>('hero');

  if (!isAdminOpen) return null;

  const unreadCount = (data.messages || []).filter((m) => !m.read).length;

  const tabs: { id: AdminTab; label: string; badge?: number }[] = [
    { id: 'hero', label: 'HERO' },
    { id: 'about', label: 'ABOUT' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'contact', label: 'CONTACT' },
    { id: 'inbox', label: 'INBOX', badge: unreadCount },
    { id: 'settings', label: 'SETTINGS & BACKUP' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-6 lg:p-8"
        onClick={() => setIsAdminOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[85vh] bg-[#0E0C0A] border border-[#D4AF37]/50 rounded-sm shadow-[0_0_50px_rgba(212,175,55,0.15)] flex flex-col overflow-hidden"
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#8C6D4F]/30 bg-[#14110E]">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse" />
              <h2 className="text-xl font-light tracking-wider text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                PORTFOLIO <span className="text-[#D4AF37]">CONTROL PANEL</span>
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <button
                  onClick={logoutAdmin}
                  className="px-3 py-1 border border-[#8C6D4F]/40 hover:border-red-500 text-xs text-[#A8988B] hover:text-red-400 uppercase tracking-widest transition-colors"
                >
                  LOCK / LOGOUT
                </button>
              )}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-[#8C6D4F]/30 hover:border-[#D4AF37] text-lg text-[#A8988B] hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          {!isAuthenticated ? (
            <div className="flex-grow flex items-center justify-center">
              <AdminGate />
            </div>
          ) : (
            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
              {/* Sidebar Tabs */}
              <div className="w-full md:w-56 bg-[#120F0C] border-b md:border-b-0 md:border-r border-[#8C6D4F]/30 flex md:flex-col overflow-x-auto md:overflow-y-auto p-2 gap-1 flex-shrink-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-between w-full px-4 py-3 text-xs tracking-[0.2em] font-medium uppercase text-left transition-all rounded-xs border ${
                      activeTab === tab.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]'
                        : 'border-transparent hover:border-[#8C6D4F]/30 text-[#A8988B] hover:text-white'
                    }`}
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span>{tab.label}</span>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-[#D4AF37] text-black font-bold rounded-full">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Tab Panel */}
              <div className="flex-grow p-6 sm:p-8 overflow-y-auto bg-[#0E0C0A]">
                {activeTab === 'hero' && <HeroTab />}
                {activeTab === 'about' && <AboutTab />}
                {activeTab === 'projects' && <ProjectsTab />}
                {activeTab === 'skills' && <SkillsTab />}
                {activeTab === 'experience' && <ExperienceTab />}
                {activeTab === 'contact' && <ContactTab />}
                {activeTab === 'inbox' && <InboxTab />}
                {activeTab === 'settings' && <SettingsTab />}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AdminModal;
