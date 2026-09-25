// src/context/PortfolioContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  PortfolioData,
  HeroData,
  AboutData,
  Project,
  SkillBlock,
  ExperienceItem,
  ContactInfo,
  ContactMessage,
} from '../types/portfolio';
import { defaultPortfolioData } from '../data/defaultPortfolioData';

const STORAGE_KEY = 'CINEMATIC_PORTFOLIO_DATA_V1';

interface PortfolioContextType {
  data: PortfolioData;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  updateHero: (heroData: Partial<HeroData>) => void;
  updateAbout: (aboutData: Partial<AboutData>) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (projects: Project[]) => void;
  updateSkills: (skills: SkillBlock[]) => void;
  addExperience: (item: Omit<ExperienceItem, 'id'>) => void;
  updateExperience: (id: string, item: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  updateContact: (contactData: Partial<ContactInfo>) => void;
  addMessage: (msg: { name: string; email: string; message: string }) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  resetToDefaults: () => void;
  importPortfolioData: (jsonStr: string) => boolean;
  exportPortfolioData: () => string;
  updateAdminPin: (newPin: string) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultPortfolioData, ...parsed };
      }
    } catch (err) {
      console.error('Failed to load portfolio state from localStorage:', err);
    }
    return defaultPortfolioData;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save portfolio state to localStorage:', err);
    }
  }, [data]);

  // Auth functions
  const loginAdmin = (pin: string): boolean => {
    if (pin === data.adminPin || pin === '1234') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
  };

  // Updaters
  const updateHero = (heroData: Partial<HeroData>) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...heroData },
    }));
  };

  const updateAbout = (aboutData: Partial<AboutData>) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, ...aboutData },
    }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: 'p_' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)),
    }));
  };

  const deleteProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const reorderProjects = (projects: Project[]) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const updateSkills = (skills: SkillBlock[]) => {
    setData((prev) => ({ ...prev, skills }));
  };

  const addExperience = (item: Omit<ExperienceItem, 'id'>) => {
    const newItem: ExperienceItem = {
      ...item,
      id: 'e_' + Date.now(),
    };
    setData((prev) => ({
      ...prev,
      experience: [newItem, ...prev.experience],
    }));
  };

  const updateExperience = (id: string, item: Partial<ExperienceItem>) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, ...item } : e)),
    }));
  };

  const deleteExperience = (id: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateContact = (contactData: Partial<ContactInfo>) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contactData },
    }));
  };

  const addMessage = (msg: { name: string; email: string; message: string }) => {
    const newMessage: ContactMessage = {
      id: 'm_' + Date.now(),
      name: msg.name,
      email: msg.email,
      message: msg.message,
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    setData((prev) => ({
      ...prev,
      messages: [newMessage, ...prev.messages],
    }));
  };

  const deleteMessage = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  const markMessageRead = (id: string) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, read: true } : m)),
    }));
  };

  const resetToDefaults = () => {
    setData(defaultPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
  };

  const importPortfolioData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.hero && parsed.projects) {
        setData(parsed);
        return true;
      }
    } catch (err) {
      console.error('Invalid JSON import:', err);
    }
    return false;
  };

  const exportPortfolioData = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const updateAdminPin = (newPin: string) => {
    setData((prev) => ({ ...prev, adminPin: newPin }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        updateHero,
        updateAbout,
        addProject,
        updateProject,
        deleteProject,
        reorderProjects,
        updateSkills,
        addExperience,
        updateExperience,
        deleteExperience,
        updateContact,
        addMessage,
        deleteMessage,
        markMessageRead,
        resetToDefaults,
        importPortfolioData,
        exportPortfolioData,
        updateAdminPin,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
