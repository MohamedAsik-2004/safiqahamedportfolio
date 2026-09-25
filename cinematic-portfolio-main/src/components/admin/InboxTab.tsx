import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export const InboxTab: React.FC = () => {
  const { data, markMessageRead, deleteMessage } = usePortfolio();
  const messages = data.messages || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[#8C6D4F]/30 pb-4">
        <div>
          <h3 className="text-xl font-light text-white uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            VISITOR TRANSMISSIONS INBOX ({messages.filter((m) => !m.read).length} UNREAD)
          </h3>
          <p className="text-xs text-[#A8988B]">Review messages submitted by portfolio visitors through the contact form.</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-[#8C6D4F]/30 text-[#8C6D4F]">
          <span className="text-3xl block mb-2">📥</span>
          <p className="text-xs uppercase tracking-widest">NO TRANSMISSIONS RECEIVED YET.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-5 border rounded-sm transition-all ${
                msg.read
                  ? 'bg-black/40 border-[#8C6D4F]/20 opacity-75'
                  : 'bg-[#120F0C] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.1)]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-[#8C6D4F]/20 pb-3 mb-3">
                <div className="flex items-center space-x-3">
                  {!msg.read && (
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                  )}
                  <h4 className="text-sm font-semibold text-white uppercase">{msg.name}</h4>
                  <a href={`mailto:${msg.email}`} className="text-xs text-[#D4AF37] hover:underline font-mono">
                    &lt;{msg.email}&gt;
                  </a>
                </div>
                <span className="text-[10px] text-[#A8988B] font-mono">{msg.timestamp}</span>
              </div>

              <p className="text-xs text-[#D5CBC0] leading-relaxed mb-4 whitespace-pre-wrap font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {msg.message}
              </p>

              <div className="flex justify-end space-x-3 pt-2 border-t border-[#8C6D4F]/10">
                {!msg.read && (
                  <button
                    onClick={() => markMessageRead(msg.id)}
                    className="px-3 py-1 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[10px] tracking-widest text-[#D4AF37] uppercase"
                  >
                    MARK AS READ
                  </button>
                )}
                <button
                  onClick={() => deleteMessage(msg.id)}
                  className="px-3 py-1 border border-red-900/40 hover:border-red-500 text-[10px] tracking-widest text-red-400 uppercase"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InboxTab;
