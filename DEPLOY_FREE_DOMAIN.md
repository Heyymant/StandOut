# 🚀 Free Domain Deployment Guide - STANDOUT Game

Deploy your game for FREE with a custom domain like `standout.hemant` or `standout.io` so friends can easily connect!

---

## 📋 What You'll Get

- ✅ Free custom domain (e.g., `standout.hemant.ddns.net` or `standout.hemant.duckdns.org`)
- ✅ Free hosting (Render.com or Railway.app)
- ✅ Works on WiFi, hotspot, or anywhere
- ✅ Easy-to-share URL displayed in-game
- ✅ **100% FREE** - No credit card required!

---

## 🎯 Step-by-Step Guide

### **PART 1: Get a Free Domain** (5 minutes)

#### Option A: DuckDNS (Recommended - Easiest)

1. **Go to DuckDNS**
   - Visit: https://www.duckdns.org
   - Click **"Sign in with Google"** or **"Sign in with GitHub"**
   - Authorize DuckDNS

2. **Create Your Domain**
   - Click **"Add Domain"**
   - Enter subdomain: `standout-hemant` (or any name you like)
   - Click **"Add Domain"**
   - ✅ You now have: `standout-hemant.duckdns.org`

3. **Note Your Token**
   - Copy the token shown on the page (you'll need it later)
   - Example: `abc12345-6789-efgh-ijkl-mnopqrstuvwx`

**That's it!** Your domain is ready. Now move to Part 2.

---

#### Option B: No-IP (Alternative)

1. **Go to No-IP**
   - Visit: https://www.noip.com
   - Click **"Sign Up"** (free account)
   - Verify your email

2. **Create Hostname**
   - Go to **"Dynamic DNS"** → **"Hostnames"**
   - Click **"Create Hostname"**
   - Hostname: `standout-hemant`
   - Domain: Choose `.ddns.net` (free)
   - Click **"Create Hostname"**
   - ✅ You now have: `standout-hemant.ddns.net`

3. **Download Dynamic Update Client** (Optional)
   - Only needed if hosting on your own computer
   - For cloud hosting (Render/Railway), skip this

---

#### Option C: Freenom (Free .tk/.ml/.ga domains)

1. **Go to Freenom**
   - Visit: https://www.freenom.com
   - Search for a domain (e.g., `standout`)
   - Choose `.ga`, `.ml`, `.tk`, or `.cf` (all free)

2. **Register Domain**
   - Add to cart → Checkout
   - Create account → Complete registration
   - ✅ You now have: `standout.ga` (or your chosen domain)

3. **Add Subdomain** (Optional)
   - In domain management, add subdomain: `hemant`
   - ✅ You now have: `hemant.standout.ga`

---

### **PART 2: Deploy to Free Hosting** (10 minutes)

#### Option 1: Render.com (Recommended)

1. **Push Code to GitHub**
   ```bash
   # If not already on GitHub:
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Render**
   - Go to: https://render.com
   - Sign up with GitHub (free)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Render auto-detects settings from `render.yaml`:
     - **Name**: `standout-game` (or any name)
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: **Free**
   - Click **"Create Web Service"**

3. **Wait for Deployment**
   - Takes ~5-10 minutes
   - You'll get: `https://standout-game.onrender.com` (or similar)

4. **Copy Your Render URL**
   - Go to your service dashboard
   - Copy the URL (e.g., `standout-game.onrender.com`)

---

#### Option 2: Railway.app (Alternative)

1. **Deploy on Railway**
   - Go to: https://railway.app
   - Sign up with GitHub (free)
   - Click **"New Project"** → **"Deploy from GitHub repo"**
   - Select your repository
   - Railway auto-detects Node.js

2. **Configure** (if needed)
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

3. **Get Your URL**
   - Railway provides: `standout-game.railway.app`
   - Copy this URL

---

### **PART 3: Connect Domain to Hosting** (5 minutes)

#### For DuckDNS:

1. **Go to DuckDNS Dashboard**
   - Visit: https://www.duckdns.org
   - Find your domain: `standout-hemant`

2. **Add CNAME Record**
   - In the domain settings, look for DNS settings
   - Add CNAME record:
     - **Type**: CNAME
     - **Name**: `standout-hemant` (or `@`)
     - **Value**: `your-app.onrender.com` (your Render URL)
   - OR use the DuckDNS API to update:
     ```
     https://www.duckdns.org/update?domains=standout-hemant&token=YOUR_TOKEN&txt=your-app.onrender.com
     ```

3. **Wait 5-10 minutes** for DNS propagation

4. **Test**
   - Visit: `https://standout-hemant.duckdns.org`
   - Should show your game!

---

#### For No-IP:

1. **Go to No-IP Dashboard**
   - Visit: https://www.noip.com
   - Go to **"Dynamic DNS"** → **"Hostnames"**

2. **Update DNS**
   - Click on your hostname: `standout-hemant.ddns.net`
   - Go to **"DNS Settings"** or **"Modify"**
   - Change **"Record Type"** to **"CNAME"**
   - **Target**: `your-app.onrender.com` (your Render URL)
   - Save

3. **Wait 5-10 minutes**

4. **Test**
   - Visit: `https://standout-hemant.ddns.net`

---

#### For Freenom:

1. **Go to Freenom Domain Manager**
   - Visit: https://my.freenom.com
   - Click on your domain

2. **Add CNAME Record**
   - Go to **"Manage Domain"** → **"Nameservers"**
   - Add CNAME:
     - **Name**: `hemant` (or `@`)
     - **Type**: CNAME
     - **Target**: `your-app.onrender.com`
   - Save

3. **Wait 10-30 minutes** (Freenom can be slower)

4. **Test**
   - Visit: `https://hemant.standout.ga`

---

### **PART 4: Configure SSL (HTTPS)** (Automatic!)

Both Render and Railway automatically provide SSL certificates:
- ✅ Your domain will work with `https://`
- ✅ No extra configuration needed
- ✅ Wait 5-10 minutes after connecting domain

---

## 🎮 Using Your Domain

### **Share with Friends:**

1. **Open your game** at your custom domain
2. **Create a room** - you'll see the Room Code
3. **Share the URL** - displayed prominently in-game:
   - In Lobby: Shows connection URL
   - In Game: Shows Room Code + URL
   - Easy copy buttons!

### **Friends Connect:**

1. Open the URL you shared (e.g., `https://standout-hemant.duckdns.org`)
2. Click **"Join Room"**
3. Enter Room Code
4. Start playing!

---

## 📱 Works On:

- ✅ Same WiFi network
- ✅ Mobile hotspot
- ✅ Different networks (anywhere!)
- ✅ Mobile phones
- ✅ Tablets
- ✅ Desktop computers

---

## 🔧 Troubleshooting

### Domain Not Working?

1. **Wait longer** - DNS can take 10-30 minutes
2. **Check CNAME record** - Make sure it points to your hosting URL
3. **Verify SSL** - Wait for HTTPS certificate (automatic)
4. **Test with hosting URL first** - Make sure hosting works

### Hosting Issues?

1. **Render Free Tier** - Spins down after 15 min inactivity
   - First load may take 30 seconds
   - Subsequent loads are fast

2. **Railway Free Tier** - More reliable, but has usage limits

### Connection Issues?

1. **Check browser console** for errors
2. **Verify Socket.io** is working (check network tab)
3. **Try hosting URL directly** first

---

## 💡 Pro Tips

1. **DuckDNS** is easiest for beginners
2. **Render** is simpler but spins down
3. **Railway** is more reliable but has limits
4. **Bookmark your domain** for easy access
5. **Share the full URL** with friends (including `https://`)

---

## ✅ Quick Checklist

- [ ] Created free domain (DuckDNS/No-IP/Freenom)
- [ ] Deployed to Render/Railway
- [ ] Connected domain to hosting (CNAME)
- [ ] Waited for DNS propagation (10-30 min)
- [ ] Tested domain in browser
- [ ] Shared URL with friends!

---

## 🆘 Need Help?

- **DuckDNS Docs**: https://www.duckdns.org/install.jsp
- **Render Docs**: https://render.com/docs
- **Railway Docs**: https://docs.railway.app
- **Check**: `TROUBLESHOOTING.md` in this repo

---

## 🎉 You're Done!

Your game is now live at your custom domain! Share it with friends and start playing! 🎮

**Example URLs:**
- `https://standout-hemant.duckdns.org`
- `https://standout-hemant.ddns.net`
- `https://hemant.standout.ga`

All work the same way - just share the URL! 🚀

