# FocusList — Experimental Brutalist Task Manager

> A high-performance, neo-brutalist task manager combining **Bauhaus geometric structure**, **Neo-Brutalist physical controls**, **Y2K early-digital graphics**, and **subtle psychedelic accents** with an interactive 3D WebGL focus orb.

---

## ✦ Design Philosophy & Aesthetic Pillars

FocusList is designed as a premium independent design studio product rather than a conventional SaaS dashboard:

- **70% Clean White / Minimalist**: Built on an off-white and pure white canvas featuring an optical 1px technical grid, expansive negative space, and bold `#111111` typography.
- **15% Neo-Brutalist**: Hard rectangular containers with 2–3px black borders, solid offset drop-shadows (`6px 6px 0 #111`), tactile interactive button states with translation feedback (`translate(2px, 2px)` on hover, `translate(5px, 5px)` on active press), and physical hardware control-panel styling.
- **10% Y2K Futurism**: Monospaced technical micro-typography (**IBM Plex Mono**), digital coordinates (`48°51'N 2°20'E`), animated scanlines, and a pulsating `LOCAL ● ACTIVE` real-time storage status indicator.
- **05% Psychedelic Accents**: Iridescent gradient highlights, celebratory confetti bursts on task completion, and subtle chromatic stardust particles.
- **Interactive 3D Focus Orb (Three.js)**: A floating WebGL centerpiece with a PBR metallic chrome sphere, transparent wireframe glass cube, orbiting rings, floating Bauhaus primary solids (tetrahedron, disc, cube, sphere), and smooth cursor tilt interaction.

---

## ⚡ Key Features

- **Full Task Lifecycle**: Rapidly create, edit, prioritize, complete, and delete tasks with instant responsive UI feedback.
- **Brutalist Priority Matrix**: Color-coded physical priority blocks:
  - `HIGH`: Signal Red (`#FF3B30`)
  - `MEDIUM`: Solar Yellow (`#FFD600`)
  - `LOW`: Acid Green (`#B6FF00`)
- **Custom Brutalist Checkbox**: Custom keyboard-accessible box toggling between `□` and `■` with celebratory completion confetti.
- **Bauhaus Velocity Gauge & Statistics**: 3 bold statistic cards (`TOTAL`, `COMPLETED`, `PENDING`) backed by Bauhaus geometric color blocks and a progress ratio bar.
- **Instant Search & Multi-Criteria Filtering**: Filter across execution status (`ALL`, `ACTIVE`, `COMPLETED`), priority level (`ALL`, `HIGH`, `MEDIUM`, `LOW`), or real-time query string.
- **Local Persistence**: 100% private, client-side data persistence powered by the HTML5 Web Storage API.
- **Interactive Modals**:
  - **Edit Modal**: Dedicated popup for adjusting title and priority with `Escape` / `Enter` keyboard controls.
  - **Design Manifesto**: Detailed architectural breakdown of color codes and design formulas.

---

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **3D Graphics**: Three.js (WebGL PBR Materials)
- **Typography**: Archivo Black, Space Grotesk, IBM Plex Mono
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti & CSS Matrix Transforms

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📄 License
MIT License
