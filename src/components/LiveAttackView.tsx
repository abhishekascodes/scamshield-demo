import React, { useState } from 'react';
import {
  ShieldAlert,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  Phone,
  Radio,
  Clock,
  Layers,
  Network,
  Info,
  CheckCircle2,
  X,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import {
  DemoEvent,
  AttackGraphNode,
  AttackGraphEdge,
  ThreatEvaluation,
  ScenarioDefinition,
} from '../types/engine';

interface LiveAttackViewProps {
  scenario: ScenarioDefinition;
  evaluation: ThreatEvaluation;
  currentStepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onSetSpeed: (speed: number) => void;
  onViewFullAttack: () => void;
}

export const LiveAttackView: React.FC<LiveAttackViewProps> = ({
  scenario,
  evaluation,
  currentStepIndex,
  totalSteps,
  isPlaying,
  speed,
  onPlayPause,
  onStepForward,
  onReset,
  onSetSpeed,
  onViewFullAttack,
}) => {
  const [selectedNode, setSelectedNode] = useState<AttackGraphNode | null>(null);

  const isCompleted = currentStepIndex >= totalSteps;
  const isFinalActiveAttack = evaluation.threatState === 'ACTIVE_ATTACK' && isCompleted;

  // Semantic Threat Styling
  let statusBadgeBg = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  let gaugeColor = '#16A34A'; // emerald
  if (evaluation.threatState === 'ACTIVE_ATTACK') {
    statusBadgeBg = 'bg-rose-50 text-rose-800 border-rose-300';
    gaugeColor = '#E11D48'; // rose
  } else if (evaluation.threatState === 'ESCALATING') {
    statusBadgeBg = 'bg-amber-50 text-amber-800 border-amber-300';
    gaugeColor = '#D97706'; // amber
  } else if (evaluation.threatState === 'SUSPICIOUS') {
    statusBadgeBg = 'bg-blue-50 text-blue-800 border-blue-200';
    gaugeColor = '#2563EB'; // blue
  }

  // Active executed events
  const executedEvents = scenario.events.slice(0, currentStepIndex);

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Top Threat State Bar & Simulator Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Threat Status */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0">
            <span className="text-xl font-black font-mono text-slate-900 leading-none">
              {evaluation.riskScore}
            </span>
            <span className="text-[9px] font-mono font-bold text-slate-400 mt-0.5">/ 100</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${statusBadgeBg}`}>
                {evaluation.threatState === 'ACTIVE_ATTACK'
                  ? 'ACTIVE ATTACK'
                  : evaluation.threatState === 'ESCALATING'
                  ? 'ESCALATING'
                  : evaluation.threatState === 'SUSPICIOUS'
                  ? 'SUSPICIOUS'
                  : 'SAFE / PROTECTED'}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {currentStepIndex} of {totalSteps} Events Processed
              </span>
            </div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight mt-1">
              {scenario.title}
            </h2>
          </div>
        </div>

        {/* Right: Simulation Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          <button
            onClick={onPlayPause}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isCompleted ? 'REPLAY' : 'RESUME'}</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={isCompleted || isPlaying}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <span>STEP</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          {/* Speed Selector */}
          <div className="flex items-center bg-slate-100 rounded-lg p-0.5 border border-slate-200">
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                onClick={() => onSetSpeed(s)}
                className={`px-2 py-1 text-[11px] font-mono font-bold rounded-md transition-colors ${
                  speed === s
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen 5: Active Scam Intervention Card (When Final Active Attack State is reached) */}
      {isFinalActiveAttack && (
        <div className="bg-rose-50/80 border-2 border-rose-400 rounded-3xl p-6 sm:p-8 shadow-sm text-slate-900 animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <div className="text-xs font-mono font-bold tracking-wider text-rose-700 uppercase">
                  CRITICAL INTERVENTION
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                  ACTIVE SCAM DETECTED
                </h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600">
                  <span className="font-bold text-rose-700">{evaluation.riskScore} / 100 RISK</span>
                  <span>•</span>
                  <span>{evaluation.correlatedEventsCount} correlated events</span>
                  <span>•</span>
                  <span>11 minute attack sequence</span>
                </div>

                <div className="mt-4">
                  <div className="text-xs font-mono font-bold text-slate-700 uppercase mb-2">
                    WHY SCAMSHIELD ESCALATED THE THREAT:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-800">
                    {evaluation.reasons.map((reason) => (
                      <div key={reason} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Action & Decision CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-3 shrink-0 lg:w-64">
              <div className="p-3.5 bg-white rounded-xl border border-rose-200 text-center shadow-2xs">
                <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">
                  RECOMMENDED ACTION
                </div>
                <div className="text-base font-black text-rose-700 mt-0.5 tracking-wide">
                  {evaluation.recommendedAction}
                </div>
              </div>

              <button
                onClick={onViewFullAttack}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                VIEW FULL ATTACK
              </button>

              <button
                onClick={onReset}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider transition-colors"
              >
                RESET DEMO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Screen 4 (Temporal Graph Hero) + Screen 3 (Live Event Stream) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Temporal Attack Graph Hero (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                TEMPORAL ATTACK GRAPH (HERO VISUALIZATION)
              </span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                The sequence itself becomes the signal.
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Network className="w-4 h-4 text-blue-600" />
              <span>{evaluation.graph.nodes.filter(n => n.isTriggered).length} / 5 Active Nodes</span>
            </div>
          </div>

          {/* Attack Graph Visualization Canvas */}
          <div className="relative bg-[#F8FAFC] rounded-2xl border border-slate-200/90 p-6 min-h-[360px] flex flex-col justify-between overflow-hidden">
            {/* Edge Connections Visualization */}
            <div className="absolute inset-0 flex items-center justify-between px-12 pointer-events-none">
              <div className="w-full h-1 bg-slate-200 relative">
                <div
                  className="h-full bg-blue-600 transition-all duration-700 ease-out"
                  style={{
                    width: `${Math.max(
                      0,
                      Math.min(100, ((currentStepIndex - 1) / (totalSteps - 1)) * 100)
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Nodes Row */}
            <div className="relative z-10 grid grid-cols-5 gap-2 my-auto">
              {evaluation.graph.nodes.map((node, index) => {
                const isSelected = selectedNode?.id === node.id;
                const isTriggered = node.isTriggered;

                return (
                  <div
                    key={node.id}
                    onClick={() => isTriggered && setSelectedNode(node)}
                    className={`flex flex-col items-center text-center transition-all ${
                      isTriggered ? 'cursor-pointer group' : 'opacity-35 pointer-events-none'
                    }`}
                  >
                    {/* Node Dot / Circle */}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all shadow-xs ${
                        isSelected
                          ? 'bg-blue-600 border-blue-700 text-white scale-105 ring-4 ring-blue-500/20'
                          : isTriggered
                          ? index === totalSteps - 1 && isFinalActiveAttack
                            ? 'bg-rose-50 border-rose-500 text-rose-700'
                            : 'bg-white border-blue-600 text-blue-700 hover:bg-blue-50'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {index === 0 && <MessageSquare className="w-5 h-5" />}
                      {index === 1 && <ExternalLink className="w-5 h-5" />}
                      {index === 2 && <Phone className="w-5 h-5" />}
                      {index === 3 && <ShieldAlert className="w-5 h-5" />}
                      {index === 4 && <CreditCard className="w-5 h-5" />}
                    </div>

                    <div className="mt-2.5">
                      <span className="text-[11px] font-mono font-bold text-slate-900 block tracking-tight">
                        {node.label}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 block">
                        {node.timestamp}
                      </span>
                    </div>

                    {/* Threat Contribution Badge */}
                    {isTriggered && (
                      <span className="mt-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-slate-200/80 text-slate-700">
                        +{node.threatContribution}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Risk Progression Trajectory Bar */}
            <div className="relative z-10 pt-6 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500 font-bold">RISK ESCALATION:</span>
              <div className="flex items-center gap-2 font-bold">
                {['18', '31', '48', '67', '89'].map((pts, i) => (
                  <React.Fragment key={pts}>
                    <span
                      className={`px-2 py-0.5 rounded transition-colors ${
                        i < currentStepIndex
                          ? i === 4
                            ? 'bg-rose-600 text-white'
                            : 'bg-blue-600 text-white'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {pts}
                    </span>
                    {i < 4 && <span className="text-slate-300">→</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Node Inspector Detail Panel */}
          {selectedNode ? (
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 relative animate-in fade-in duration-200">
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                INSPECTED ATTACK NODE • {selectedNode.channel}
              </div>
              <h4 className="text-sm font-black text-slate-900 mt-0.5">
                {selectedNode.label} ({selectedNode.category})
              </h4>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                {selectedNode.explanation}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {selectedNode.signals.map((sig) => (
                  <span
                    key={sig}
                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-blue-800 border border-blue-200"
                  >
                    {sig}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 text-center text-xs font-mono text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
              Click any active node to inspect signal attribution and extracted weights.
            </div>
          )}
        </div>

        {/* Right Column: Screen 3 Live Event Stream (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                LIVE SIGNAL INGESTION STREAM
              </span>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                Normalized Events
              </h3>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>ORDERED LOG</span>
            </div>
          </div>

          {/* Event Stream List */}
          <div className="space-y-3">
            {executedEvents.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono text-slate-400 bg-slate-50 rounded-xl border border-slate-100">
                Press START ATTACK SIMULATION or STEP to begin injecting events into the bus.
              </div>
            ) : (
              executedEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="p-3.5 rounded-xl border transition-all bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {event.type}
                    </span>
                    <span className="text-slate-400 font-semibold">{event.timestamp}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 mt-2">
                    {event.senderOrSource}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {event.content}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                    {event.signals.map((sig) => (
                      <span
                        key={sig}
                        className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-100"
                      >
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
