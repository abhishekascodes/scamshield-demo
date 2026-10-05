import React from 'react';
import { Lock, Shield, Cpu, ArrowDown, ArrowLeft } from 'lucide-react';

interface PrivacyViewProps {
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6 space-y-8">
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO DASHBOARD</span>
        </button>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 mb-3">
          <Lock className="w-3.5 h-3.5 text-emerald-700" />
          <span className="text-xs font-mono font-bold text-emerald-800 tracking-wider">
            PRIVACY ARCHITECTURE
          </span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Intelligence where it matters.
        </h2>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
          SCAMSHIELD is engineered around local-first processing. Security evaluations occur on the device, minimizing data exposure.
        </p>
      </div>

      {/* Simplified Architecture Diagram */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-8 shadow-xs">
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
          ON-DEVICE PROCESSING PIPELINE
        </div>

        <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
          {/* Level 1: Device */}
          <div className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
              INGESTION LAYER
            </span>
            <div className="text-sm font-extrabold text-slate-900 mt-1">DEVICE</div>
            <div className="text-xs text-slate-600 mt-1 font-mono">
              Messages • Calls • Signals • Events
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Level 2: Local Analysis */}
          <div className="w-full p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-center">
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase block">
              ON-DEVICE INFERENCE
            </span>
            <div className="text-sm font-extrabold text-slate-900 mt-1">LOCAL ANALYSIS</div>
            <div className="text-xs text-slate-600 mt-1">
              Token extraction & heuristic rule matching
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Level 3: Temporal Risk Engine */}
          <div className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
              CROSS-CHANNEL CORRELATION
            </span>
            <div className="text-sm font-extrabold text-slate-900 mt-1">TEMPORAL RISK ENGINE</div>
            <div className="text-xs text-slate-600 mt-1">
              Short-lived ephemeral attack graph in device RAM
            </div>
          </div>

          <ArrowDown className="w-4 h-4 text-slate-400" />

          {/* Level 4: Intervention */}
          <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase block">
              PRE-LOSS ACTION
            </span>
            <div className="text-sm font-extrabold text-slate-900 mt-1">USER INTERVENTION</div>
            <div className="text-xs text-slate-600 mt-1">
              High-severity warning surfaced before transaction
            </div>
          </div>
        </div>
      </div>

      {/* Honest Privacy Commitments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase">LOCAL-FIRST PROCESSING</div>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Designed around local-first processing. Sensitive analysis can remain on-device where supported by the implementation, avoiding bulk transmission of private messages or call metadata.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase">EPHEMERAL EVENT GRAPH</div>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            The attack graph operates in memory with a rolling temporal decay. Old signals age out automatically, leaving zero persistent behavioral surveillance profiles.
          </p>
        </div>
      </div>
    </div>
  );
};
