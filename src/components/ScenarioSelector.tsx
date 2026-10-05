import React from 'react';
import { SCENARIOS } from '../engine/Scenarios';
import { ScenarioDefinition, ScenarioId } from '../types/engine';
import { Play, Sparkles, Check, ArrowRight, ShieldAlert, ArrowLeft } from 'lucide-react';

interface ScenarioSelectorProps {
  selectedScenarioId: ScenarioId;
  onSelectScenario: (id: ScenarioId) => void;
  onStartAttack: () => void;
  onBack: () => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  selectedScenarioId,
  onSelectScenario,
  onStartAttack,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO DASHBOARD</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose Attack Scenario
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Select a sequence to observe how SCAMSHIELD evaluates ambiguous signals over time.
          </p>
        </div>

        <button
          onClick={onStartAttack}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs font-mono uppercase tracking-wider transition-all shadow-sm hover:shadow"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>START SIMULATION</span>
        </button>
      </div>

      <div className="space-y-3.5">
        {SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;

          return (
            <div
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-blue-50/50 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    {sc.isFeatured && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-600 text-white">
                        RECOMMENDED
                      </span>
                    )}
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {sc.events.length} EVENTS
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                    {sc.title}
                  </h3>
                  <div className="text-xs text-blue-700 font-semibold font-mono mt-0.5">
                    {sc.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                    {sc.description}
                  </p>

                  {/* Event Flow Mini Preview */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                    {sc.events.map((evt, idx) => (
                      <React.Fragment key={evt.id}>
                        <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                          {evt.type}
                        </span>
                        {idx < sc.events.length - 1 && (
                          <span className="text-slate-400">→</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onStartAttack}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>RUN SELECTED SCENARIO</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
