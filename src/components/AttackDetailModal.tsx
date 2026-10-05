import React from 'react';
import {
  X,
  Clock,
  TrendingUp,
  Network,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { ThreatEvaluation, ScenarioDefinition } from '../types/engine';

interface AttackDetailModalProps {
  scenario: ScenarioDefinition;
  evaluation: ThreatEvaluation;
  onClose: () => void;
}

export const AttackDetailModal: React.FC<AttackDetailModalProps> = ({
  scenario,
  evaluation,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
              DETAILED THREAT TELEMETRY
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              Full Attack Analysis & Causality
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: Risk Curve Trajectory */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold font-mono uppercase text-slate-900">
                Risk Curve Progression (18 → 31 → 48 → 67 → 89)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              PEAK: {evaluation.riskScore} / 100
            </span>
          </div>

          <div className="grid grid-cols-5 gap-3 text-center">
            {[
              { time: '21:03', score: 18, label: 'MESSAGE', tag: 'Ingress' },
              { time: '21:04', score: 31, label: 'LINK', tag: '+1m Delta' },
              { time: '21:07', score: 48, label: 'CALL', tag: '+3m Voice' },
              { time: '21:09', score: 67, label: 'REMOTE ACCESS', tag: '+2m Control' },
              { time: '21:11', score: 89, label: 'PAYMENT', tag: 'Extraction' },
            ].map((step, idx) => (
              <div
                key={step.label}
                className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col items-center justify-between"
              >
                <span className="text-[10px] font-mono text-slate-400">{step.time}</span>
                <div className="my-2">
                  <span className="text-2xl font-black font-mono text-slate-900">
                    {step.score}
                  </span>
                  <span className="text-[9px] font-mono block text-slate-500">RISK</span>
                </div>
                <div className="text-[10px] font-mono font-bold text-slate-800">
                  {step.label}
                </div>
                <span className="text-[9px] font-mono text-blue-600 mt-1">{step.tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Detailed Chronological Timeline */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" />
            <h3 className="text-sm font-bold font-mono uppercase text-slate-900">
              Chronological Correlated Timeline
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                time: '21:03',
                channel: 'MESSAGE',
                signal: 'Authority impersonation & urgent pretense',
                detail: 'SMS arrived from spoofed sender DM-POLICENOTICE with summons summons notice.',
              },
              {
                time: '21:04',
                channel: 'LINK',
                signal: 'Suspicious destination',
                detail: 'Browser navigation intent captured navigating to untrusted domain .top.',
              },
              {
                time: '21:07',
                channel: 'CALL',
                signal: 'Unknown caller & cross-channel link',
                detail: 'Phone call received 3 minutes later reinforcing the fake police notice.',
              },
              {
                time: '21:09',
                channel: 'REMOTE ACCESS',
                signal: 'Control request & screen projection',
                detail: 'Caller demanded victim install AnyDesk QuickSupport to view screen.',
              },
              {
                time: '21:11',
                channel: 'PAYMENT',
                signal: 'Financial extraction attempt',
                detail: 'Coercive UPI demand for ₹48,500 under immediate arrest warrant threat.',
              },
            ].map((item, idx) => (
              <div
                key={item.time}
                className="flex items-start gap-4 p-4 rounded-xl bg-slate-50/70 border border-slate-200/90 text-left"
              >
                <span className="text-xs font-mono font-bold text-slate-900 shrink-0 w-14">
                  {item.time}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white border border-slate-200 text-slate-700 shrink-0">
                  {item.channel}
                </span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">{item.signal}</div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Why It Escalated Summary */}
        <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-2">
          <div className="text-xs font-mono font-bold text-blue-800 uppercase">
            CONCLUSION OF REASONING ENGINE
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Individually, each event possessed high ambiguity (an SMS notice, a phone call, or an AnyDesk installation can occur legitimately). However, their precise temporal sequence—occurring across 3 channels within 11 minutes—elevated detection confidence to 99%, triggering the intervention prior to financial extraction.
          </p>
        </div>

        {/* Footer Close */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            CLOSE TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
};
