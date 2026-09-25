# 🚀 Deployment Guide for Cinematic Portfolio & Admin Panel

This guide details the best free platforms to deploy your **Cinematic Portfolio** with a fully working, secure **Admin Control Panel**.

---

## 🌟 Recommended Platform #1: Vercel (Best & Fastest)

Vercel is the optimal hosting platform for React and Vite applications. It provides high-speed CDN global edge hosting, automatic SSL certificates, and zero-configuration builds.

### Option A: Deploy via GitHub (Recommended)
1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release with Admin C-Panel"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/cinematic-portfolio.git
   git push -u origin main
   ```
2. **Import to Vercel**:
   - Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **"Add New Project"** -> Select your `cinematic-portfolio` repository.
   - **Framework Preset**: Select **Vite**.
   - **Build Command**: `npm run build` (auto-detected).
   - **Output Directory**: `dist` (auto-detected).
   - Click **Deploy**.

---

### Option B: Direct Drag-and-Drop / Vercel CLI (No GitHub required)
If you prefer not to use Git:
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Run Vercel Deploy in your project directory**:
   ```bash
   vercel
   ```
   Follow the interactive prompts (select default settings).
3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## ⚡ Recommended Platform #2: Netlify (Alternative)

Netlify is another top-tier platform for hosting single-page applications.

### Option A: Drag-and-Drop Folder Upload
1. Run `npm run build` locally in your project directory to generate the `dist` folder.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder directly onto the page.
4. Your site will instantly go live with a custom HTTPS URL!

---

## 🔐 Admin Panel Security & Data Persistence Best Practices

### 1. Changing Your Admin PIN
The default Admin PIN is **`1234`**. 
- Open the Admin Panel (`Ctrl + Shift + A`).
- Go to the **Settings** tab.
- Change the passcode to a strong, private security PIN.

### 2. Live Data Backup & Synchronization
- Because data is securely stored in `localStorage`, any edits you make on your live deployed domain remain saved on your browser.
- **Exporting Backup**: Go to **Settings -> EXPORT JSON BACKUP** to save a copy of your customized portfolio data (`cinematic-portfolio-backup.json`).
- **Restoring Backup**: If you visit your portfolio on another device, open the Admin Panel, go to **Settings -> IMPORT JSON BACKUP**, and upload your JSON file to instantly sync your site!

---

## 🛠️ Included SPA Configuration Files
The repository includes pre-configured routing handlers for production builds:
- `vercel.json` (Vercel SPA rewrite rules)
- `public/_redirects` (Netlify 200 rewrite rules)
