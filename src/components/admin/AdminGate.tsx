import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const AdminGate: React.FC = () => {
  const { loginAdmin, setIsAdminOpen } = usePortfolio();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pin);
    if (success) {
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mb-6 text-2xl shadow-[0_0_20px_rgba(212,175,55,0.2)]">
        🔐
      </div>

      <h2 className="text-3xl font-light text-white uppercase tracking-wider mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        ADMINISTRATOR AUTHENTICATION
      </h2>
      <p className="text-xs text-[#A8988B] max-w-sm mb-6 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
        Enter your administrative security PIN to unlock full portfolio editing capabilities.
      </p>

      <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
        <div>
          <input
            type="password"
            autoFocus
            maxLength={10}
            placeholder="ENTER PIN (Default: 1234)"
            value={pin}
            onChange={(e) => {
              setPin(e.target.value);
              setError(false);
            }}
            className={`w-full bg-black/80 border ${
              error ? 'border-red-500' : 'border-[#8C6D4F]/50 focus:border-[#D4AF37]'
            } text-center text-lg tracking-[0.3em] font-mono text-white px-4 py-3 outline-none rounded-xs transition-colors`}
          />
          {error && (
            <span className="text-[10px] text-red-400 mt-2 block tracking-widest uppercase">
              INVALID SECURITY PIN. ACCESS DENIED.
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="w-1/2 py-3 border border-[#8C6D4F]/40 text-[#A8988B] hover:text-white text-xs font-semibold tracking-widest uppercase transition-all"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="w-1/2 py-3 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold tracking-widest uppercase hover:bg-transparent hover:text-[#D4AF37] transition-all shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          >
            UNLOCK
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminGate;
