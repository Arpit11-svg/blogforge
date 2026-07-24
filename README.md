<div align="center">

# 🚀 BlogForge

### Craft, Publish & Share Your Ideas — Now Powered by AI

A modern full-stack blogging platform built with **React, Vite, Appwrite, Redux Toolkit, Tailwind CSS, and TinyMCE**, enhanced with **AI-powered semantic search and automatic content summarization** using **Google Gemini**.

Designed with a clean UI, secure authentication, rich text editing, image uploads, an engaging like system, and production-grade generative AI integrations built on a serverless architecture.

<br>

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-purple?logo=vite)]
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-Redux-764ABC?logo=redux)]
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38BDF8?logo=tailwindcss)]
[![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?logo=appwrite&logoColor=white)]
[![TinyMCE](https://img.shields.io/badge/TinyMCE-Rich_Text-blue)]
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_API-4285F4?logo=googlegemini&logoColor=white)]
[![Vercel](https://img.shields.io/badge/Vercel-Serverless_Functions-black?logo=vercel)]

### 🌐 Live Demo

👉 **https://blogforge-rho.vercel.app**

</div>

---

# ✨ Features

- 🔐 **Secure Authentication** — Sign up, log in, logout, and protected user sessions.
- ✍️ **Rich Text Editor** — Create beautifully formatted blogs using TinyMCE.
- 📝 **Complete Blog Management** — Create, edit, update, and delete blog posts effortlessly.
- 🖼️ **Image Uploads** — Upload and display featured images with every blog.
- ❤️ **Like System** — Like and unlike blogs with real-time like count updates.
- 🔍 **Category-wise Filtering** — Explore blogs by categories for a better reading experience.
- 📬 **Feedback & Contact Support** — Built-in contact form for user feedback and support requests.
- 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices.
- ⚡ **High Performance** — Built with Vite for lightning-fast development and production builds.
- 🔄 **State Management** — Efficient global state management using Redux Toolkit.
- ☁️ **Appwrite Backend** — Authentication, Database, and Storage powered by Appwrite.
- 🤖 **AI-Powered Semantic Search** — Find posts by meaning, not just keywords (see below).
- 🧠 **AI-Generated Summaries** — Instant TL;DR summaries for every post (see below).

---

# 🤖 AI-Powered Features

BlogForge integrates **Google Gemini** through a secure serverless architecture to deliver real generative-AI functionality — not just UI decoration. Every feature below is fully implemented and live in production.

> 💡 **Note for contributors:** when adding a new AI feature, copy the table row format below and append it — no need to restructure this section.

| Feature | What it does | Key tech |
|---|---|---|
| 🔍 **Semantic Search** | Search posts by *meaning* using vector embeddings and cosine similarity, instead of relying on exact keyword matches. Displays a "% match" relevance score per result. | `gemini-embedding-001`, vector embeddings, cosine similarity, Vercel Serverless Functions |
| 🧠 **AI TL;DR Summaries** | On-demand, per-user AI-generated summaries on every post's detail page. Cached in the database after first generation so it's never regenerated unnecessarily, saving API cost. | `gemini-3.5-flash-lite`, Appwrite row-level permissions, serverless REST integration |

### Architecture highlights (for the technically curious)

- **Secrets never touch the browser** — all Gemini API calls are routed through Vercel Serverless Functions (`/api/*`), keeping the API key server-side only; the frontend never has direct access to it.
- **Per-user data isolation** — AI summaries are scoped to individual users via Appwrite's row-level permission system, so private, user-specific AI output stays private even at the database layer, not just in the UI.
- **Cost-conscious by design** — embeddings and summaries are generated once and cached in Appwrite, not recomputed on every page view or search query.
- **Built for extensibility** — the AI service layer includes a permission-gate pattern designed to support an upcoming free-tier/credit-based usage system without requiring a rewrite.

---

# 🛠 Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- TinyMCE

## AI / Generative AI

- Google Gemini API (`gemini-embedding-001`, `gemini-3.5-flash-lite`)
- Vercel Serverless Functions (secure API key handling)
- Custom vector similarity search (cosine similarity)

## Backend

- Appwrite

## Database

- Appwrite Database (`TablesDB`)

## Storage

- Appwrite Storage

## Authentication

- Appwrite Authentication

---

# 📂 Project Structure

```text
blogforge/
│
├── api/
│   ├── generate-embedding.js     # Serverless fn: text → vector embedding (Gemini)
│   └── generate-summary.js       # Serverless fn: post content → AI summary (Gemini)
│
├── public/
├── src/
│   ├── appwrite/
│   ├── assets/
│   ├── components/
│   │   └── AISummary.jsx         # AI summary UI (generate/regenerate)
│   ├── conf/
│   ├── pages/
│   │   └── Search.jsx            # Semantic search UI
│   ├── services/
│   │   └── ai.js                 # Frontend AI service layer
│   ├── store/
│   ├── utils/
│   │   └── similarity.js         # Cosine similarity helper
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .env.sample
├── package.json
├── vite.config.js
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/Arpit11-svg/blogforge.git
```

Move into project

```bash
cd blogforge
```

Install dependencies

```bash
npm install
```

Create environment file

```bash
cp .env.sample .env
```

Start development server

```bash
npm run dev
```

> ⚠️ AI features (`api/*` routes) require the [Vercel CLI](https://vercel.com/docs/cli) for local testing — run `vercel dev` instead of `npm run dev` if you want to test semantic search or AI summaries locally.

---

# 🔑 Environment Variables

Create a `.env` file inside the root directory.

```env
VITE_APPWRITE_URL=

VITE_APPWRITE_PROJECT_ID=

VITE_APPWRITE_DATABASE_ID=

VITE_APPWRITE_COLLECTION_ID=

VITE_APPWRITE_BUCKET_ID=

VITE_TINYMCE_API_KEY=

VITE_APPWRITE_SUPPORT_TABLE_ID=

VITE_APPWRITE_LIKES_TABLE_ID=

VITE_APPWRITE_POST_SUMMARIES_TABLE_ID=

GEMINI_API_KEY=
```

---

# 🚀 Future Improvements

- 💳 **Premium Subscription & Payment Gateway Integration** — credit-based usage tiers for AI features
- 💬 Comments
- 🌙 Dark Mode
- 📑 Bookmarks
- 👤 User Profiles
- 📊 Blog Analytics
- 🔔 Notifications

---

# 📦 Build

```bash
npm run build
```

Preview production build

```bash
npm run preview
```

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add amazing feature"
```

4. Push

```bash
git push origin feature-name
```

5. Open a Pull Request

---

# 👨‍💻 Author

**Arpit Choudhary**

- LinkedIn: https://www.linkedin.com/in/arpit-choudhary-092706328/

---

<div align="center">

⭐ If you like this project, consider giving it a star!

Made with ❤️ using React, Appwrite & Google Gemini

</div>