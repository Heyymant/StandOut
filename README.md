# 🎯 STANDOUT - The Word Game

A multiplayer word game where unique answers win! Play with friends anywhere - WiFi, hotspot, or online!

**Made by [@Heyymant](https://github.com/Heyymant)** | [View on GitHub](https://github.com/Heyymant/standout)

## 🎮 How to Play

1. **Create or Join a Room** - One player creates a room, others join using the Room ID
2. **Select 5 Prompts** - The host selects prompts from various categories
3. **Roll a Letter** - A random letter is chosen for each round
4. **Write Words** - 60 seconds to answer all prompts with words starting with that letter
5. **Score Points** - Unique answers = 1 point, Duplicate answers = 0 points
6. **3 Rounds** - Same prompts, different letter each round
7. **Win!** - Highest score after 3 rounds wins

## ✨ Features

### Game Features
- 🎲 Random letter roll (excluding difficult letters like X, Z)
- 📝 Curated prompts in 8 categories (Science, India & Culture, Entertainment, etc.)
- ⏱️ 60-second timer per round
- 📊 Real-time scoring and leaderboards
- 🔄 Play Again with the same room/players
- 📱 Mobile-friendly responsive design

### Multiplayer Features
- 🌐 Play on the same WiFi network
- 👥 Up to 10 players per room
- 👑 Host controls (start game, kick players, next round)
- 🔄 Automatic host transfer if host disconnects
- 📡 Real-time submission status

### Edge Cases Handled
- ✅ Empty submissions (count as 0 points)
- ✅ Player disconnection mid-game
- ✅ Host disconnection (transfers to next player)
- ✅ Network reconnection
- ✅ Duplicate word detection
- ✅ Invalid word validation (wrong starting letter)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- All players on the same WiFi network
- (Optional) OpenAI or DeepSeek API key for AI-generated prompts

### Installation & Running

```bash
# Install dependencies
npm install

# (Optional) Configure AI for unique prompts
cp .env.example .env
# Edit .env and add your API key

# Start both server and frontend together (recommended)
npm run dev

# OR start separately (for debugging)
npm run dev:server   # Terminal 1 - Server
npm run dev:client   # Terminal 2 - Frontend
```

### Testing the App

**Quick Test:**
1. Open `http://localhost:3000` in your browser
2. Create a room and start playing solo
3. Test all features: prompts, voting, scoring

**Multiplayer Test:**
1. Open multiple browser windows/tabs
2. Create room in one, join from others
3. Play together!

**Mobile Test:**
1. Find your IP: Check server console for "Network: http://YOUR_IP:3000"
2. On mobile (same WiFi): Open `http://YOUR_IP:3000`
3. Join the room and play!

📖 **See [TESTING.md](./TESTING.md) for detailed testing guide**

## 🤖 AI-Powered Prompts (Optional)

The game can use **ChatGPT** or **DeepSeek** to generate unique, creative prompts for each game!

### Setup AI Prompts

1. Create a `.env` file in the project root:

```bash
# For OpenAI (ChatGPT)
AI_PROVIDER=openai
AI_API_KEY=sk-your-openai-api-key-here

# OR for DeepSeek (cheaper alternative)
AI_PROVIDER=deepseek
AI_API_KEY=sk-your-deepseek-api-key-here
```

2. Restart the server after adding your API key

3. In the game, toggle "🤖 AI Prompts" to enable AI-generated prompts

### Without AI

The game works perfectly fine without AI! It includes **150+ curated prompts** across 15 categories. The AI is optional and just adds variety.

### AI Prompt Categories

When AI is enabled, you can generate prompts in these themes:
- **Mixed** - Diverse mix of topics
- **Easy** - Simple, broad categories
- **Tricky** - Abstract, thought-provoking
- **Desi** - Indian culture & Bollywood
- **Funny** - Humorous, quirky prompts
- **Pop Culture** - Movies, TV, celebrities
- **Food** - Cuisines and dishes
- **Science** - Tech and science topics

### Playing the Game

1. **Create a Room (Host)**
   - Open `http://localhost:3000` in your browser
   - Enter your name and click "Create Room"
   - Share the Room ID with other players

2. **Join a Room (Players)**
   - Open `http://<host-ip>:3000` in your browser
   - Enter your name and the Room ID
   - Click "Join Room"

3. **Network Connection**
   - The server will display the network IP on startup
   - All players should use this IP to connect
   - Example: `http://192.168.1.100:3000`

## 📁 Project Structure

```
Uncommon/
├── server/
│   └── index.js          # Express + Socket.io server
├── src/
│   ├── components/
│   │   ├── Lobby.jsx         # Create/Join room UI
│   │   ├── GameBoard.jsx     # Main game container
│   │   ├── PromptSelection.jsx # Host prompt selection
│   │   ├── GameRound.jsx     # Active gameplay
│   │   ├── ReviewRound.jsx   # Round review & scores
│   │   └── GameFinished.jsx  # Final results & play again
│   ├── App.jsx              # Root component
│   └── index.css            # Global styles
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Game Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         LOBBY                               │
│  - Create Room / Join Room                                 │
│  - Players see each other in waiting room                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    PROMPT SELECTION (Host)                  │
│  - Select/shuffle 5 prompts                                │
│  - Choose from 8 categories                                │
│  - Start game when ready                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    GAME ROUND (×3)                          │
│  - Random letter rolled                                    │
│  - 60 seconds to answer all prompts                        │
│  - See who has submitted                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    ROUND REVIEW                             │
│  - See all answers                                         │
│  - Unique = +1, Duplicate = 0                              │
│  - View by prompt or by player                             │
│  - Host starts next round                                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    GAME FINISHED                            │
│  - Final leaderboard                                       │
│  - Round history                                           │
│  - Play Again (same room) or Leave                         │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Free Deployment with Custom Domain

Deploy your game for FREE with a custom domain like `standout.hemant` or `standout.io`!

### ⚡ Quick Start (20 minutes)

**📖 See [QUICK_START_DEPLOY.md](./QUICK_START_DEPLOY.md) for 3-step guide**

**📚 Full Guide: [DEPLOY_FREE_DOMAIN.md](./DEPLOY_FREE_DOMAIN.md)**

### What You Get:
- ✅ Free custom domain (DuckDNS, No-IP, or Freenom)
- ✅ Free hosting (Render.com or Railway.app)
- ✅ Works on WiFi, hotspot, or anywhere
- ✅ **URL displayed prominently in-game** for easy sharing!
- ✅ 100% FREE - No credit card needed!

### Quick Deploy Options

#### Option 1: Vercel (Frontend) + Render/Railway (Backend) ⭐ Recommended
- ✅ **Frontend**: Vercel (fast CDN, free)
- ✅ **Backend**: Render/Railway (Socket.io support)
- ✅ Best performance + reliability
- 📝 See **[DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)** for step-by-step guide

#### Option 2: Render.com (Full Stack)
- ✅ Free tier (750 hrs/month)
- ✅ One-click deploy from GitHub
- ✅ Custom domain support
- ⚠️ Spins down after 15 min (use UptimeRobot to keep awake - see `KEEP_RENDER_AWAKE.md`)
- 📝 See `render.yaml` for auto-configuration

#### Option 3: Railway.app (Full Stack)
- ✅ Free tier ($5 credit/month)
- ✅ No spin-down
- ✅ Easy GitHub integration
- 📝 See `railway.json` for configuration

### Quick Start Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Render or Railway**
   - Connect your GitHub repo
   - Auto-detects configuration
   - Add environment variables (optional AI keys)
   - Deploy!

3. **Your game is live!** 🎉
   - Share the URL with friends
   - Works from anywhere, not just same WiFi!

> **Note**: Free tier servers may "sleep" after inactivity. First load might take 30 seconds.

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + Socket.io
- **Styling**: CSS with CSS Variables
- **Fonts**: JetBrains Mono, Inter

## 📱 Mobile Support

The game is fully responsive and works on:
- Desktop browsers
- Mobile phones (iOS/Android)
- Tablets

All devices on the same WiFi network can play together!

## 🎯 Scoring Rules

| Scenario | Points |
|----------|--------|
| Unique answer | +1 |
| Duplicate answer (2+ players) | 0 |
| Empty/skipped | 0 |
| Invalid (wrong letter) | 0 |

## 👤 Author

**Heyymant**
- GitHub: [@Heyymant](https://github.com/Heyymant)
- Repository: [standout](https://github.com/Heyymant/standout)

## 📝 License

MIT License - feel free to use and modify!
