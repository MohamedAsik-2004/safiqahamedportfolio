import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const HeroTab: React.FC = () => {
  const { data, updateHero } = usePortfolio();
  const [form, setForm] = useState(data.hero);
  const [savedMessage, setSavedMessage] = useState('');

  const handleChange = (field: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleFileUpload = (file: File, field: 'heroVideoUrl' | 'watermarkUrl') => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleChange(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(form);
    setSavedMessage('Hero section updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            HERO SECTION CONFIGURATION
          </h3>
          <p className="text-xs text-[#A8988B]">Manage main landing header, video/image media, headlines, and call-to-actions.</p>
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

      {/* Media Upload Section */}
      <div className="p-5 bg-black/60 border border-[#D4AF37]/30 rounded-sm space-y-4">
        <h4 className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase border-b border-[#8C6D4F]/20 pb-2">
          HERO MEDIA ASSETS (VIDEO & WATERMARK PHOTO)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hero Video Upload & URL */}
          <div className="space-y-2">
            <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">
              HERO BACKGROUND VIDEO (UPLOAD OR URL)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={form.heroVideoUrl || ''}
                onChange={(e) => handleChange('heroVideoUrl', e.target.value)}
                placeholder="/videos/hero.mp4 or Data URL..."
                className="flex-grow bg-black/80 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
              />
              <label className="cursor-pointer px-3 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[10px] font-semibold tracking-wider uppercase transition-all rounded-xs whitespace-nowrap">
                📁 BROWSE VIDEO
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'heroVideoUrl')}
                />
              </label>
            </div>

            {/* Video Preview */}
            {form.heroVideoUrl && (
              <div className="mt-2 relative rounded-xs overflow-hidden border border-[#8C6D4F]/40 aspect-video bg-black/80 max-h-36">
                <video src={form.heroVideoUrl} controls className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleChange('heroVideoUrl', '')}
                  className="absolute top-2 right-2 bg-black/80 text-red-400 hover:text-red-300 text-xs px-2 py-0.5 border border-red-900/50 rounded-xs"
                >
                  REMOVE ✕
                </button>
              </div>
            )}
          </div>

          {/* Watermark / Background Image Upload */}
          <div className="space-y-2">
            <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">
              HERO WATERMARK / OVERLAY IMAGE (UPLOAD OR URL)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={form.watermarkUrl || ''}
                onChange={(e) => handleChange('watermarkUrl', e.target.value)}
                placeholder="/assets/watermark.png or Data URL..."
                className="flex-grow bg-black/80 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
              />
              <label className="cursor-pointer px-3 py-2 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black text-[10px] font-semibold tracking-wider uppercase transition-all rounded-xs whitespace-nowrap">
                📷 BROWSE IMAGE
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'watermarkUrl')}
                />
              </label>
            </div>

            {/* Image Preview */}
            {form.watermarkUrl && (
              <div className="mt-2 relative rounded-xs overflow-hidden border border-[#8C6D4F]/40 max-h-36 bg-black/80 flex items-center justify-center p-2">
                <img src={form.watermarkUrl} alt="Watermark preview" className="max-h-32 object-contain" />
                <button
                  type="button"
                  onClick={() => handleChange('watermarkUrl', '')}
                  className="absolute top-2 right-2 bg-black/80 text-red-400 hover:text-red-300 text-xs px-2 py-0.5 border border-red-900/50 rounded-xs"
                >
                  REMOVE ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">BRAND NAME</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">SUBTITLE / ROLES</label>
          <input
            type="text"
            value={form.rolesText}
            onChange={(e) => handleChange('rolesText', e.target.value)}
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
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">HEADLINE LINE 3</label>
          <input
            type="text"
            value={form.headlineLine3}
            onChange={(e) => handleChange('headlineLine3', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">DESCRIPTION PARAGRAPH 1</label>
          <textarea
            rows={3}
            value={form.descriptionParagraph1}
            onChange={(e) => handleChange('descriptionParagraph1', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs resize-none"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">DESCRIPTION PARAGRAPH 2</label>
          <textarea
            rows={3}
            value={form.descriptionParagraph2}
            onChange={(e) => handleChange('descriptionParagraph2', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs resize-none"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">RESUME URL / FILE PATH</label>
          <input
            type="text"
            value={form.resumeUrl || ''}
            onChange={(e) => handleChange('resumeUrl', e.target.value)}
            placeholder="/resume.pdf or https://..."
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">QUOTE TITLE</label>
          <input
            type="text"
            value={form.quoteTitle || ''}
            onChange={(e) => handleChange('quoteTitle', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">QUOTE SUBTITLE</label>
          <input
            type="text"
            value={form.quoteSubtitle || ''}
            onChange={(e) => handleChange('quoteSubtitle', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>
      </div>
    </form>
  );
};

export default HeroTab;
