export type EventType =
  | 'MESSAGE'
  | 'CALL'
  | 'URL'
  | 'AUDIO_SIGNAL'
  | 'APP_CONTEXT'
  | 'REMOTE_ACCESS_SIGNAL'
  | 'PAYMENT_SIGNAL'
  | 'USER_ACTION'
  | 'SYSTEM_CONTEXT';

export type SignalType =
  | 'AUTHORITY_IMPERSONATION'
  | 'URGENCY'
  | 'FINANCIAL_REQUEST'
  | 'OTP_REQUEST'
  | 'CREDENTIAL_REQUEST'
  | 'REMOTE_ACCESS'
  | 'SUSPICIOUS_URL'
  | 'THREAT_LANGUAGE'
  | 'UNKNOWN_CALLER'
  | 'PAYMENT_REQUEST'
  | 'CROSS_CHANNEL_ESCALATION'
  | 'RAPID_ESCALATION'
  | 'SCREEN_PROJECTION';

export type ThreatState = 'SAFE' | 'SUSPICIOUS' | 'ESCALATING' | 'ACTIVE_ATTACK';

export interface DemoEvent {
  id: string;
  type: EventType;
  timestamp: string; // e.g. "21:03"
  elapsedMinutes: number;
  senderOrSource: string;
  content: string;
  signals: SignalType[];
  confidence: number; // 0.0 to 1.0
  explanation: string;
}

export interface AttackGraphNode {
  id: string;
  label: string;
  category: string;
  channel: string;
  timestamp: string;
  eventId: string;
  signals: SignalType[];
  threatContribution: number;
  isTriggered: boolean;
  explanation: string;
}

export interface AttackGraphEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  relationshipLabel: string;
  temporalDelta: string;
  isFormed: boolean;
}

export interface AttackGraph {
  nodes: AttackGraphNode[];
  edges: AttackGraphEdge[];
}

export interface TemporalState {
  events: DemoEvent[];
  activeChannels: Set<string>;
  earliestTimestamp: number;
  latestTimestamp: number;
  crossChannelLinkDetected: boolean;
  velocityPenalty: number;
}

export interface ThreatEvaluation {
  riskScore: number; // 0 - 100
  threatState: ThreatState;
  activeSignals: SignalType[];
  correlatedEventsCount: number;
  durationMinutes: number;
  riskTrajectory: number[];
  reasons: string[];
  recommendedAction: string;
  graph: AttackGraph;
}

export type ScenarioId =
  | 'BENIGN_CONVERSATION'
  | 'SUSPICIOUS_MESSAGE'
  | 'BANK_IMPERSONATION'
  | 'REMOTE_ACCESS_SCAM'
  | 'FULL_ATTACK_CHAIN';

export interface ScenarioDefinition {
  id: ScenarioId;
  title: string;
  subtitle: string;
  description: string;
  isFeatured?: boolean;
  events: DemoEvent[];
}
