import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';

export const ContactSection: React.FC = () => {
  const { data, addMessage } = usePortfolio();
  const contact = data.contact || {};

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setLoading(true);
    setTimeout(() => {
      addMessage(formState);
      setLoading(false);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
    }, 600);
  };

  // Format socials array
  const socialList = Array.isArray(contact.socials)
    ? contact.socials
    : Object.entries(contact.socials || {}).map(([key, val]) => ({
        name: key.toUpperCase(),
        url: val as string,
      }));

  return (
    <section id="contact" className="relative w-screen min-h-screen bg-black text-[#E8DFD8] font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center space-x-4 mb-4">
            <span className="text-[11px] font-medium tracking-[0.35em] uppercase text-[#D4AF37]">
              COMMUNICATION CHANNEL
            </span>
            <div className="w-16 h-[1px] bg-[#D4AF37]/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light uppercase tracking-tight text-white" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            INITIATE <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#8C6D4F]">DIALOGUE</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Info Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <p className="text-sm text-[#A8988B] leading-relaxed font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {contact.heading || contact.description}
            </p>

            <div className="space-y-6 pt-4 border-t border-[#8C6D4F]/20">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-sm bg-[#120F0C] border border-[#8C6D4F]/30 flex items-center justify-center text-[#D4AF37]">
                  ✉
                </div>
                <div>
                  <span className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">EMAIL</span>
                  <a href={`mailto:${contact.email}`} className="text-sm text-white hover:text-[#D4AF37] transition-colors">
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-sm bg-[#120F0C] border border-[#8C6D4F]/30 flex items-center justify-center text-[#D4AF37]">
                  📍
                </div>
                <div>
                  <span className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">LOCATION</span>
                  <span className="text-sm text-white">{contact.location || 'India'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-sm bg-[#120F0C] border border-[#8C6D4F]/30 flex items-center justify-center text-[#D4AF37]">
                  ●
                </div>
                <div>
                  <span className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">STATUS</span>
                  <span className="text-xs text-[#D4AF37] font-medium tracking-wider uppercase">{contact.availabilityStatus || 'Available for projects'}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6">
              <span className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold mb-4">SOCIAL DIRECTORY</span>
              <div className="flex flex-wrap gap-3">
                {socialList.map((social: any, sIdx: number) => (
                  <a
                    key={sIdx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-[#8C6D4F]/30 hover:border-[#D4AF37] text-xs text-[#EAD8C7] hover:text-white bg-[#120F0C]/80 transition-all rounded-xs uppercase tracking-wider"
                  >
                    {social.name} ↗
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Form Column (7 Cols) */}
          <div className="lg:col-span-7 bg-[#120F0C]/80 border border-[#8C6D4F]/30 hover:border-[#D4AF37]/60 p-8 sm:p-10 rounded-sm backdrop-blur-xl transition-all duration-500 shadow-2xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-3xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs text-[#A8988B] max-w-md mx-auto leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Thank you for reaching out. Your message has been safely logged in the admin queue and I will respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 border border-[#8C6D4F] text-xs font-semibold tracking-widest text-[#EAD8C7] uppercase hover:border-[#D4AF37] hover:text-white transition-all"
                >
                  SEND ANOTHER TRANSMISSION
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] font-medium text-[#8C6D4F] uppercase mb-2">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-black/60 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-4 py-3 text-xs text-white placeholder-[#8C6D4F]/50 outline-none transition-colors rounded-xs"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] font-medium text-[#8C6D4F] uppercase mb-2">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-black/60 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-4 py-3 text-xs text-white placeholder-[#8C6D4F]/50 outline-none transition-colors rounded-xs"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] font-medium text-[#8C6D4F] uppercase mb-2">
                    TRANSMISSION MESSAGE
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Write your project details or inquiries here..."
                    className="w-full bg-black/60 border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-4 py-3 text-xs text-white placeholder-[#8C6D4F]/50 outline-none transition-colors rounded-xs resize-none"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-transparent hover:text-[#D4AF37] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {loading ? 'TRANSMITTING...' : 'SEND MESSAGE ↗'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Footer info */}
        <div className="mt-24 pt-8 border-t border-[#8C6D4F]/20 flex flex-col sm:flex-row items-center justify-between text-[10px] tracking-widest text-[#8C6D4F] uppercase">
          <span>© {new Date().getFullYear()} {data.hero?.name || 'PORTFOLIO'}. ALL RIGHTS RESERVED.</span>
          <span>CINEMATIC ARCHITECTURE V2.0</span>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;