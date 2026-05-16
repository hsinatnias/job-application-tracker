# 🧭 Job Application Tracker

A full-stack job application tracking platform built with React and Firebase — helping developers manage their entire job search from wishlist to offer.

[![React](https://img.shields.io/badge/Built%20with-React-61DAFB.svg)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Auth%20%26%20DB-Firebase-FFCA28.svg)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Styled%20with-TailwindCSS-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 🔗 Live Demo

👉 [https://job-application-tracker-chi-ten.vercel.app](https://job-application-tracker-chi-ten.vercel.app)

---

## ✨ Features

- **Authentication** — Firebase Auth with email/password, protected routes, forgot password
- **Job tracking** — Add, edit, delete and view applications across 5 status stages
- **Status stages** — Wishlist → Applied → Interview → Offer → Rejected
- **Real-time search** — Filter by company, position, or location instantly
- **Status filter** — Filter jobs by stage with live counts
- **Cloud storage** — Firestore database with per-user data isolation and real-time sync
- **Resume builder** — Fill in your profile and generate a professional PDF resume
- **PDF export** — One-click download with @react-pdf/renderer
- **Responsive UI** — Works on mobile and desktop

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + Vite |
| Styling | Tailwind CSS v3 |
| Authentication | Firebase Auth |
| Database | Cloud Firestore |
| PDF Generation | @react-pdf/renderer |
| Routing | React Router v7 |
| Notifications | React Hot Toast |
| Icons | Lucide React |
| Deployment | Vercel |

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/hsinatnias/job-portal.git
cd job-portal

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Firebase config values to .env

# Start the development server
npm run dev
```

---

## 🔐 Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_DATABASE_URL=your_database_url_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

---

## 📁 Project Structure

````
src/
├── components/
│   ├── Layout.jsx          # Sidebar navigation and app shell
│   ├── ProtectedRoute.jsx  # Firebase auth guard
│   ├── ResumeDocument.jsx  # PDF resume template
│   └── StatusBadge.jsx     # Job status color badges
├── contexts/
│   └── AuthContext.jsx     # Firebase auth context provider
├── hooks/
│   └── 
├── pages/
│   ├── Login.jsx           # Split-screen login page
│   ├── Register.jsx        # Registration with password confirmation
│   ├── DashBoard.jsx       # Job list with search and filter
│   ├── AddJob.jsx          # Add and edit job form
│   ├── JobDetail.jsx       # Individual job detail view
│   ├── Profile.jsx         # User profile page
│   ├── ResumeProfile.jsx   # Resume builder form
│   ├── ResumePreview.jsx   # Resume preview with PDF download
│   └── NotFound.jsx        # 404 page
├── data/
│   └── mockJobs.js         # Sample job data
├── firebase.js             # Firebase app initialization
└── App.jsx                 # Root component and routing
````
---

## 👨‍💻 Author

**Anish Vattakunnel Mathew**
📧 anish.v.mathew1986@gmail.com
🌐 [anishvm.vercel.app](https://anishvm.vercel.app)
🐙 [github.com/hsinatnias](https://github.com/hsinatnias)

---

## 📄 License

[MIT](LICENSE)