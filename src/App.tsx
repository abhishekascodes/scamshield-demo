import React, { useRef, useState } from 'react';
import {
  Shield,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Layers,
  Network,
  AlertTriangle,
  Download
} from 'lucide-react';

interface VideoChapter {
  timestampSeconds: number;
  timeLabel: string;
  stageName: string;
  detail: string;
  channel: string;
}

const CHAPTERS: VideoChapter[] = [
  {
    timestampSeconds: 0,
    timeLabel: '00:00',
    stageName: 'Safe Monitoring Baseline',
    detail: 'Protection dashboard at Risk Index 0. 0 stages active, background buses armed.',
    channel: 'SYSTEM BASELINE',
  },
  {
    timestampSeconds: 6,
    timeLabel: '00:06',
    stageName: 'Multi-Stage Scenario Injection',
    detail: 'Inbound legal summons SMS (DM-CYBERPOLICE) with lookalike destination URL.',
    channel: 'SMS + URL INTENT',
  },
  {
    timestampSeconds: 15,
    timeLabel: '00:15',
    stageName: 'Cross-Channel Call & Authority Pretense',
    detail: 'Voice call arrives 30s after URL click claiming Federal Police Cyber Division.',
    channel: 'TELECOM VOICE',
  },
  {
    timestampSeconds: 22,
    timeLabel: '00:22',
    stageName: 'Remote Access & Coercive Pressure',
    detail: 'Adversary demands AnyDesk QuickSupport installation under threat of immediate arrest.',
    channel: 'REMOTE ACCESS',
  },
  {
    timestampSeconds: 27,
    timeLabel: '00:27',
    stageName: 'Critical High-Severity Intervention',
    detail: 'Risk breaches critical threshold. Alert surfaces: DO NOT PAY, TERMINATE SCREEN SHARE.',
    channel: 'INTERVENTION ENGINE',
  },
  {
    timestampSeconds: 33,
    timeLabel: '00:33',
    stageName: 'Correlated Attack Graph Topology',
    detail: 'Navigating to Attack Graph tab revealing connected nodes and temporal deltas.',
    channel: 'ATTACK GRAPH',
  },
  {
    timestampSeconds: 43,
    timeLabel: '00:43',
    stageName: 'Chronological Event Timeline',
    detail: 'Auditing ordered event stream with extracted signal tags and confidence scores.',
    channel: 'EVENT TIMELINE',
  },
  {
    timestampSeconds: 57,
    timeLabel: '00:57',
    stageName: 'Final Active Scam State',
    detail: 'Returning to dashboard: The sequence itself became the signal. Risk held for judge audit.',
    channel: 'THREAT STATE',
  },
];

export const App: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(72);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Update active chapter
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (cur >= CHAPTERS[i].timestampSeconds) {
        setActiveChapterIndex(i);
        break;
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0F172A] font-sans flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-3 sm:px-8 py-2.5 sm:py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-lg">
                  SCAMSHIELD
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
                  VIDEO WALKTHROUGH
                </span>
              </div>
            </div>
          </div>

          <a
            href="https://scamshield.abhishekas.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-colors shadow-2xs"
          >
            <span className="hidden sm:inline">PROTOTYPE WEBSITE</span>
            <span className="sm:hidden">PROTOTYPE</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12">
        {/* Title & Editorial Framing */}
        <div className="text-center space-y-2 sm:space-y-3 max-w-3xl mx-auto px-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] sm:text-xs font-mono font-bold text-slate-700 tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>NATIVE ANDROID PRODUCT DEMONSTRATION</span>
          </div>

          <h1 className="text-2xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            A scam isn't an object.
            <br />
            <span className="text-slate-400">It's a sequence.</span>
          </h1>

          <p className="text-xs sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed pt-1">
            Watch the on-device temporal attack engine correlate multi-channel signals and intervene before financial loss.
          </p>
        </div>

        {/* Video Player Showcase */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-sm">
          {/* Video Container Frame */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-[9/16] sm:aspect-[16/9] max-h-[640px] mx-auto flex items-center justify-center border border-slate-800 shadow-md">
            <video
              ref={videoRef}
              src="/scamshield_walkthrough.mp4"
              poster="/poster.png"
              playsInline
              muted={isMuted}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
              className="w-full h-full object-contain"
              onClick={handlePlayPause}
            />

            {/* Play Overlay if Paused */}
            {!isPlaying && (
              <div
                onClick={handlePlayPause}
                className="absolute inset-0 bg-slate-950/30 backdrop-blur-2xs flex items-center justify-center cursor-pointer transition-all hover:bg-slate-950/20"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Integrated Clean Playback Controls */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3">
            {/* Scrubber Progress Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-500 w-10 text-right">
                {formatTime(currentTime)}
              </span>

              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  handleSeek(pos * duration);
                }}
                className="flex-1 h-2.5 bg-slate-100 hover:bg-slate-200 rounded-full cursor-pointer overflow-hidden p-0.5 border border-slate-200 transition-colors"
              >
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-100"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>

              <span className="text-xs font-mono text-slate-400 w-10">
                {formatTime(duration)}
              </span>
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayPause}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY WALKTHROUGH</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleSeek(0)}
                  title="Replay from start"
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleToggleMute}
                  title={isMuted ? 'Unmute' : 'Mute'}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                  720x1600 • 60 FPS • NATIVE ANDROID RUNTIME
                </span>

                <a
                  href="/scamshield_walkthrough.mp4"
                  download="scamshield_walkthrough.mp4"
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Download MP4 video file"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={handleFullscreen}
                  className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Full screen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Video Chapters / Interactive Sequence Timeline */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                VIDEO MILESTONES & TIMECODES
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight mt-0.5">
                Attack Sequence Progression
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-500">8 KEY STAGES</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CHAPTERS.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <div
                  key={ch.timeLabel}
                  onClick={() => handleSeek(ch.timestampSeconds)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-50/70 border-blue-400 ring-2 ring-blue-400/20 shadow-xs'
                      : 'bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/60 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={`font-bold px-2 py-0.5 rounded ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {ch.timeLabel}
                    </span>
                    <span className="text-slate-400 font-semibold">{ch.channel}</span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 mt-2">
                    {ch.stageName}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {ch.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Thesis Statement & Concept Summary */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xs text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-6 h-6 stroke-[2.2]" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-blue-600 block">
              SCAMSHIELD CORE ARCHITECTURE
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Temporal cross-channel attack-chain detection.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
              SCAMSHIELD correlates security-relevant signals across channels and time to identify escalating scam attacks before they reach financial loss.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <a
              href="https://scamshield.abhishekas.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm tracking-wider uppercase transition-all shadow-sm hover:shadow group"
            >
              <span>EXPLORE SCAMSHIELD PROTOTYPE</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-6 text-center text-xs font-mono text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-white">
              <Shield className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-900">SCAMSHIELD</span>
            <span className="text-slate-400 ml-2">Video Walkthrough Submission</span>
          </div>

          <div className="flex items-center gap-6 text-slate-600 font-semibold">
            <a
              href="https://scamshield.abhishekas.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              PROTOTYPE WEBSITE
            </a>
            <span>•</span>
            <span>https://demo.scamshield.abhishekas.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
