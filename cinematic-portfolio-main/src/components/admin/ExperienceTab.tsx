import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import type { ExperienceItem } from '../../types/portfolio';

const emptyExperience: Omit<ExperienceItem, 'id'> = {
  role: '',
  company: '',
  period: '',
  location: '',
  description: '',
  highlights: [],
  technologies: [],
};

export const ExperienceTab: React.FC = () => {
  const { data, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [form, setForm] = useState<Omit<ExperienceItem, 'id'>>(emptyExperience);
  const [highlightsInput, setHighlightsInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [savedMsg, setSavedMsg] = useState('');

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setIsAdding(false);
    setForm({
      role: item.role || item.title || '',
      company: item.company || item.organization || '',
      period: item.period || item.year || '',
      location: item.location || '',
      description: item.description || '',
      highlights: item.highlights || [],
      technologies: item.technologies || [],
    });
    setHighlightsInput((item.highlights || []).join('\n'));
    setTechInput((item.technologies || []).join(', '));
  };

  const startAdd = () => {
    setEditingId(null);
    setIsAdding(true);
    setForm(emptyExperience);
    setHighlightsInput('');
    setTechInput('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    setForm(emptyExperience);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedHighlights = highlightsInput
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    const parsedTech = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const itemData = {
      ...form,
      highlights: parsedHighlights,
      technologies: parsedTech,
    };

    if (isAdding) {
      addExperience(itemData);
      setSavedMsg('New experience added!');
    } else if (editingId) {
      updateExperience(editingId, itemData);
      setSavedMsg('Experience updated!');
    }

    cancelEdit();
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleDelete = (id: string, role: string) => {
    if (window.confirm(`Delete experience entry "${role}"?`)) {
      deleteExperience(id);
      setSavedMsg(`Experience entry removed.`);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            CAREER TIMELINE MANAGER
          </h3>
          <p className="text-xs text-[#A8988B]">Manage work history, company roles, and technical achievements.</p>
        </div>
        {!isAdding && !editingId && (
          <button
            onClick={startAdd}
            className="px-5 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37]"
          >
            + ADD EXPERIENCE
          </button>
        )}
      </div>

      {savedMsg && (
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
          ✓ {savedMsg}
        </div>
      )}

      {(isAdding || editingId) && (
        <form onSubmit={handleSave} className="p-6 bg-black/80 border border-[#D4AF37]/50 rounded-sm space-y-4">
          <div className="flex justify-between items-center border-b border-[#8C6D4F]/30 pb-3">
            <h4 className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
              {isAdding ? 'ADD CAREER POSITION' : 'EDIT POSITION DETAILS'}
            </h4>
            <button type="button" onClick={cancelEdit} className="text-xs text-[#A8988B] hover:text-white">
              CANCEL ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                ROLE TITLE *
              </label>
              <input
                type="text"
                required
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                COMPANY NAME *
              </label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                TIME PERIOD
              </label>
              <input
                type="text"
                value={form.period}
                onChange={(e) => setForm({ ...form, period: e.target.value })}
                placeholder="2022 - PRESENT"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                LOCATION
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="SAN FRANCISCO, CA"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                OVERVIEW DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                KEY ACHIEVEMENTS (One per line)
              </label>
              <textarea
                rows={3}
                value={highlightsInput}
                onChange={(e) => setHighlightsInput(e.target.value)}
                placeholder="Architected micro-frontend pipeline&#10;Reduced latency by 45%"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
                TECHNOLOGIES USED (Comma Separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, TypeScript, GraphQL"
                className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-[#8C6D4F]/30">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2 border border-[#8C6D4F]/40 text-[#A8988B] text-xs font-semibold uppercase hover:text-white"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-6 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37]"
            >
              SAVE POSITION
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="space-y-4">
        {data.experience.map((item: any) => {
          const roleTitle = item.role || item.title || 'ROLE';
          const compName = item.company || item.organization || 'ORGANIZATION';
          const periodStr = item.period || item.year || '';

          return (
            <div
              key={item.id}
              className="p-4 bg-black/60 border border-[#8C6D4F]/30 hover:border-[#D4AF37]/50 rounded-sm flex items-center justify-between gap-4 transition-colors"
            >
              <div>
                <h4 className="text-base font-medium text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  {roleTitle} <span className="text-[#D4AF37]">@ {compName}</span>
                </h4>
                <div className="flex items-center space-x-2 text-[10px] text-[#A8988B]">
                  <span>{periodStr}</span>
                  {item.location && <span>• {item.location}</span>}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => startEdit(item)}
                  className="px-3 py-1.5 border border-[#8C6D4F]/40 hover:border-[#D4AF37] text-[#EAD8C7] text-xs uppercase"
                >
                  EDIT
                </button>
                <button
                  onClick={() => handleDelete(item.id, roleTitle)}
                  className="px-3 py-1.5 border border-red-900/50 hover:border-red-500 text-red-400 text-xs uppercase"
                >
                  DELETE
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExperienceTab;
