# Web Miner — Gumloop-style marketing homepage

Recreate the Gumloop homepage structure section-for-section as a single landing page for **Web Miner**, a web scraping product. Static visuals only — no login or database yet.

## Look and feel

- Palette: white background, near-black text, delicate blue accent (soft sky/periwinkle blue) for buttons, highlights, gradients and glows. Subtle grey borders and light blue-tinted surfaces for cards.
- Typography: clean modern geometric sans, large tight-tracking headlines, small uppercase eyebrow labels.
- Motion: gentle fade/slide-in on scroll, animated counters, rotating tab content, soft hover lifts.

## Page sections (top to bottom, mirroring Gumloop)

1. Announcement bar — thin banner with link ("Web Miner raises…" style / product news).
2. Sticky nav — logo, links (Product, Use cases, Docs, Pricing, Blog), "Book a demo" + "Get Started" buttons.
3. Hero — big headline "Build, share, optimize & control scrapers", subline, dual CTAs, floating case-study cards with avatars.
4. Social proof strip — "The scraping infrastructure powering data-driven teams" + logo row.
5. Animated stats — "Pages Scraped 0+", "Scrapers Deployed 0+" counting up.
6. Interactive product showcase — tabbed demo (E-commerce, Listings, News, Social, APIs). Each tab shows a mock chat/agent panel: user prompt, scraper steps with source chips, a results table, and a side summary card with progress bars and "Worked for 2 minutes".
7. Build section — "Let your team build the scrapers", copy, two CTAs, visual mock of a node/flow canvas.
8. Feature grid — bento-style cards: scheduling, proxy rotation, anti-bot handling, structured output, integrations, monitoring.
9. Integrations marquee — scrolling rows of source/destination logos.
10. Use-case cards — 3–4 cards with short case-study style blurbs.
11. Testimonials — quote cards with avatar, name, role.
12. Security/enterprise band — SOC2-style trust badges and short claims.
13. Pricing teaser — three plan cards (Free, Pro, Enterprise) with feature lists.
14. FAQ accordion.
15. Final CTA band — headline, buttons, blue glow background.
16. Footer — multi-column links, logo, social icons, legal row.

## Technical notes

- Rewrite `src/routes/index.tsx` as the homepage; split each section into its own component under `src/components/landing/`.
- Define the white/black/blue palette as semantic tokens in `src/styles.css` (oklch) — no hardcoded colour classes in components.
- Use shadcn primitives (Tabs, Accordion, Button, Card) and lucide icons; marquee/counters as small custom hooks with CSS animation.
- Generate a small set of images (hero abstract visual, avatars/logo placeholders) rather than hotlinking Gumloop assets.
- Add SEO head() on the index route: unique title, description, og/twitter tags.
- Fully responsive; mobile nav in a sheet/drawer.
