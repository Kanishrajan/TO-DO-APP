import { useEffect } from 'react';
import { X } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        id="about-manifesto-modal"
        role="dialog"
        aria-modal="true"
        className="w-full max-w-xl bg-white border-3 border-[#111111] brutal-shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#B6FF00] border border-[#111111]" />
            <h2 className="font-display text-xl sm:text-2xl text-[#111111] uppercase tracking-tight">
              DESIGN MANIFESTO
            </h2>
          </div>
          <button
            id="close-about-btn"
            onClick={onClose}
            aria-label="Close manifesto"
            className="w-8 h-8 flex items-center justify-center border-2 border-[#111111] bg-white hover:bg-[#FF3B30] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-[#111111]">
          <div>
            <h3 className="font-display text-lg tracking-tight uppercase mb-2">
              FOCUSLIST // SYSTEM 01
            </h3>
            <p className="font-body text-sm leading-relaxed text-[#111111]/80 font-medium">
              An experimental digital product merging Swiss/Bauhaus architectural discipline, Neo-Brutalist physical web controls, Y2K early-digital technical aesthetics, and controlled psychedelic accents.
            </p>
          </div>

          {/* Design Formula Matrix */}
          <div className="border-2 border-[#111111] p-4 bg-[#F5F5F0]">
            <div className="font-mono-tech text-xs font-bold text-[#111111] uppercase tracking-wider mb-3">
              // DESIGN FORMULA BREAKDOWN:
            </div>
            <div className="space-y-2 font-mono-tech text-xs">
              <div className="flex justify-between items-center border-b border-[#111111]/15 pb-1">
                <span className="font-bold">70% CLEAN WHITE / MINIMAL</span>
                <span className="text-[#111111]/70">Negative space & legibility</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#111111]/15 pb-1">
                <span className="font-bold text-[#FF3B30]">15% NEO-BRUTALISM</span>
                <span className="text-[#111111]/70">Hard borders & offset shadows</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#111111]/15 pb-1">
                <span className="font-bold text-[#2457FF]">10% Y2K FUTURISM</span>
                <span className="text-[#111111]/70">Chrome orb, wireframes & coordinates</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#FF3CAC]">05% PSYCHEDELIC ACCENTS</span>
                <span className="text-[#111111]/70">Iridescent touches & stardust</span>
              </div>
            </div>
          </div>

          {/* Color Code Reference */}
          <div>
            <div className="font-mono-tech text-xs font-bold uppercase tracking-wider mb-2">
              PRIMARY ACCENTS:
            </div>
            <div className="grid grid-cols-3 gap-2 font-mono-tech text-[10px]">
              <div className="p-2 border border-[#111111] bg-[#2457FF] text-white font-bold">
                #2457FF ELECTRIC
              </div>
              <div className="p-2 border border-[#111111] bg-[#FF3B30] text-[#111111] font-bold">
                #FF3B30 SIGNAL
              </div>
              <div className="p-2 border border-[#111111] bg-[#FFD600] text-[#111111] font-bold">
                #FFD600 SOLAR
              </div>
              <div className="p-2 border border-[#111111] bg-[#0047FF] text-white font-bold">
                #0047FF BAUHAUS
              </div>
              <div className="p-2 border border-[#111111] bg-[#FF3CAC] text-white font-bold">
                #FF3CAC PINK
              </div>
              <div className="p-2 border border-[#111111] bg-[#B6FF00] text-[#111111] font-bold">
                #B6FF00 ACID
              </div>
            </div>
          </div>

          <div className="border-t border-[#111111]/20 pt-4 flex justify-between items-center font-mono-tech text-xs">
            <span className="text-[#111111]/70">LOCAL STORAGE: ACTIVE</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#111111] text-white font-bold cursor-pointer hover:bg-[#2457FF] transition-colors"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
