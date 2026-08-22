# Web Miner — Self-Healing Web Scraper

> Built for [Into the Scrape-Verse](https://www.wemakedevs.org/hackathons/scrape-verse) hackathon (August 17–23, 2026)

Web Miner is a self-healing web scraper that automatically repairs broken CSS selectors when websites change their HTML layout. It uses **Bright Data's Scraper Studio** for extraction and **Google Gemini AI** for analysis, with the entire workflow running from the terminal via the `bdata` CLI.

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐     ┌──────────────┐
│  Target URL  │────▶│  Bright Data     │────▶│  Gemini AI  │────▶│  Dashboard   │
│  (any site)  │     │  Scraper Studio  │     │  Analysis   │     │  (React)     │
└─────────────┘     └──────────────────┘     └─────────────┘     └──────────────┘
                           │                        │
                           ▼                        ▼
                    ┌──────────────┐         ┌──────────────┐
                    │  Self-Heal   │         │  Strategic   │
                    │  (bdata heal)│         │  Alerts      │
                    └──────────────┘         └──────────────┘
```

## How It Works

1. **Scrape** — `bdata scraper create` builds an AI-powered scraper for any public URL
2. **Run** — `bdata scraper run` extracts structured data via Bright Data's proxy network
3. **Analyze** — Gemini AI (gemini-2.5-flash) processes content and extracts strategic insights
4. **Self-Heal** — `bdata scraper heal` automatically repairs broken selectors when sites change
5. **Approve** — `bdata scraper approve` lets you accept or reject the AI-generated fix

## Tech Stack

- **Bright Data CLI** (`bdata`) — Scraper creation, execution, and self-healing
- **Bright Data Scraper Studio** — AI-powered web extraction with proxy rotation
- **Google Gemini AI** (gemini-2.5-flash) — Content analysis and insight extraction
- **TanStack Start** + **React 19** — Full-stack React framework
- **Tailwind CSS v4** + **shadcn/ui** — Design system and component library
- **TypeScript** — Type-safe development

## Setup

### Prerequisites

- Node.js 18+ (install with [nvm](https://github.com/nvm-sh/nvm))
- npm
- Bright Data account (free tier works)

### 1. Clone and install

```bash
git clone https://github.com/EklavyaJain1/gumloop-reimagined.git
cd gumloop-reimagined
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# Required: Bright Data API token
# Get from: https://brightdata.com/account/api
BRIGHT_DATA_API_TOKEN=your_token_here

# Required: Google Gemini AI key
# Get from: https://aistudio.google.com/apikey
GEMINI_API_KEY=your_key_here
```

### 3. Authenticate with Bright Data

```bash
npx -p @brightdata/cli bdata login
```

This opens a browser for authentication. Complete the flow.

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page, then navigate to `/dashboard` to try the scraper pipeline.

## Usage

### Create a scraper

```bash
npx -p @brightdata/cli bdata scraper create "https://example.com" "Extract product names and prices from the pricing page"
```

### Run the scraper

```bash
npx -p @brightdata/cli bdata scraper run <collector_id> --pretty
```

### Self-heal broken selectors

```bash
# When a website changes its layout:
npx -p @brightdata/cli bdata scraper heal <collector_id> "The pricing page moved from /pricing to /plans"

# Approve the fix:
npx -p @brightdata/cli bdata scraper approve <collector_id>

# Or reject:
npx -p @brightdata/cli bdata scraper approve <collector_id> --reject
```

## Dashboard

The dashboard at `/dashboard` provides:

- **Visual pipeline** — 3-node graph showing Target → Scrape → AI Analysis
- **Live alerts** — Strategic insights extracted by Gemini AI
- **Raw scrape preview** — View the scraped content
- **Status indicators** — Real-time pipeline status

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   └── canvas.tsx          # Dashboard with pipeline visualization
│   ├── landing/
│   │   ├── hero.tsx            # Landing page hero with workflow canvas
│   │   ├── pipeline.tsx        # Pipeline editor section
│   │   ├── console.tsx         # Terminal/workspace section
│   │   ├── insights.tsx        # Features section
│   │   ├── bento.tsx           # Feature grid
│   │   ├── closing.tsx         # Pricing, FAQ, footer
│   │   ├── header.tsx          # Navigation
│   │   ├── node-modals.tsx     # Configuration modals
│   │   └── primitives.tsx      # Shared UI components
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── pipeline.ts             # Server functions for scraping + AI
├── routes/
│   ├── index.tsx               # Landing page
│   ├── dashboard.tsx           # Dashboard page
│   └── __root.tsx              # Root layout
└── styles.css                  # Tailwind + design tokens
```

## Evidence

See the `evidence/` directory for:

- `run_output.json` — Raw scraper output
- `heal_before_after/` — Selector repair diffs

## License

MIT
