# 🔄 Keep Render Awake - Free Method

Prevent Render's free tier from spinning down using UptimeRobot (100% free, no credit card needed).

---

## 🎯 Why This Works

Render's free tier spins down after **15 minutes** of inactivity. By pinging your URL every **10-14 minutes**, you keep it awake 24/7!

---

## 📋 Step-by-Step Guide: UptimeRobot

### **Step 1: Sign Up for UptimeRobot** (2 minutes)

1. **Go to UptimeRobot**
   - Visit: https://uptimerobot.com
   - Click **"Sign Up"** (top right)

2. **Create Account**
   - Enter your email
   - Choose a password
   - Click **"Sign Up"**
   - Verify your email (check inbox)

3. **Login**
   - Go back to https://uptimerobot.com
   - Click **"Login"**
   - Enter your credentials

---

### **Step 2: Add Your Render Service** (3 minutes)

1. **Get Your Render URL**
   - Go to your Render dashboard
   - Open your web service
   - Copy the URL (e.g., `https://standout-backend.onrender.com`)
   - **Important**: Use your backend URL, not frontend

2. **Add Monitor in UptimeRobot**
   - In UptimeRobot dashboard, click **"+ Add New Monitor"**
   - Select **"HTTP(s)"** monitor type

3. **Configure Monitor**
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: `StandOut Backend` (or any name)
   - **URL**: Paste your Render URL
     - Example: `https://standout-backend.onrender.com`
   - **Monitoring Interval**: **5 minutes** (recommended)
     - Free tier allows up to 50 monitors with 5-minute intervals
   - **Alert Contacts**: Select your email (or skip for now)

4. **Save**
   - Click **"Create Monitor"**
   - ✅ Done! Your service will be pinged every 5 minutes

---

### **Step 3: Verify It's Working** (2 minutes)

1. **Check Monitor Status**
   - In UptimeRobot dashboard
   - You should see your monitor with status **"Up"** (green)
   - Click on it to see ping history

2. **Test Your Render Service**
   - Wait 20+ minutes
   - Visit your Render URL directly
   - Should load instantly (no spin-up delay!)
   - ✅ Success! Your service is staying awake

---

## 🎯 Alternative: Cron-job.org

If you prefer Cron-job.org:

### **Step 1: Sign Up**
1. Go to: https://cron-job.org
2. Sign up with email (free)
3. Verify email

### **Step 2: Create Cron Job**
1. Click **"Create Cronjob"**
2. Configure:
   - **Title**: `Keep Render Awake`
   - **Address**: Your Render URL (e.g., `https://standout-backend.onrender.com`)
   - **Schedule**: Every **10 minutes**
     - Use: `*/10 * * * *` (cron syntax)
   - **Request Method**: GET
3. Click **"Create"**

### **Step 3: Verify**
- Check cron job runs successfully
- Your Render service stays awake!

---

## ⚙️ Recommended Settings

### **UptimeRobot (Recommended)**
- **Interval**: 5 minutes (free tier allows this)
- **Monitor Type**: HTTP(s)
- **URL**: Your Render backend URL
- **Status**: Should show "Up" (green)

### **Why 5 minutes?**
- Render spins down after 15 minutes
- Pinging every 5 minutes keeps it awake
- Well within the 15-minute window
- Free tier supports this interval

---

## 🔍 Troubleshooting

### Monitor Shows "Down" (Red)

1. **Check Your Render URL**
   - Make sure it's correct
   - Should be `https://your-app.onrender.com`
   - Test it in browser first

2. **Check Render Service Status**
   - Go to Render dashboard
   - Make sure service is deployed and running
   - Check logs for errors

3. **Wait a Few Minutes**
   - First ping might fail if service was sleeping
   - Should work after first successful ping

### Service Still Spins Down

1. **Check Ping Interval**
   - Make sure it's set to 5-10 minutes
   - Not longer than 14 minutes

2. **Check Monitor is Active**
   - In UptimeRobot, verify monitor is enabled
   - Should show green "Up" status

3. **Check URL is Correct**
   - Must be your backend URL
   - Include `https://`
   - No trailing slash

---

## 💡 Pro Tips

1. **Use Backend URL**
   - Ping your backend URL (Render service)
   - Not your frontend URL (if using Vercel)
   - Backend is what needs to stay awake

2. **Health Check Endpoint** (Optional)
   - You can ping `/api/health` endpoint
   - Example: `https://standout-backend.onrender.com/api/health`
   - Returns JSON, lighter than full page

3. **Monitor Multiple Services**
   - Free UptimeRobot allows 50 monitors
   - Can monitor both backend and frontend
   - Useful if you have multiple services

4. **Email Alerts** (Optional)
   - Set up email alerts in UptimeRobot
   - Get notified if service goes down
   - Free tier includes email alerts

---

## ✅ Checklist

- [ ] Signed up for UptimeRobot
- [ ] Added monitor with Render backend URL
- [ ] Set interval to 5 minutes
- [ ] Monitor shows "Up" (green)
- [ ] Tested after 20+ minutes - loads instantly
- [ ] Service stays awake 24/7!

---

## 🎉 You're Done!

Your Render service will now:
- ✅ Stay awake 24/7
- ✅ Load instantly (no spin-up delay)
- ✅ Work reliably for your game
- ✅ **100% FREE** - No credit card needed!

---

## 📊 What Happens Now

**Before** (without UptimeRobot):
- Service sleeps after 15 min
- First request: 30-60 second delay
- Subsequent requests: Fast

**After** (with UptimeRobot):
- Service stays awake 24/7
- All requests: Instant
- No delays ever!

---

## 🆘 Need Help?

- **UptimeRobot Docs**: https://uptimerobot.com/help/
- **Cron-job.org Docs**: https://cron-job.org/en/help/
- **Render Docs**: https://render.com/docs

---

**Your game will now be fast and reliable!** 🚀

