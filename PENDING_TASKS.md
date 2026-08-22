# Pending Tasks — Into the Scrape-Verse Hackathon

Repo: https://github.com/EklavyaJain1/gumloop-reimagined
Deadline: August 23, 2026
Current state: Frontend-only Lovable clone of gumloop.com (React + Vite + TS + shadcn/ui). No Bright Data / scraper / self-healing / backend work exists yet.

Use this file as a task list for AI coding agents (Claude Code, Cursor, Codex). Work top to bottom — each task blocks the ones below it.

---

## 0. Setup
- [ ] Install Bright Data CLI and confirm auth: `npx -p @brightdata/cli bdata login`
- [ ] Apply promo code `wemakedevs` for extra credits on Bright Data account
- [ ] Decide the target site now (see Task 1) — everything else depends on this

## 1. Pick the scrape target (long-tail only)
- [ ] Choose ONE niche/long-tail public site: regional e-commerce, B2B catalog, competitor changelog, or a documentation site with no API
- [ ] Confirm it is NOT in Bright Data's 800+ pre-built scraper library (disqualifying if it is)
- [ ] Confirm target data is fully public (no login wall, no paywall, no personal data)
- [ ] Write down the exact URL(s) and the fields to extract

## 2. Core scraper (Bright Data Scraper Studio)
- [ ] Run `bdata scraper create "<prompt or target URL description>"` for the chosen site
- [ ] Run `bdata scraper run --pretty` and capture the generated Collector ID (`c_*`)
- [ ] Save the raw JSON output as proof-of-execution evidence in the repo (e.g. `/evidence/run_output.json`)

## 3. Self-healing demo (this is the theme — currently 0% done)
- [ ] Identify or force a layout change on the target (rename a class, restructure a section, or pick a site known to shift markup)
- [ ] Run `bdata scraper heal "<repair instruction or updated site state>"`
- [ ] Run `bdata scraper approve <collector_id>` (or `--reject` if showing rejection flow too)
- [ ] Capture before/after diffs (old selector vs healed selector) as screenshots or JSON, save under `/evidence/heal_before_after/`
- [ ] Record a short screen capture (GIF or video) of the heal event happening live in the terminal

## 4. Downstream integration (pick at least one, more is better)
- [ ] Wire the `c_*` Collector ID into a real consumer, e.g.:
  - [ ] API trigger (`POST /dca/trigger`) hit from a small backend route, OR
  - [ ] Scheduled cron job that re-runs the scraper on an interval, OR
  - [ ] Push scraped data into a database or search index, OR
  - [ ] Feed a RAG pipeline / AI agent with the scraped data, OR
  - [ ] Push updates to a dashboard or Discord/Slack bot
- [ ] Connect the existing React frontend (`src/`) to display this live data instead of the current Gumloop-clone marketing content — repurpose it as the project dashboard
- [ ] Add basic error handling for failed scrape/heal runs

## 5. Terminal-first workflow proof
- [ ] Keep the Bright Data web dashboard use to a minimum (only for checking Collector IDs / schedules)
- [ ] Document (or record) the full `bdata` command sequence used, run inside a coding agent (Claude Code / Cursor / Codex), not just manually in a terminal

## 6. Repo cleanup for submission
- [ ] Rewrite `README.md`:
  - [ ] Remove the "recreate gumloop.com" description
  - [ ] Add problem statement + solution summary
  - [ ] Add architecture diagram (target site → bdata scraper → heal → downstream integration → dashboard)
  - [ ] List exact `bdata` commands used with example output
  - [ ] Include the Collector ID(s) generated
  - [ ] Embed the heal-event GIF/video
  - [ ] Add clear clone-and-run setup instructions for judges
- [ ] Create `.env.example` (no real secrets) and confirm real `.env` is gitignored
- [ ] Double-check no API keys/secrets are committed anywhere in `src/`, `.cursor/`, `.kilo/`, `.lovable/`, `.playwright-mcp/`
- [ ] Remove or clean up unused Lovable/editor-specific folders if they add noise for judges

## 7. Submission polish (for the extra tracks)
- [ ] Write a short build-in-public post/thread documenting the process (Daily Bugle track)
- [ ] Double check submission meets Grand Prize criteria: robust self-healing scraper integrated into a "live production workflow," not just a one-off script
- [ ] Final review: does the repo, as cloned fresh by a judge, run end-to-end following your own README?

---

## Priority if time runs out
If you only have time for a subset, do these in order — they cover the actual judging rubric:
1. Task 1 (target) → Task 2 (core scraper + Collector ID) → Task 3 (heal proof) → Task 6 README rewrite.
Skip the frontend dashboard polish (Task 4's UI part) before you skip the heal demo — the heal demo is the theme of the entire hackathon.
