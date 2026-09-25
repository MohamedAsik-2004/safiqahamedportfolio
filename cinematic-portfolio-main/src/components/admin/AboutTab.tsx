import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AboutTab: React.FC = () => {
  const { data, updateAbout } = usePortfolio();
  const [form, setForm] = useState(data.about);
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (field: keyof typeof form, val: any) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleFileUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange('aboutImageUrl', e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleStatChange = (index: number, field: 'value' | 'label', val: string) => {
    const updatedStats = [...form.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    setForm((prev) => ({ ...prev, stats: updatedStats }));
  };

  const addStat = () => {
    setForm((prev) => ({
      ...prev,
      stats: [...prev.stats, { value: '01+', label: 'New Metric' }],
    }));
  };

  const removeStat = (index: number) => {
    setForm((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateAbout(form);
    setSavedMessage('About section updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            ABOUT SECTION CONFIGURATION
          </h3>
          <p className="text-xs text-[#A8988B]">Manage biography narrative, portrait photo, and achievement metrics.</p>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold tracking-widest uppercase hover:bg-transparent hover:text-[#D4AF37] transition-all"
        >
          SAVE CHANGES
        </button>
      </div>

      {savedMessage && (
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
          ✓ {savedMessage}
        </div>
      )}

      {/* Profile Photo Upload Section */}
      <div className="p-5 bg-black/60 border border-[#D4AF37]/30 rounded-sm space-y-4">
        <h4 className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase border-b border-[#8C6D4F]/20 pb-2">
          PORTRAIT / PROFILE PHOTO ASSET
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">
              PORTRAIT PHOTO (UPLOAD OR ENTER URL)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={form.aboutImageUrl || ''}
                onChange={(e) => handleChange('aboutImageUrl', e.target.value)}
                placeholder="https://... or /images/about.png or Data URL"
                className="flex-grow bg-black/80 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
              />
              <label className="cursor-pointer px-4 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[10px] font-semibold tracking-wider uppercase transition-all rounded-xs whitespace-nowrap">
                📷 BROWSE PHOTO
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>

          {/* Photo Preview */}
          {form.aboutImageUrl && (
            <div className="relative rounded-xs overflow-hidden border border-[#8C6D4F]/40 bg-black/80 flex flex-col items-center justify-center p-2">
              <img src={form.aboutImageUrl} alt="Portrait preview" className="h-32 w-28 object-cover rounded-xs border border-[#8C6D4F]/30" />
              <button
                type="button"
                onClick={() => handleChange('aboutImageUrl', '')}
                className="mt-2 text-red-400 hover:text-red-300 text-[10px] tracking-wider uppercase font-medium"
              >
                REMOVE PHOTO ✕
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">EYEBROW TEXT</label>
          <input
            type="text"
            value={form.eyebrow}
            onChange={(e) => handleChange('eyebrow', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">BIO NAME / SIGNATURE</label>
          <input
            type="text"
            value={form.bioName}
            onChange={(e) => handleChange('bioName', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">HEADLINE LINE 1</label>
          <input
            type="text"
            value={form.headlineLine1}
            onChange={(e) => handleChange('headlineLine1', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">HEADLINE LINE 2</label>
          <input
            type="text"
            value={form.headlineLine2}
            onChange={(e) => handleChange('headlineLine2', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">BIO DESCRIPTION NARRATIVE</label>
          <textarea
            rows={5}
            value={form.bioDescription}
            onChange={(e) => handleChange('bioDescription', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs resize-none"
          />
        </div>
      </div>

      {/* Achievement Stats Section */}
      <div className="pt-6 border-t border-[#8C6D4F]/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">ACHIEVEMENT METRICS</h4>
          <button
            type="button"
            onClick={addStat}
            className="px-3 py-1 border border-[#8C6D4F]/50 text-[10px] tracking-widest text-[#EAD8C7] hover:border-[#D4AF37] uppercase"
          >
            + ADD STAT METRIC
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {form.stats.map((stat, idx) => (
            <div key={idx} className="p-3 bg-black/50 border border-[#8C6D4F]/20 flex items-center gap-3">
              <input
                type="text"
                value={stat.value}
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                placeholder="05+"
                className="w-20 bg-black border border-[#8C6D4F]/30 px-2 py-1 text-xs text-[#D4AF37] font-mono text-center outline-none"
              />
              <input
                type="text"
                value={stat.label}
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                placeholder="YEARS EXPERIENCE"
                className="flex-grow bg-black border border-[#8C6D4F]/30 px-2 py-1 text-xs text-white outline-none"
              />
              <button
                type="button"
                onClick={() => removeStat(idx)}
                className="text-red-400 hover:text-red-300 px-2 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};

export default AboutTab;
