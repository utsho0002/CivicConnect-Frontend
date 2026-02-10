# CivicConnect

CivicConnect is a community reporting and civic engagement web app built with React, Vite and Firebase. It helps citizens report local issues, browse local reports, view leaderboards and announcements, and provides admin/manager dashboards for moderation and statistics.

---

## Key Features

- Report issues with photos and details
- Citizen dashboard: view and manage your reports
- Local reports feed (by district/upazila)
- Manager/Admin dashboards: reports moderation, stats, users, announcements
- Announcement board and community impact pages
- Authentication with Firebase

---

## Tech Stack

- Frontend: React (JSX) with Vite
- Hosting / Backend: Firebase (Auth, Firestore, Storage, Hosting)
- Styling: CSS (project styles in `src/`)

---

## Repo Structure (important files/folders)

- `src/` — main source folder
  - `Components/` — UI components and pages (Admin, Citizen, Manager, Dashboard)
  - `Provider/` — `AuthProvider.jsx`, auth and route helpers
  - `Hook/` — custom hooks
  - `main.jsx`, `App.jsx`, `Routes.jsx` — app entry and routing
- `public/` — public assets and JSON data (`distric.json`, `upzila.json`)
- `vite.config.js` — Vite config
- `firebase.json`, `firebase.config.js` — Firebase configuration and hosting

---

## Getting Started

Prerequisites

- Node.js (16+ recommended) and npm or yarn
- A Firebase project (for Auth, Firestore, Storage, Hosting)

Quick local setup

1. Install dependencies

```bash
npm install
# or
# yarn
```

2. Add Firebase config

 - Copy your Firebase config into `firebase.config.js` or provide the appropriate environment variables. If you use Vite env vars, prefix them with `VITE_` and reference them from `src` code.

3. Run the dev server

```bash
npm run dev
# or
# yarn dev
```

4. Build for production

```bash
npm run build
npm run preview
```

---

## Firebase / Deployment notes

- This project comes with `firebase.json` and `firebase.config.js` prepared. To deploy using Firebase Hosting:

```bash
# login and init if needed
firebase login
firebase deploy --only hosting
```

Adjust Firestore rules, Storage rules and any environment secrets before deploying.

---

## Environment variables

- If you use environment variables instead of `firebase.config.js`, follow Vite conventions and prefix variables with `VITE_` (e.g., `VITE_FIREBASE_API_KEY`). Do not commit secret keys to version control.

---

## Contributing

- Open an issue for bugs or feature requests
- Create a branch, make changes, and open a pull request
- Keep changes small and focused; follow the existing code style

---

## Testing & Linting

This repo does not include test scripts by default. You can add unit/integration tests (Jest, React Testing Library) and linters (ESLint, Prettier) as needed.

---

## License

This project is provided under the MIT License. Update the license section if you need a different license.

---

## Contact

If you'd like help customizing this README or adding CI, tests, or deployment scripts, tell me what you'd like changed and I will update it.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
