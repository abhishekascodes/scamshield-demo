# SCAMSHIELD — Video Walkthrough & Interactive Demo

> **"A scam isn't an object. It's a sequence."**

Official video walkthrough and demonstration platform for SCAMSHIELD, showcasing the on-device Android security layer running live in an emulator environment.

- **Production Domain:** [https://demo.scamshield.abhishekas.in](https://demo.scamshield.abhishekas.in)
- **Product Story Website:** [https://scamshield.abhishekas.in](https://scamshield.abhishekas.in)

---

## Overview

This repository hosts the video walkthrough demonstration of the native SCAMSHIELD Android application. It includes a custom-engineered HTML5 video platform featuring interactive chapter navigation, scrubbing, volume control, fullscreen playback, and direct links to the primary product website.

### Walkthrough Chapters
1. **00:00 — Safe Monitoring Baseline:** Risk index at 0, passive background monitors armed.
2. **00:06 — Multi-Stage Scenario Injection:** Inbound summons SMS with lookalike domain URL.
3. **00:15 — Cross-Channel Call & Authority Pretense:** Voice call arriving 30s post-click.
4. **00:22 — Remote Access & Coercive Pressure:** Adversary demands AnyDesk installation under threat of arrest.
5. **00:27 — Critical High-Severity Intervention:** Risk threshold breached; pre-loss blocker displayed.
6. **00:33 — Correlated Attack Graph Topology:** Inspecting correlated nodes and temporal edges.
7. **00:43 — Chronological Event Timeline:** Auditing normalized events, confidence scores, and channels.
8. **00:57 — Final Active Scam State:** Returning to dashboard holding active threat state.

---

## Media Assets Included

- `public/scamshield_walkthrough.mp4`: The complete 72-second high-resolution screen capture of the native Android application run.
- `scamshield_walkthrough.mp4`: Walkthrough video file in repository root for direct inspection.
- `public/poster.png`: High-definition video poster frame.

---

## Technical Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Design System:** Clean light-first interface

---

## Development & Deployment

### Install Dependencies
```bash
npm install
```

### Run Locally
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
Build output is emitted to `dist/`, including all bundled static media.
