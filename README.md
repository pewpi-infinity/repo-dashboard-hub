# 🎮 AC Dashboard - Pewpi Infinity Quantum System

A comprehensive repository dashboard for monitoring GitHub repositories with real-time cryptocurrency tracking, health monitoring, and production-grade authentication and wallet management.

## ✨ Features

- **Repository Dashboard**: Monitor all your GitHub repositories in one place
- **Production Authentication**: Passwordless magic-link login + optional GitHub OAuth
- **Unified Wallet System**: Track tokens across all Pewpi Infinity repos with real-time sync
- **Real-time Crypto Tracking**: Track cryptocurrency prices powered by CoinGecko API
- **Health Monitoring**: Track repository health scores and activity metrics
- **MongoDB Integration**: Direct client-side connection for automated multi-repo systems
- **Repository Scanning**: Automatic file scanning with change detection
- **Multiple Views**: Dashboard, Quantum Cockpit, Cluster View, and more
- **Dark Theme**: Beautiful quantum-themed UI with animations
- **Cross-Repo Sync**: Automatic wallet and login state sync across tabs and repos
- **Optional P2P Sync**: WebRTC-based peer-to-peer synchronization with encryption

## 🤖 Automated Multi-Repo Systems

This dashboard is built to integrate seamlessly with automated multi-repository systems:

- **Production Authentication**: Magic-link (passwordless) login that works without GitHub accounts
- **Unified Token System**: IndexedDB-backed token management with localStorage fallback
- **Cross-Repo Synchronization**: Automatic wallet/login state sync via window events
- **Direct Client-Side MongoDB**: No backend required - connects directly from browser
- **Token Management**: Works with automatic token rotation and credential management systems
- **Terminal Commits**: Supports programmatic commits through terminal/Python scripts
- **Research Scraping**: Built to aggregate and tie together research data from multiple sources
- **Continuous Integration**: Designed for never-ending automatic website builder workflows

## 🔐 Authentication & Wallet

### Production Login Flow

No GitHub account required! Users can authenticate using:
- **Magic-link (default)**: Passwordless email authentication with dev-mode support
- **GitHub OAuth (optional)**: Opt-in GitHub authentication for users who prefer it

### Unified Wallet System

Track tokens across all Pewpi Infinity repositories:
- **Infinity Tokens** 💎 - Core system tokens
- **Research Tokens** 📚 - Earned from infinity-brain-search and research activities
- **Art Tokens** 🎨 - Earned from banksy and art-related activities  
- **Music Tokens** 🎵 - Earned from v and music-related activities

### Cross-Repo Integration

The wallet system automatically syncs across:
- repo-dashboard-hub
- banksy
- v
- infinity-brain-search
- Any other Pewpi Infinity repository

See [docs/INTEGRATION.md](docs/INTEGRATION.md) for integration guide.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (MongoDB Atlas recommended) - Optional
- GitHub Personal Access Token - Optional (for GitHub features only)
- CoinGecko API (free tier, no key required)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pewpi-infinity/repo-dashboard-hub.git
   cd repo-dashboard-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `VITE_MONGODB_URI`: Your MongoDB connection string
   - `VITE_GITHUB_TOKEN`: GitHub Personal Access Token
   - `VITE_ORG_NAME`: Your GitHub organization/username

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### MongoDB Setup

This application uses direct client-side MongoDB connections designed for automated multi-repo systems with automatic token and credential management.

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address or allow access from anywhere (0.0.0.0/0)
5. Get your connection string and add it to `.env`

Example connection string:
```
VITE_MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/repo-dashboard?retryWrites=true&w=majority
```

**Note**: For automated systems with credential rotation, ensure your token management system updates the VITE_MONGODB_URI environment variable as needed.

### GitHub Token Setup

1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token (classic)
3. Select scopes:
   - `repo` - Full control of private repositories
   - `read:org` - Read org and team membership
   - `read:user` - Read user profile data
4. Copy the token and add it to `.env`

### CoinGecko API

The free tier of CoinGecko doesn't require an API key. If you want to use a paid plan for higher rate limits, you can add:
```
VITE_COINGECKO_API_KEY=your_api_key_here
```

