# 🦇 GABBAR — Anonymous Intelligence Hub (V9.3)

[![Platform: React 19](https://img.shields.io/badge/Platform-React_19-blue.svg)](https://reactjs.org/)
[![Vite: Optimized](https://img.shields.io/badge/Vite-Optimized-646CFF.svg)](https://vitejs.dev/)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E.svg)](https://supabase.com/)

GABBAR is a high-fidelity anonymous reporting platform designed as a **cinematic command center** for campus intelligence. Version 9.3 introduces massive UI/UX refinements focused on space optimization and operative progress tracking.

---

## 🚀 Key Evolutionary Features (V9.3)

### 🖥️ COLLAPSIBLE COMMAND SIDEBAR
Modernized layout with a toggleable sidebar system.
- **Menu Toggle**: Increase display area for intelligence feeds by 30% with a single click.
- **Fluid Transitions**: Zero-jitter grid animations for seamless workspace expansion.

### 🎭 OPERATIVE ACHIEVEMENT SYSTEM
Track your impact within the hub with the new **Achievement Hub**.
- **Dynamic Badges**: Unlock badges based on active reporting and positive impact.

### 🕵️ /DEV ROOT TERMINAL
A restricted, high-fidelity hacker-themed interface located at `/dev`. Designed for master operatives to oversee system integrity.
- **Cinematic Matrix Rain** background.
- **Root Authentication** bypass for whitelisted developers.
- **Command Overrides** for system-wide management.

### 🔐 UPLINK SECURITY (Google OAuth)
Integrated **Google OAuth** for seamless, secure campus-wide access, bypassing traditional email friction while maintaining encrypted identity layers.

### 🕹️ ADMIN COMMAND CENTER (V28)
An industrial-grade management panel with:
- **Signal Broadcasts**: Send encrypted mass notifications or targeted user messages.
- **Operative Lockdown**: Granular **Ban/Unban** controls for user management.
- **Intel Purging**: Ability to permanently delete compromised or irrelevant reports.

---

## 🏗️ System Architecture

GABBAR V9.3 has been modularized for high-concurrency development and cleaner lifecycle management.

### 📦 Component Architecture
| Module | Purpose | Location |
| :--- | :--- | :--- |
| `AuthForm` | Unified student/admin identity uplink. | `src/components/AuthForm.jsx` |
| `ReportCard` | High-fidelity intelligence log visualization. | `src/components/ReportCard.jsx` |
| `AchievementHub` | Operative progression and badge tracking. | `src/components/AchievementHub.jsx` |
| `SidePanel` | Trending intel and platform metric telemetry. | `src/components/SidePanel.jsx` |
| `SystemBoot` | Cinematic system initialization sequence. | `src/components/SystemBoot.jsx` |

### 🧩 Core Infrastructure
- **Security Utilities**: `src/security.js` (JSDoc Documented)
- **Tactical Helpers**: `src/utils.js` (Clipboard & Date formatting)
- **Global Constants**: `src/constants.js` (Centralized business logic)

---

## 🔒 Security Protocol

GABBAR is designed with **Anonymity-First Architecture**:

- **Identity Decoupling**: User identity is cryptographically separated from intelligence logs.
- **Anonymous Codename System**: Custom operative handles (e.g., *ShadowFox*) are visible, but emails remain hidden.
- **Master Operative Whitelist**: Strict developer-only access to root terminal tools.
- **Domain Lockdown**: Restricted to `@vvce.ac.in` verified operatives.

---

## 🛠️ Stack Analysis

- **Core**: React 19 (Hooks + Memoization)
- **Database**: Supabase (PostgreSQL + RLS Policies)
- **Authentication**: Supabase Auth (GoTrue) + OAuth 2.0
- **Styling**: Vanilla CSS (Global Tokens + Cinematic Keyframes)
- **Motion**: Framer Motion (Orchestration & UI Micro-states)

---

## 🏗️ Deployment & Setup

```bash
# Clone the encrypted repository
git clone https://github.com/Jxvz01/Gabbar.git

# Initialize environment
npm install

# Build production bundle
npm run build

# Boot local terminal
npm run dev
```

© 2026 **GABBAR HUB** | ANONYMOUS INTELLIGENCE HUB | Developed by Jxvz01

## Project Vision
GABBAR aims to be the gold standard for anonymous campus intelligence, providing a secure, high-fidelity platform for students and faculty to share critical information without fear of retaliation.
