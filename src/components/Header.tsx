import React from 'react';
import { Shield, ArrowUpRight, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentView: 'dashboard' | 'detail' | 'privacy';
  onNavigate: (view: 'dashboard' | 'detail' | 'privacy') => void;
  onReset: () => void;
  riskScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onReset,
  riskScore,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-6 py-2.5 sm:py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left Brand */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-lg">
              SCAMSHIELD
            </span>
            <span className="hidden xs:inline-block px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-amber-50 text-amber-800 border border-amber-200">
              DEMO MODE
            </span>
          </div>
        </div>

        {/* Center / Navigation */}
        <nav className="flex items-center gap-0.5 sm:gap-2 text-[11px] sm:text-xs font-mono font-semibold">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors ${
              currentView === 'dashboard'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            DASHBOARD
          </button>
          <button
            onClick={() => onNavigate('detail')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors ${
              currentView === 'detail'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="hidden sm:inline">ATTACK </span>DETAIL
          </button>
          <button
            onClick={() => onNavigate('privacy')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg transition-colors ${
              currentView === 'privacy'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            PRIVACY
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {riskScore > 0 && (
            <button
              onClick={onReset}
              title="Reset simulation to Protected (0/100)"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-600 hover:text-slate-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">RESET</span>
            </button>
          )}

          <a
            href="https://scamshield.abhishekas.in"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Product Story"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-mono font-bold text-slate-600 hover:text-slate-900 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <span className="hidden md:inline">PRODUCT STORY</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
