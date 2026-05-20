# ⚡ Aethr

> AI-powered badminton training platform. Track your stats, follow weekly training plans, and chat with a personal AI coach.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat&logo=vite&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2?style=flat&logo=google&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

**Live demo → [aethr-train.vercel.app](https://aethr-train.vercel.app)**

---

<!-- Replace with your demo GIF -->
![Aethr Demo](demo.gif)

---

## What it does

Aethr is a full React web app that takes a badminton training program originally built in Java and brings it to life with a modern UI, stat tracking, and AI coaching.

- **Three training tiers** — Beginner, Intermediate, and Advanced with tailored weekly plans
- **Stat tracking** — rate yourself on Strength, Speed, Endurance, and Agility (1–10)
- **Radar chart dashboard** — visualise your stats and track progress week by week
- **Smart weekly plans** — automatically targets your weakest stat each week
- **AI Coach** — chat with Gemini 2.5 Flash, which knows your tier, stats, and progress
- **Tips library** — footwork, grips, shots, strategy, and nutrition
- **Persistent progress** — all data saved locally, no account needed

---

## Demo

> 📹 [Watch the demo](#) <!-- Replace with your YouTube link -->

---

## Tech stack

- **React 18 + Vite** — fast frontend with file-based routing
- **React Router DOM** — multi-page navigation
- **Recharts** — animated radar chart for stat visualisation
- **Framer Motion** — smooth page transitions
- **Gemini 2.5 Flash API** — AI coaching with player context awareness
- **Vercel** — zero-config deployment

---

## Getting started

### Prerequisites
- Node.js 18+
- A free Gemini API key from [aistudio.google.com](https://aistudio.google.com) (for the AI Coach feature)

### Run locally

```bash
git clone https://github.com/yourusername/aethr.git
cd aethr
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### AI Coach setup
Click **AI Coach** from the dashboard and enter your free Gemini API key when prompted. It's stored locally and never sent anywhere else.

---

## Project structure

```
aethr/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx       # Home page with pricing packages
│   │   ├── Onboarding.jsx    # Tier selection + stat input
│   │   ├── Dashboard.jsx     # Radar chart, weekly tasks, history
│   │   ├── Coach.jsx         # Gemini AI chat interface
│   │   └── Tips.jsx          # Technique and nutrition tips
│   ├── App.jsx               # Routing and global state
│   └── index.css             # Design tokens and global styles
```

---

## Origin

This project is a full rebuild of a Java-based badminton training program, originally a terminal app with three training tiers, stat tracking, and file persistence. Aethr takes the same core logic and extends it with a React frontend, live stat visualisation, and AI coaching.

---

## License

MIT — do whatever you want with it.

---

*Built with React, Vite, and the Gemini API. Deployed on Vercel.*
