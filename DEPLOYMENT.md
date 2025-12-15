# 🚀 Deployment Guide - StandOut Game

This guide will help you deploy StandOut for free and set up a custom domain like `StandOut.hemant`.

## 📋 Table of Contents
1. [Free Hosting Options](#free-hosting-options)
2. [Deploying to Render.com](#deploying-to-rendercom-recommended)
3. [Deploying to Railway.app](#deploying-to-railwayapp)
4. [Setting Up Custom Domain](#setting-up-custom-domain)
5. [Local Network Setup (Alternative)](#local-network-setup-alternative)

---

## 🌐 Free Hosting Options

### Option 1: Render.com (Recommended)
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Supports Node.js + Socket.io
- ✅ Custom domain support
- ⚠️ Free tier spins down after 15 min inactivity

### Option 2: Railway.app
- ✅ Free tier ($5 credit/month)
- ✅ No spin-down
- ✅ Easy deployment
- ✅ Custom domain support

### Option 3: Vercel (Frontend) + Railway (Backend)
- ✅ Vercel: Best for frontend (free)
- ✅ Railway: Backend with Socket.io
- ⚠️ More complex setup

---

## 🎯 Deploying to Render.com (Recommended)

### Step 1: Prepare Your Repository
1. Push your code to GitHub (if not already)
2. Make sure `render.yaml` exists in the root

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Render will auto-detect `render.yaml`:
   - **Name**: `standout-game` (or any name)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
   - **Plan**: **Free**

### Step 3: Configure Environment Variables
In Render dashboard → Environment:
- `NODE_ENV` = `production`
- `PORT` = `3001` (or leave default)
- (Optional) `AI_PROVIDER` = `openai`
- (Optional) `AI_API_KEY` = your OpenAI key

### Step 4: Deploy
Click **"Create Web Service"** and wait for deployment (~5-10 minutes)

Your app will be live at: `https://standout-game.onrender.com` (or similar)

---

## 🚂 Deploying to Railway.app

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository

### Step 3: Configure
Railway auto-detects Node.js. Configure:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `/` (default)

### Step 4: Add Environment Variables
In Railway dashboard → Variables:
- `NODE_ENV` = `production`
- (Optional) `AI_PROVIDER` = `openai`
- (Optional) `AI_API_KEY` = your OpenAI key

### Step 5: Generate Domain
Railway provides a free `.railway.app` domain automatically!

---

## 🌍 Setting Up Custom Domain

### Option A: Using a Free Subdomain Service

#### 1. DuckDNS (Free, Easy)
1. Go to [duckdns.org](https://www.duckdns.org)
2. Sign up and create a subdomain: `standout-hemant`
3. You'll get: `standout-hemant.duckdns.org`
4. Update DNS records in your hosting provider:
   - Type: `CNAME`
   - Name: `standout-hemant` (or `@`)
   - Value: Your Render/Railway domain

#### 2. Freenom (Free .tk/.ml/.ga domains)
1. Go to [freenom.com](https://www.freenom.com)
2. Register a free domain (e.g., `standout.ga`)
3. Add subdomain `hemant` → `hemant.standout.ga`
4. Point DNS to your hosting provider

### Option B: Using Your Own Domain

If you own `hemant.com` or similar:

1. **For Render.com:**
   - Go to your service → Settings → Custom Domain
   - Add domain: `standout.hemant.com`
   - Add CNAME record in your DNS:
     ```
     Type: CNAME
     Name: standout
     Value: your-app.onrender.com
     ```

2. **For Railway.app:**
   - Go to your service → Settings → Domains
   - Add custom domain: `standout.hemant.com`
   - Add CNAME record in your DNS:
     ```
     Type: CNAME
     Name: standout
     Value: your-app.railway.app
     ```

### Option C: Using No-IP (Free Dynamic DNS)
1. Sign up at [noip.com](https://www.noip.com)
2. Create hostname: `standout-hemant.ddns.net`
3. Use their dynamic DNS updater
4. Point to your hosting provider

---

## 🏠 Local Network Setup (Alternative)

If you want to play on the same WiFi without deploying:

### Option 1: Use Your Local IP
1. Find your computer's IP address:
   - **Windows**: `ipconfig` → Look for IPv4 Address
   - **Mac/Linux**: `ifconfig` or `ip addr`
2. Start the server: `npm run dev`
3. Share the URL: `http://YOUR_IP:3000`
4. Friends on same WiFi can access it

### Option 2: Use ngrok (Temporary Public URL)
1. Install ngrok: `npm install -g ngrok`
2. Start your server: `npm run dev`
3. In another terminal: `ngrok http 3000`
4. Share the ngrok URL (e.g., `https://abc123.ngrok.io`)
5. ⚠️ Free tier has session limits

### Option 3: Use LocalTunnel
1. Install: `npm install -g localtunnel`
2. Start server: `npm run dev`
3. Run: `lt --port 3000 --subdomain standout-hemant`
4. Access at: `https://standout-hemant.loca.lt`

---

## 🔧 Post-Deployment Checklist

- [ ] Test creating a room
- [ ] Test joining a room
- [ ] Test game flow (prompts, rounds, voting)
- [ ] Test on mobile device
- [ ] Verify Socket.io connections work
- [ ] Check custom domain (if configured)
- [ ] Test with friends on different networks

---

## 🐛 Troubleshooting

### Socket.io Connection Issues
- Make sure your hosting provider supports WebSockets
- Check CORS settings in `server/index.js`
- Verify environment variables are set

### Build Failures
- Check Node.js version (needs >= 18.0.0)
- Verify all dependencies in `package.json`
- Check build logs in hosting dashboard

### Custom Domain Not Working
- Wait 24-48 hours for DNS propagation
- Verify CNAME records are correct
- Check SSL certificate status in hosting dashboard

---

## 📱 Sharing with Friends

Once deployed, share your URL:
- **Render**: `https://your-app.onrender.com`
- **Railway**: `https://your-app.railway.app`
- **Custom Domain**: `https://standout.hemant.com` (or your chosen domain)

Everyone can access it from anywhere, not just same WiFi! 🎉

---

## 💡 Tips

1. **Render Free Tier**: Spins down after 15 min inactivity. First request may be slow.
2. **Railway**: More reliable, but has usage limits on free tier.
3. **Custom Domain**: Looks more professional and easier to remember.
4. **Environment Variables**: Never commit API keys to Git. Use hosting provider's env vars.

---

## 🆘 Need Help?

- Check `TROUBLESHOOTING.md` in the repo
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app

