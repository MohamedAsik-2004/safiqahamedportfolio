import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SettingsTab: React.FC = () => {
  const { data, updateAdminPin, exportPortfolioData, importPortfolioData, resetToDefaults } = usePortfolio();
  const [newPin, setNewPin] = useState('');
  const [pinMessage, setPinMessage] = useState('');
  const [importStr, setImportStr] = useState('');
  const [importStatus, setImportStatus] = useState<'success' | 'error' | null>(null);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPin.trim()) return;
    updateAdminPin(newPin.trim());
    setPinMessage('Security PIN successfully updated!');
    setNewPin('');
    setTimeout(() => setPinMessage(''), 3000);
  };

  const handleExport = () => {
    const json = exportPortfolioData();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinematic_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!importStr.trim()) return;
    const ok = importPortfolioData(importStr);
    if (ok) {
      setImportStatus('success');
      setImportStr('');
    } else {
      setImportStatus('error');
    }
    setTimeout(() => setImportStatus(null), 4000);
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = importPortfolioData(content);
        if (ok) {
          setImportStatus('success');
        } else {
          setImportStatus('error');
        }
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (
      window.confirm(
        'WARNING: This action will purge all custom changes from local memory and revert to default hardcoded portfolio content. Proceed?'
      )
    ) {
      resetToDefaults();
      alert('Portfolio reset to default state.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#8C6D4F]/30 pb-4">
        <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          SECURITY & DATA BACKUP SETTINGS
        </h3>
        <p className="text-xs text-[#A8988B]">Configure passcode authentication, export JSON archives, or import full site state.</p>
      </div>

      {/* 1. Change PIN */}
      <div className="p-6 bg-black/60 border border-[#8C6D4F]/30 rounded-sm space-y-4">
        <h4 className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
          SECURITY PASSCODE (CURRENT PIN: <span className="font-mono">{data.adminPin || '1234'}</span>)
        </h4>

        {pinMessage && (
          <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37] text-[#D4AF37] text-xs font-medium rounded-xs">
            ✓ {pinMessage}
          </div>
        )}

        <form onSubmit={handlePinSubmit} className="flex gap-3 max-w-md">
          <input
            type="password"
            maxLength={10}
            placeholder="ENTER NEW PIN"
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            className="flex-grow bg-black border border-[#8C6D4F]/40 focus:border-[#D4AF37] px-3 py-2 text-xs text-white outline-none font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2 border border-[#D4AF37] bg-[#D4AF37] text-black text-xs font-semibold uppercase hover:bg-transparent hover:text-[#D4AF37]"
          >
            UPDATE PIN
          </button>
        </form>
      </div>

      {/* 2. JSON Backup & Restore */}
      <div className="p-6 bg-black/60 border border-[#8C6D4F]/30 rounded-sm space-y-6">
        <h4 className="text-sm font-semibold tracking-wider text-[#D4AF37] uppercase">
          DATA BACKUP & RESTORE ARCHIVE
        </h4>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <button
            onClick={handleExport}
            className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 text-xs font-semibold uppercase tracking-widest"
          >
            ⬇ EXPORT BACKUP (DOWNLOAD JSON)
          </button>

          <label className="px-6 py-3 border border-[#8C6D4F] text-[#EAD8C7] hover:border-[#D4AF37] text-xs font-semibold uppercase tracking-widest cursor-pointer">
            📁 IMPORT FROM FILE (.JSON)
            <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
          </label>
        </div>

        {importStatus === 'success' && (
          <div className="p-3 bg-green-900/30 border border-green-500 text-green-400 text-xs font-medium rounded-xs">
            ✓ PORTFOLIO DATA SUCCESSFULLY RESTORED FROM BACKUP!
          </div>
        )}

        {importStatus === 'error' && (
          <div className="p-3 bg-red-900/30 border border-red-500 text-red-400 text-xs font-medium rounded-xs">
            ✕ ERROR: INVALID JSON FORMAT. BACKUP RESTORE FAILED.
          </div>
        )}

        {/* Paste JSON string */}
        <form onSubmit={handleImport} className="space-y-3 pt-4 border-t border-[#8C6D4F]/20">
          <label className="block text-[10px] tracking-widest text-[#8C6D4F] uppercase font-semibold">
            OR PASTE BACKUP JSON CODE BELOW:
          </label>
          <textarea
            rows={4}
            value={importStr}
            onChange={(e) => setImportStr(e.target.value)}
            placeholder='{"hero": {...}, "projects": [...]}'
            className="w-full bg-black border border-[#8C6D4F]/30 focus:border-[#D4AF37] px-3 py-2 text-xs text-white font-mono outline-none resize-none"
          />
          <button
            type="submit"
            className="px-5 py-2 border border-[#8C6D4F] text-[#EAD8C7] text-xs font-semibold uppercase hover:border-[#D4AF37]"
          >
            APPLY JSON CODE RESTORE
          </button>
        </form>
      </div>

      {/* 3. Revert to Defaults */}
      <div className="p-6 bg-red-950/20 border border-red-900/50 rounded-sm space-y-3">
        <h4 className="text-sm font-semibold tracking-wider text-red-400 uppercase">
          DANGER ZONE: RESET TO FACTORY DEFAULTS
        </h4>
        <p className="text-xs text-[#A8988B] leading-relaxed">
          Wipe all custom modifications stored in your browser local storage and restore original template content.
        </p>
        <button
          onClick={handleReset}
          className="px-5 py-2 border border-red-800 bg-red-950/50 hover:bg-red-900 text-red-300 text-xs font-semibold uppercase tracking-widest transition-colors"
        >
          RESET ALL PORTFOLIO DATA
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
