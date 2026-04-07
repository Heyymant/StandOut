# 🚀 Deploy to Fly.io via GitHub (Free, No Spin Down)

This guide will help you deploy your StandOut game to Fly.io using GitHub Actions. Fly.io offers a **free tier with no spin down** - perfect for keeping your game always available!

## 🎯 Why Fly.io?

- ✅ **Free tier available** (3 shared-cpu VMs)
- ✅ **No spin down** - your app stays running 24/7
- ✅ **160GB outbound data/month** (free)
- ✅ **Automatic HTTPS** included
- ✅ **Global edge network** for fast connections
- ✅ **WebSocket support** for Socket.io

---

## 📋 Prerequisites

1. **GitHub account** (free)
2. **Fly.io account** (free)
3. **Code pushed to GitHub**

---

## 🚀 Step-by-Step Deployment

### Step 1: Create Fly.io Account

1. Go to [fly.io](https://fly.io)
2. Sign up with GitHub (free)
3. Verify your email

### Step 2: Install Fly CLI (Optional - for local testing)

```bash
# Windows (PowerShell)
iwr https://fly.io/install.ps1 -useb | iex

# Mac/Linux
curl -L https://fly.io/install.sh | sh
```

### Step 3: Login to Fly.io

```bash
flyctl auth login
```

This will open your browser to authenticate.

### Step 4: Create Fly.io App

```bash
# From your project root directory
flyctl launch
```

When prompted:
- **App name**: `standout-game` (or your choice - must be unique)
- **Region**: Choose closest to you (e.g., `iad` for US East, `ord` for US Central)
- **Postgres/Redis**: No (we don't need databases)
- **Deploy now**: No (we'll use GitHub Actions)

### Step 5: Get Fly.io API Token

1. Go to [Fly.io Dashboard](https://fly.io/dashboard)
2. Click on your profile → **Access Tokens**
3. Click **Create Token**
4. Name it: `github-deploy`
5. **Copy the token** - you'll need it in the next step

### Step 6: Add GitHub Secret

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FLY_API_TOKEN`
5. Value: Paste your Fly.io API token
6. Click **Add secret**

### Step 7: Update fly.toml (if needed)

The `fly.toml` file is already configured, but you may want to:
- Change `app = "standout-game"` to match your app name
- Change `primary_region` to your preferred region

### Step 8: Push to GitHub

```bash
git add .
git commit -m "Add Fly.io deployment"
git push origin main
```

### Step 9: Deploy!

GitHub Actions will automatically:
1. Build your app
2. Deploy to Fly.io
3. Keep it running (no spin down!)

Check deployment status:
- Go to your GitHub repo → **Actions** tab
- You should see "Deploy to Fly.io" workflow running

---

## 🔧 Configuration

### Environment Variables

To add environment variables (like AI API keys):

**Option 1: Via Fly.io Dashboard**
1. Go to [Fly.io Dashboard](https://fly.io/dashboard)
2. Select your app
3. Go to **Secrets** tab
4. Click **Add Secret**
5. Add: `AI_PROVIDER=openai`
6. Add: `AI_API_KEY=your-key-here`

**Option 2: Via CLI**
```bash
flyctl secrets set AI_PROVIDER=openai
flyctl secrets set AI_API_KEY=your-key-here
```

### Custom Domain

1. In Fly.io Dashboard → Your App → **Settings**
2. Click **Add Domain**
3. Enter your domain (e.g., `standout.hemant.com`)
4. Follow DNS instructions:
   - Add A record pointing to Fly.io IP
   - Or CNAME to your Fly.io domain

---

## 📱 Your App URL

After deployment, your app will be available at:
```
https://standout-game.fly.dev
```

(Replace `standout-game` with your app name)

---

## 🔄 Automatic Deployments

Every time you push to the `main` branch:
- GitHub Actions automatically builds and deploys
- Your app stays running (no spin down!)
- Zero downtime updates

---

## 💰 Free Tier Limits

Fly.io free tier includes:
- **3 shared-cpu VMs** (1.5GB RAM each)
- **160GB outbound data/month**
- **No spin down** - always running
- **3GB persistent volume storage**

For this game, the free tier is more than enough!

---

## 🐛 Troubleshooting

### Deployment Fails

1. **Check GitHub Actions logs**
   - Go to repo → Actions → Failed workflow
   - Check error messages

2. **Verify Fly.io token**
   - Make sure `FLY_API_TOKEN` secret is set correctly
   - Token should have deployment permissions

3. **Check fly.toml**
   - Verify app name matches your Fly.io app
   - Check port is set to 3001

### App Not Starting

1. **Check Fly.io logs**
   ```bash
   flyctl logs
   ```

2. **Verify environment variables**
   - Check Fly.io dashboard → Secrets
   - Make sure `NODE_ENV=production` is set

3. **Check app status**
   ```bash
   flyctl status
   ```

### Connection Issues

1. **Verify WebSocket support**
   - Fly.io supports WebSockets by default
   - Check browser console for connection errors

2. **Check CORS settings**
   - Make sure `server/index.js` allows your domain
   - Current config allows all origins (`*`)

---

## 🎉 Success!

Your game is now:
- ✅ Deployed on Fly.io (free, no spin down)
- ✅ Automatically deploys from GitHub
- ✅ Always available at `https://your-app.fly.dev`
- ✅ Ready to share with friends!

---

## 📚 Additional Resources

- **Fly.io Docs**: https://fly.io/docs
- **GitHub Actions**: https://docs.github.com/en/actions
- **Fly.io Status**: https://status.fly.io

---

## 🔄 Alternative: Manual Deployment

If you prefer to deploy manually (without GitHub Actions):

```bash
# Build locally
npm run build

# Deploy
flyctl deploy
```

But GitHub Actions is recommended for automatic deployments!

---

## 💡 Pro Tips

1. **Monitor Usage**
   - Check Fly.io dashboard for usage stats
   - Free tier is generous, but monitor data transfer

2. **Multiple Regions**
   - You can deploy to multiple regions for better latency
   - Free tier allows 3 VMs total

3. **Scaling**
   - If you need more resources, Fly.io has paid plans
   - But free tier should handle many concurrent players!

4. **Backups**
   - Your code is on GitHub (backed up)
   - Game state is in-memory (no persistence needed)

---

## 🆘 Need Help?

- **Fly.io Community**: https://community.fly.io
- **Fly.io Discord**: https://fly.io/discord
- **GitHub Issues**: Open an issue in your repo

---

**Happy Deploying! 🚀**

