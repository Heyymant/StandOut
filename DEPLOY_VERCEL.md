# 🚀 Deploy STANDOUT to Vercel - Step by Step Guide

Deploy your frontend to Vercel (free, fast CDN) and backend to Render/Railway for Socket.io support.

---

## 📋 Overview

**Architecture:**
- ✅ **Frontend**: Vercel (fast CDN, free)
- ✅ **Backend**: Render.com or Railway.app (for Socket.io)
- ✅ **Custom Domain**: Connect to Vercel frontend

**Why this setup?**
- Vercel is excellent for frontend hosting
- Socket.io needs persistent connections (not serverless)
- Best of both worlds: Fast frontend + reliable backend

---

## 🎯 Step-by-Step Guide

### **PART 1: Deploy Backend** (10 minutes)

#### Option A: Render.com (Recommended)

1. **Push code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy Backend to Render**
   - Go to: https://render.com
   - Sign up with GitHub (free)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `standout-backend` (or any name)
     - **Root Directory**: `/` (or leave default)
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: **Free**
   - Click **"Create Web Service"**

3. **Wait for deployment** (~5-10 minutes)

4. **Copy Backend URL**
   - You'll get: `https://standout-backend.onrender.com`
   - **Save this URL** - you'll need it!

---

#### Option B: Railway.app

1. **Deploy to Railway**
   - Go to: https://railway.app
   - Sign up with GitHub (free)
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository
   - Railway auto-detects Node.js

2. **Configure** (if needed)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Get Backend URL**
   - Railway provides: `https://standout-backend.railway.app`
   - **Save this URL**

---

### **PART 2: Deploy Frontend to Vercel** (5 minutes)

1. **Install Vercel CLI** (optional, or use web interface)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Web Interface** (Easiest)
   - Go to: https://vercel.com
   - Sign up with GitHub (free)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `/` (default)
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`

3. **Add Environment Variable**
   - In Vercel project settings → **Environment Variables**
   - Add:
     - **Key**: `VITE_BACKEND_URL`
     - **Value**: `https://standout-backend.onrender.com` (your backend URL)
     - **Environment**: Production, Preview, Development
   - Click **"Save"**

4. **Deploy**
   - Click **"Deploy"**
   - Wait ~2-3 minutes
   - ✅ You'll get: `https://standout-game.vercel.app`

---

### **PART 3: Test Connection**

1. **Open your Vercel URL**
   - Visit: `https://standout-game.vercel.app`

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for: "Connected to server"
   - If you see connection errors, check backend URL

3. **Test Game**
   - Create a room
   - Check if URL is displayed correctly
   - Test Socket.io connection

---

### **PART 4: Add Custom Domain** (Optional)

1. **In Vercel Dashboard**
   - Go to your project → **Settings** → **Domains**
   - Click **"Add Domain"**
   - Enter: `standout.hemant` (or your domain)

2. **Configure DNS**
   - Vercel will show DNS instructions
   - Add CNAME record:
     - **Type**: CNAME
     - **Name**: `standout` (or `@`)
     - **Value**: `cname.vercel-dns.com`
   - Wait 5-10 minutes

3. **SSL is Automatic**
   - Vercel provides SSL automatically
   - Your domain will work with HTTPS

---

## 🔧 Configuration Files

### `vercel.json` (Already created)
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### Environment Variables in Vercel
- `VITE_BACKEND_URL`: Your backend URL (Render/Railway)

---

## 📱 Display URL in Game

The game automatically shows the connection URL:
- **Lobby**: Shows URL with copy button
- **Game Board**: Shows Room Code + URL
- **Works automatically** - no code changes needed!

---

## 🐛 Troubleshooting

### Frontend Can't Connect to Backend

1. **Check Environment Variable**
   - Vercel Dashboard → Settings → Environment Variables
   - Verify `VITE_BACKEND_URL` is set correctly
   - Must include `https://` (not `http://`)

2. **Check Backend CORS**
   - Backend should allow Vercel domain
   - In `server/index.js`, CORS is set to `"*"` (allows all)

3. **Check Backend is Running**
   - Visit backend URL directly: `https://standout-backend.onrender.com/api/health`
   - Should return: `{"status":"ok"}`

### Socket.io Connection Issues

1. **Check Browser Console**
   - Look for WebSocket errors
   - Verify backend URL is correct

2. **Check Network Tab**
   - Look for `/socket.io/` requests
   - Should connect to backend URL

3. **Verify Backend Supports WebSockets**
   - Render and Railway both support WebSockets
   - Check backend logs for connection attempts

---

## 💡 Pro Tips

1. **Use Render for Backend**
   - Free tier available
   - Auto-deploys from GitHub
   - Supports WebSockets
   - ⚠️ Spins down after 15 min - use UptimeRobot to keep awake (see `KEEP_RENDER_AWAKE.md`)

2. **Use Vercel for Frontend**
   - Fast CDN globally
   - Automatic HTTPS
   - Easy custom domains

3. **Environment Variables**
   - Set `VITE_BACKEND_URL` in Vercel
   - Different values for Production/Preview if needed

4. **Custom Domain**
   - Add to Vercel (not backend)
   - Vercel handles SSL automatically
   - Point DNS to Vercel

---

## ✅ Checklist

- [ ] Backend deployed to Render/Railway
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel
- [ ] Environment variable `VITE_BACKEND_URL` set in Vercel
- [ ] Tested connection in browser
- [ ] URL displays correctly in game
- [ ] Custom domain added (optional)
- [ ] Tested with friends!

---

## 🎉 You're Done!

Your game is now:
- ✅ Frontend on Vercel (fast CDN)
- ✅ Backend on Render/Railway (Socket.io)
- ✅ URL displayed in-game
- ✅ Ready to share with friends!

**Example Setup:**
- Frontend: `https://standout-game.vercel.app`
- Backend: `https://standout-backend.onrender.com`
- Custom Domain: `https://standout.hemant` (optional)

---

## 📚 Related Guides

- **Free Domain Setup**: See `DEPLOY_FREE_DOMAIN.md`
- **General Deployment**: See `DEPLOYMENT.md`
- **Troubleshooting**: See `TROUBLESHOOTING.md`

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app

