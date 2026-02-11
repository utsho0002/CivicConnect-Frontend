# 🚀 CivicConnect  
### 🌍 Smart Community Issue Reporting Platform (Frontend)

<p align="center">
  <a href="https://civicconnect-e8797.web.app">
    <img src="https://img.shields.io/badge/🚀_Live_Demo-Open_Project-success?style=for-the-badge" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-Build_Tool-purple?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-black?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-Authentication-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## ✨ Overview

**CivicConnect** is a modern civic engagement platform that enables citizens to report local problems and allows managers/admins to monitor and moderate community issues.

This repository contains the **React + Vite frontend**, which connects to a custom **Node.js + Express + MongoDB backend** secured with Firebase Authentication.

---

# 🎯 Core Features

## 🔐 Authentication
- Firebase Authentication
- Secure login & registration
- Protected routes using PrivateRoute
- Role-based access (Citizen / Manager / Admin)

---

## 📝 Issue Reporting
- Create detailed reports
- Add district & upazila
- Upload images
- Track issue status
- Edit or delete own reports

---

## 📊 Role-Based Dashboards

### 👤 Citizen Dashboard
- View personal reports
- Track status updates
- Earn participation points

### 🧑‍💼 Manager Dashboard
- View reports by district
- Update issue status
- Moderate community reports

### 👑 Admin Dashboard
- Manage users
- Assign roles
- Enable / Disable accounts
- Post announcements

---

## 📣 Announcement Board
- Admin-created announcements
- Publicly visible to users

---

## 🏆 Leaderboard System
- Points-based ranking
- Encourages community engagement

---

# 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Authentication | Firebase Auth |
| Hosting | Firebase Hosting |
| API Communication | Axios |

---

# 🖼️ Demo Preview

### 🔹 Admin Dashboard

<p align="center">
  <img src="https://github.com/utsho0002/CivicConnect-Frontend/blob/main/Screenshot%202026-02-11%20114356.png?raw=true" width="80%" />
</p>

---

# 🚀 Getting Started

## 📦 Prerequisites

- Node.js 16+
- npm or yarn
- Running CivicConnect Backend
- MongoDB Atlas database
- Firebase project (Authentication enabled)

---

## 🔧 Installation

```bash
# Clone repository
git clone https://github.com/utsho0002/CivicConnect-Frontend.git

# Navigate into project
cd CivicConnect-Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

# ⚙️ Environment Configuration

Create `.env.local`:

```env
VITE_API_BASE_URL=http://localhost:3000
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

⚠️ All Vite environment variables must start with `VITE_`

---

# 🔥 Deployment

### Build Project

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
firebase login
firebase deploy --only hosting
```

---

# 📂 Project Structure

```
src/
│
├── Components/
│   ├── Admin/
│   ├── Citizen/
│   ├── Manager/
│   └── Dashboard/
│
├── Pages/
├── Provider/
│   ├── AuthProvider.jsx
│   └── PrivateRoute.jsx
│
├── Hook/
│   └── UseAxiosSecure.jsx
│
public/
│   ├── distric.json
│   └── upzila.json
│
vite.config.js
firebase.config.js
firebase.json
```

---

# 🔐 Backend Architecture

```
React Frontend
       ↓
Firebase Authentication
       ↓
ID Token (Authorization Header)
       ↓
Node.js + Express API
       ↓
MongoDB Atlas Database
```

---

# 🌟 Future Improvements

- Dark Mode
- Real-time notifications
- Map-based issue tracking
- Analytics dashboard
- Push notifications
- Automated CI/CD pipeline

---

# 🤝 Contributing

```bash
git checkout -b feat/your-feature
```

- Keep PRs focused
- Use meaningful commit messages
- Open issues before major changes

---

# 👨‍💻 Maintainer

**Utsho Paul**  
CSE Student | Data Structures Enthusiast | ML Research Explorer  
🇧🇩 Bangladesh  

GitHub: https://github.com/utsho0002  

---

# 📜 License

This project is licensed under the MIT License.

---

<p align="center">
  ⭐ If you like this project, consider giving it a star!
</p>