## 📊 MongoDB Collections

The application uses the following MongoDB collections:

### Repositories
Stores GitHub repository metadata and sync information:
```typescript
{
  github_id: number
  name: string
  owner: string
  full_name: string
  description: string
  url: string
  language: string
  stars: number
  forks: number
  last_sync: Date
  health_score: number
  file_count: number
}
```

### Files
Tracks all files in repositories with change detection:
```typescript
{
  repo_id: ObjectId
  path: string
  filename: string
  content_hash: string
  size: number
  language: string
  last_updated: Date
  content_preview: string
}
```

### Activity
Logs repository events and changes:
```typescript
{
  repo_id: ObjectId
  event_type: string
  timestamp: Date
  details: object
}
```

### CryptoTracking
Stores cryptocurrency price data:
```typescript
{
  symbol: string
  name: string
  price_usd: number
  price_change_24h: number
  market_cap: number
  volume_24h: number
  last_updated: Date
  user_holdings: number
}
```

## 🎯 Usage

### Repository Scanning

The application can scan all your repositories and detect file changes:

```typescript
import { scanAllRepositories } from './lib/repo-scanner'
import { Octokit } from 'octokit'

const octokit = new Octokit({ auth: process.env.VITE_GITHUB_TOKEN })
const results = await scanAllRepositories(octokit, 'your-username')
```

### Crypto Price Tracking

Fetch real-time cryptocurrency prices:

```typescript
import { fetchCryptoPrices } from './lib/crypto-api'

const prices = await fetchCryptoPrices(['bitcoin', 'ethereum', 'cardano'])
```

### MongoDB Integration

Connect and use MongoDB models:

```typescript
import { connectToDatabase } from './lib/mongodb'
import Repository from './lib/models/Repository'

await connectToDatabase()
const repos = await Repository.find({ owner: 'your-username' })
```

## 🛠️ Development

### Project Structure

```
src/
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── Login.tsx      # Production login component
│   ├── Wallet.tsx     # Comprehensive wallet UI
│   ├── CryptoPriceTracker.tsx
│   ├── DashboardMetrics.tsx
│   └── ...
├── lib/               # Utility libraries
│   ├── shared/        # Shared pewpi-token system
│   │   ├── token-service.ts     # Token management (Dexie)
│   │   ├── auth-service.ts      # Authentication service
│   │   ├── client-model.ts      # Mongoose-style frontend models
│   │   ├── crypto-helpers.ts    # AES-GCM & ECDH encryption
│   │   ├── integration-listener.ts # Event subscription helpers
│   │   ├── peer-sync.ts         # Optional P2P sync
│   │   └── theme.css            # Shared theme variables
│   ├── models/        # MongoDB models
│   │   ├── Repository.ts
│   │   ├── File.ts
│   │   ├── Activity.ts
│   │   └── CryptoTracking.ts
│   ├── mongodb.ts     # MongoDB connection
│   ├── crypto-api.ts  # CoinGecko API client
│   ├── repo-scanner.ts # Repository scanning
│   └── github-api.ts  # GitHub API client
├── styles/            # CSS styles
└── App.tsx            # Main application
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage report

### Testing

The project includes comprehensive tests:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

Test coverage includes:
- **TokenService**: Unit tests for token creation, retrieval, balances, and events
- **ClientModel**: Unit tests for CRUD operations and mongoose-style queries
- **E2E Tests**: Full user journey from login to wallet management

## 🌐 Deployment

### GitHub Pages

The application is configured for GitHub Pages deployment:

1. Push changes to the main branch
2. GitHub Actions will automatically build and deploy
3. Access at: `https://your-username.github.io/repo-dashboard-hub/`

The `base` path in `vite.config.ts` is set to `/repo-dashboard-hub/` for GitHub Pages.

## 🔒 Security

- Never commit `.env` file or expose API keys
- Use environment variables for all sensitive data
- MongoDB connection strings should use strong passwords
- GitHub tokens should have minimal required scopes
- Regularly rotate API keys and tokens

## 📝 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
