# ⚡ Quick Deploy Guide - StandOut.hemant

This is a simplified guide to get your game online with a custom domain quickly.

## 🎯 Goal: Deploy to `StandOut.hemant` (or similar)

---

## Step 1: Choose Your Hosting (Pick One)

### Option A: Render.com (Easiest)
1. Go to [render.com](https://render.com) → Sign up (free)
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub repo → Auto-detects `render.yaml`
4. Click **"Create Web Service"**
5. Wait ~5 minutes for deployment
6. ✅ You'll get: `https://standout-game.onrender.com`

### Option B: Railway.app (More Reliable)
1. Go to [railway.app](https://railway.app) → Sign up (free)
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your repo
4. Railway auto-detects Node.js
5. ✅ You'll get: `https://standout-game.railway.app`

---

## Step 2: Get Your Custom Domain

### Method 1: DuckDNS (Free, 5 minutes)
1. Go to [duckdns.org](https://www.duckdns.org)
2. Sign up with Google/GitHub
3. Create subdomain: `standout-hemant`
4. ✅ You'll get: `standout-hemant.duckdns.org`
5. Copy your token (you'll need it)

### Method 2: No-IP (Free, Dynamic DNS)
1. Go to [noip.com](https://www.noip.com)
2. Sign up (free account)
3. Create hostname: `standout-hemant`
4. Choose domain: `.ddns.net` (free)
5. ✅ You'll get: `standout-hemant.ddns.net`

### Method 3: Use Your Own Domain
If you own `hemant.com`:
- Add subdomain: `standout.hemant.com`
- Point to your hosting provider

---

## Step 3: Connect Domain to Hosting

### For Render.com:
1. Go to your service → **Settings** → **Custom Domains**
2. Click **"Add Custom Domain"**
3. Enter: `standout-hemant.duckdns.org` (or your domain)
4. Render will show DNS instructions:
   - **Type**: CNAME
   - **Name**: `standout-hemant` (or `@`)
   - **Value**: `your-app.onrender.com`
5. Add this CNAME record in DuckDNS/No-IP dashboard
6. Wait 5-10 minutes for DNS propagation
7. ✅ Done! Access at `https://standout-hemant.duckdns.org`

### For Railway.app:
1. Go to your service → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `standout-hemant.duckdns.org`
4. Railway will show DNS instructions:
   - **Type**: CNAME
   - **Name**: `standout-hemant`
   - **Value**: `your-app.railway.app`
5. Add this CNAME record in DuckDNS/No-IP dashboard
6. Wait 5-10 minutes
7. ✅ Done! Access at `https://standout-hemant.duckdns.org`

---

## Step 4: Test & Share! 🎉

1. Open your custom domain in browser
2. Test creating a room
3. Share the URL with friends!
4. They can access from anywhere (not just WiFi)

---

## 🔧 Optional: Environment Variables

If you want AI-generated prompts:

**In Render/Railway dashboard → Environment Variables:**
- `AI_PROVIDER` = `openai` (or `deepseek`)
- `AI_API_KEY` = `your-api-key-here`

---

## 🐛 Troubleshooting

### Domain Not Working?
- Wait 10-30 minutes for DNS propagation
- Check CNAME record is correct
- Verify SSL certificate is active (hosting provider handles this)

### Socket.io Not Connecting?
- Make sure your hosting supports WebSockets (Render & Railway do)
- Check browser console for errors
- Try refreshing the page

### First Load Slow?
- Free tier servers "sleep" after inactivity
- First request wakes them up (takes 30-60 seconds)
- Subsequent requests are fast

---

## 📱 Sharing with Friends

Once deployed, share:
- **Custom Domain**: `https://standout-hemant.duckdns.org`
- **Or Hosting URL**: `https://your-app.onrender.com`

Everyone can play from anywhere! 🌍

---

## 💡 Pro Tips

1. **DuckDNS** is easiest for free subdomains
2. **Railway** doesn't spin down (better for always-on)
3. **Render** is simpler but spins down after 15 min
4. Custom domain looks more professional
5. Bookmark your domain for easy access!

---

## ✅ Checklist

- [ ] Code pushed to GitHub
- [ ] Deployed to Render/Railway
- [ ] Created custom domain (DuckDNS/No-IP)
- [ ] Connected domain to hosting (CNAME)
- [ ] Tested the game
- [ ] Shared with friends!

---

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive guide.

