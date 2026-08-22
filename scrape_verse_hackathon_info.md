# Into the Scrape-Verse Hackathon Summary

> **Host:** WeMakeDevs & Bright Data  
> **Dates:** August 17 – August 23, 2026  
> **Total Prize Pool:** $15,000+ (in prizes, hardware, credits, and swags)  
> **Official Page:** [WeMakeDevs Into the Scrape-Verse](https://www.wemakedevs.org/hackathons/scrape-verse)  
> **Promo Code:** `wemakedevs` ($50 extra credits on Bright Data)  

---

## 💡 Overview & Core Objective
**Into the Scrape-Verse** is an online developer hackathon challenging builders, AI engineers, and developers to build **self-healing, AI-native web scrapers** using Bright Data's **Scraper Studio** and **Bright Data CLI (`bdata`)**.

### The Core Problem
Traditional web scrapers break silently when target websites change their HTML structure, rename CSS classes, or alter DOM layouts. 

### The Solution / Theme
Participants must build web scrapers that can **auto-repair/self-heal** using AI when a website layout changes, while running the entire workflow directly inside coding agents (like Claude Code, Cursor, or Codex) using the `bdata` CLI.

---

## 🎯 Key Submission Rules & Technical Guidelines

1. **Self-Healing Core:** Projects must use **Bright Data Scraper Studio** at their core with at least one real create (`bdata scraper create`) and run (`bdata scraper run`) flow. Proof of execution is provided via the generated `c_*` Collector ID.
2. **Demonstrate Healing:** Show automatic site repair using `bdata scraper heal` when target website elements change.
3. **Downstream Integration:** Wire the `c_*` Collector ID into a real downstream application, such as:
   - Automated API triggers (`POST /dca/trigger`)
   - Scheduled Cron jobs
   - Databases or Search Indexes
   - Autonomous AI Agents / RAG pipelines
   - Dashboards / Messaging bots
4. **Target Selection (Long Tail Focus):** 
   - Scrape **publicly available data only** (no login-walled, paywalled, or personal data).
   - Target niche, long-tail sites (regional e-commerce, B2B catalogs, competitor changelogs, documentation sites).
   - **Do NOT target popular sites** that already have pre-built solutions in Bright Data’s 800+ scraper library.
5. **Terminal-First Workflow:** The coding agent/CLI is the main UI. The Bright Data web dashboard is used only for checking Collector IDs or configuring schedules.
6. **Open Source Submission:** Provide a GitHub repository with clear setup instructions so judges can clone and reproduce the setup. Mask or omit `.env` and secret API keys.

---

## 🛠️ Tech Stack & Workflow Quickstart

```bash
# 1. Login via Bright Data CLI (no global install needed)
npx -p @brightdata/cli bdata login

# 2. Create an AI Scraper
bdata scraper create "<prompt or target URL description>"

# 3. Run the Scraper and get JSON data
bdata scraper run --pretty

# 4. Trigger Self-Healing if website updates
bdata scraper heal "<repair instruction or updated site state>"

# 5. Approve/Reject auto-generated fix
bdata scraper approve <collector_id>
# Or reject: bdata scraper approve <collector_id> --reject
```

---

## 🏆 Prize Tracks & Rewards

Total prize pool worth **$15,000+**:

1. **🏆 Grand Prize - Web-Slinger Track:** Top overall project integrating robust self-healing scrapers into a live production workflow. (Includes NVIDIA DGX Spark AI Supercomputer - $5,000 value).
2. **🦸 Suit-Up Track:** Best technical implementation and downstream integration (e.g., Apple iPads, Keychron Mechanical Keyboards).
3. **🕷️ Spider-Sense Track:** Best usage of self-healing (`bdata scraper heal`) and resilience under website layout shifts.
4. **🎟️ The Raffle & Swag:** Hardware swags, Iron Man MK5 Helmets, and tech merchandise.
5. **Daily Bugle Track:** Best content creation, building in public, and social sharing.
6. **Bright Data Credits:** Free platform access ($50 extra credits using promo code `wemakedevs`).

---

## 🚀 Suggested Project Ideas for AI & Builder Context

1. **Docs Site → RAG Pipeline:** Scrape documentation sites without API feeds, auto-heal when docs re-theme, and sync knowledge embeddings into a Vector DB.
2. **Competitive Intelligence Agent:** Monitor long-tail B2B pricing or competitor release changelogs and trigger automated alerts when data updates.
3. **Prompt-to-Production Pipeline:** A single prompt triggers `bdata scraper create`, generates a live `c_*` Collector ID, and exposes a production REST endpoint.
4. **CI/CD Scraper Health Monitoring:** Automated tests in GitHub Actions that trigger `bdata scraper heal` on broken scrapers and push automated PR fixes.
5. **Set-and-Forget Automation:** Autonomous background scrapers feeding custom dashboards or Discord/Slack bots with real-time niche market data.
