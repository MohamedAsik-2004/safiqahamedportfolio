import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactTab: React.FC = () => {
  const { data, updateContact } = usePortfolio();
  const [form, setForm] = useState(data.contact || {
    email: '',
    location: '',
    availabilityStatus: '',
    heading: '',
    socials: []
  });
  const [savedMsg, setSavedMsg] = useState('');

  // Keep local form in sync with global portfolio context
  useEffect(() => {
    if (data.contact) {
      setForm(data.contact);
    }
  }, [data.contact]);

  const handleChange = (field: keyof typeof form, val: any) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const socialsList = Array.isArray(form.socials)
    ? form.socials
    : Object.entries(form.socials || {}).map(([name, url]) => ({ name, url: url as string }));

  const handleSocialChange = (index: number, field: 'name' | 'url', val: string) => {
    const updatedSocials = [...socialsList];
    updatedSocials[index] = { ...updatedSocials[index], [field]: val };
    setForm((prev) => ({ ...prev, socials: updatedSocials }));
  };

  const addSocial = () => {
    const updatedSocials = [...socialsList, { name: 'GitHub', url: 'https://github.com' }];
    setForm((prev) => ({ ...prev, socials: updatedSocials }));
  };

  const removeSocial = (index: number) => {
    const updatedSocials = socialsList.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, socials: updatedSocials }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact({
      ...form,
      socials: socialsList
    });
    setSavedMsg('Contact & Social information updated successfully!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            CONTACT & SOCIAL CONFIGURATION
          </h3>
          <p className="text-xs text-[#A8988B]">Manage contact email, location, status, and social directory links.</p>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37] transition-all"
        >
          SAVE CHANGES
        </button>
      </div>

      {savedMsg && (
        <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
          ✓ {savedMsg}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
            PRIMARY EMAIL ADDRESS
          </label>
          <input
            type="email"
            required
            value={form.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
            CURRENT LOCATION
          </label>
          <input
            type="text"
            value={form.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="City, Country"
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
            AVAILABILITY STATUS
          </label>
          <input
            type="text"
            value={form.availabilityStatus || ''}
            onChange={(e) => handleChange('availabilityStatus', e.target.value)}
            placeholder="Available for Projects"
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none rounded-xs"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-1">
            SECTION HEADING / CALLOUT NARRATIVE
          </label>
          <textarea
            rows={3}
            value={form.heading || ''}
            onChange={(e) => handleChange('heading', e.target.value)}
            placeholder="Have an ambitious system to architect..."
            className="w-full bg-black/70 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none resize-none rounded-xs"
          />
        </div>
      </div>

      {/* Socials */}
      <div className="pt-6 border-t border-[#8C6D4F]/30">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">SOCIAL DIRECTORY LINKS</h4>
          <button
            type="button"
            onClick={addSocial}
            className="px-3 py-1 border border-[#8C6D4F]/50 text-[10px] tracking-widest text-[#EAD8C7] hover:border-[#D4AF37] uppercase rounded-xs"
          >
            + ADD SOCIAL LINK
          </button>
        </div>

        <div className="space-y-3">
          {socialsList.map((social, idx) => (
            <div key={idx} className="p-3 bg-black/50 border border-[#8C6D4F]/20 flex items-center gap-3 rounded-xs">
              <input
                type="text"
                value={social.name || ''}
                onChange={(e) => handleSocialChange(idx, 'name', e.target.value)}
                placeholder="Platform (e.g. GitHub)"
                className="w-36 bg-black border border-[#8C6D4F]/30 px-2 py-1 text-xs text-white outline-none rounded-xs"
              />
              <input
                type="text"
                value={social.url || ''}
                onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                placeholder="https://github.com/username"
                className="flex-grow bg-black border border-[#8C6D4F]/30 px-2 py-1 text-xs text-[#D4AF37] outline-none rounded-xs"
              />
              <button
                type="button"
                onClick={() => removeSocial(idx)}
                className="text-red-400 hover:text-red-300 text-xs px-2"
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

export default ContactTab;
