# Evidence Directory

This directory contains proof-of-execution artifacts for the Into the Scrape-Verse hackathon.

## Contents

- `run_output.json` — Raw JSON output from `bdata scraper run --pretty`
- `heal_before_after/` — Before/after diffs showing selector repairs from `bdata scraper heal`

## How to Generate

```bash
# 1. Run the scraper and capture output
bdata scraper run <collector_id> --pretty > evidence/run_output.json

# 2. Trigger self-healing (after a layout change)
bdata scraper heal <collector_id> "Repair broken selectors for the updated page"

# 3. Capture before/after diff
# The heal command outputs the diff automatically
```
