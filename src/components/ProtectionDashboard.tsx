import React from 'react';
import { ShieldCheck, Play, History, ArrowRight } from 'lucide-react';

interface ProtectionDashboardProps {
  onStartSimulation: () => void;
  onViewHistory: () => void;
}

export const ProtectionDashboard: React.FC<ProtectionDashboardProps> = ({
  onStartSimulation,
  onViewHistory,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 px-3 sm:px-6">
      {/* Calm State Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-12 shadow-xs text-center relative overflow-hidden">
        {/* Subtle Decorative Ambient Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-6 sm:mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider">
              PROTECTED
            </span>
          </div>

          {/* Large Shield Gauge Representation */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col items-center justify-center mb-6 shadow-2xs">
            <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600 stroke-[1.8] mb-1" />
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 tracking-tight">
              0 <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
          </div>

          {/* Headline & Description */}
          <h2 className="text-xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug max-w-[260px] sm:max-w-none mx-auto">
            No active threats detected.
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-base text-slate-600 max-w-sm sm:max-w-lg leading-relaxed mx-auto">
            SCAMSHIELD is monitoring background signals. Event streams remain within safe behavioral thresholds.
          </p>

          {/* Primary & Secondary Action CTAs */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button
              onClick={onStartSimulation}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm hover:shadow group"
            >
              <Play className="w-4 h-4 fill-current group-hover:scale-105 transition-transform" />
              <span>START ATTACK SIMULATION</span>
            </button>

            <button
              onClick={onViewHistory}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-all shadow-2xs"
            >
              <History className="w-4 h-4 text-slate-500" />
              <span>VIEW EVENT HISTORY</span>
            </button>
          </div>

          {/* Subtext info */}
          <div className="mt-12 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span>ON-DEVICE MONITORING</span>
            <span>•</span>
            <span>TEMPORAL BUS ARMED</span>
            <span>•</span>
            <span>0 FALSE ALARMS</span>
          </div>
        </div>
      </div>

      {/* Quick Concept Explainer Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase">STEP 1</div>
          <div className="text-sm font-bold text-slate-900 mt-1">Select Attack Scenario</div>
          <p className="text-xs text-slate-600 mt-1">
            Choose from isolated messages to a full 5-stage coordinated kill chain.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase">STEP 2</div>
          <div className="text-sm font-bold text-slate-900 mt-1">Watch Events Correlate</div>
          <p className="text-xs text-slate-600 mt-1">
            Observe the attack graph connect cross-channel signals in real-time.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase">STEP 3</div>
          <div className="text-sm font-bold text-slate-900 mt-1">Inspect The Reasons</div>
          <p className="text-xs text-slate-600 mt-1">
            Understand why risk escalates before financial damage occurs.
          </p>
        </div>
      </div>
    </div>
  );
};
