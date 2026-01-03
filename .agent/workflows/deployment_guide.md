---
description: Full Stack Deployment Guide for Portfolio (Next.js + NestJS + PostgreSQL)
---

# 🚀 Full Stack Deployment Guide

This guide will walk you through deploying your portfolio website to the internet for free.

## prerequisites
- A **GitHub** account (to host your code).
- Your code pushed to a GitHub repository.

---

## Phase 1: The Database (Neon.tech) 🗄️
We need a live PostgreSQL database.

1.  Go to [Neon.tech](https://neon.tech/) and Sign Up.
2.  Create a **New Project**.
3.  Copy the **Connection String** (It looks like `postgres://user:pass@ep-xyz.us-east-1.aws.neon.tech/neondb...`).
4.  **Save this string**, you will need it for the Backend.

---

## Phase 2: The Backend (Render.com) ⚙️
We need a server to run your NestJS API.

1.  Go to [Render.com](https://render.com/) and Sign Up.
2.  Click **New +** -> **Web Service**.
3.  Connect your **GitHub Repository**.
4.  Select the **backend** folder (Root Directory: `backend` or `./backend` if monorepo).
5.  **Settings**:
    - **Runtime**: Node
    - **Build Command**: `npm install && npm run build` (or `yarn install && yarn build`)
    - **Start Command**: `npm run start:prod`
6.  **Environment Variables** (Click "Advanced"):
    - Add `DATABASE_URL` -> Paste your Neon Connection String.
    - Add `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` -> Your email details.
    - Add `PORT` -> `3001` (or let Render choose, usually 10000, but NestJS might default to 3000. Update main.ts if needed). -> *Tip: Render sets PORT env var automatically, NestJS usually listens on `process.env.PORT`.*
7.  Click **Create Web Service**.
8.  Wait for deployment. specific URL (e.g., `https://my-backend.onrender.com`). **Copy this URL**.

---

## Phase 3: The Frontend (Vercel.com) 🎨
We need to host your Next.js website.

1.  Go to [Vercel.com](https://vercel.com/) and Sign Up.
2.  Click **Add New...** -> **Project**.
3.  Import your **GitHub Repository**.
4.  **Settings**:
    - **Root Directory**: Leave it **BLANK** (or `./`). Do NOT select the `frontend` folder anymore as the code has been moved to the root.
    - **Framework Preset**: Next.js (should be auto-detected).
5.  **Environment Variables**:
    - Add `NEXT_PUBLIC_API_URL` -> Paste your Render Backend URL (e.g., `https://my-backend.onrender.com`).
      *(Note: No trailing slash `/` at the end)*.
6.  Click **Deploy**.

---

## Phase 4: Final Connection (CORS) 🔗
Your backend needs to allow your new frontend URL.

1.  Go back to your **Render Dashboard** (Backend).
2.  Go to **Environment Variables**.
3.  Add `FRONTEND_URL` -> Paste your Vercel Frontend URL (e.g., `https://my-portfolio.vercel.app`).
4.  *Note: Make sure your NestJS `main.ts` uses this variable for CORS, or allow all `*` for testing.*

---

## 🎉 Done!
Your website is now live on the internet!
