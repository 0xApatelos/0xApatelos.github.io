# 🌐 Raka Rendra Fayanto — Portfolio & Blog

Personal portfolio website and blog built with React, TypeScript, Vite, and TailwindCSS.

🔗 **Live:** [0xapatelos.github.io](https://0xapatelos.github.io)

## ✨ Features

- ⚡ **Typing Effect** — Animated role cycling on hero section (respects reduced-motion)
- 🎨 **Dark/Light Mode** — Theme toggle with localStorage persistence and no flash-of-wrong-theme
- 📊 **Skills & Focus** — IT Specialist foundations, AI exploration, and supporting tools
- 📄 **CV Preview** — Dedicated `#/cv` page with browser print / Save as PDF
- 📈 **Optional GA4** — Consent-gated analytics with explicit HashRouter page views
- 🎓 **Education Timeline** — Animated academic history
- 🔗 **GitHub Integration** — Live repository fetch with sessionStorage caching + ETag revalidation; forks and configured repositories are filtered
- 📝 **Blog** — Markdown-rendered articles with tags, filtering, and pagination
- 📬 **Contact Form** — Mailto-based contact form with properly encoded subjects
- 🔍 **SEO** — Per-route `document.title`, Open Graph, Twitter cards, canonical URL, favicon
- ♿ **Accessible** — Labeled controls, `prefers-reduced-motion` support, semantic markup
- 📱 **Responsive** — Mobile-first design

## 🛠️ Tech Stack

| Tech | Usage |
|------|-------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool |
| TailwindCSS | Styling |
| React Router | SPA Navigation |
| Vitest + Testing Library | Unit & component tests |
| GitHub Pages | Hosting (via GitHub Actions) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Typecheck
npm run typecheck

# Lint
npm run lint

# Run tests (once)
npm test

# Run tests in watch mode
npm run test:watch

# Build for production (typechecks first)
npm run build

# Preview the production build
npm run preview
```

## 🚢 Deployment

Pushing to `main` triggers two workflows:

- **CI** (`.github/workflows/ci.yml`) — lint, typecheck, test, build on every push/PR
- **Deploy** (`.github/workflows/deploy.yml`) — builds and publishes to GitHub Pages automatically

> **One-time setup:** in the repo's *Settings → Pages*, set **Source** to **GitHub Actions**.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Introduction.tsx    # Hero section with typing effect
│   ├── Skills.tsx          # Tech stack grid
│   ├── Education.tsx       # Education timeline
│   ├── Projects.tsx        # Featured projects section (Home)
│   ├── ProjectCard.tsx     # Single repository card
│   ├── LatestPosts.tsx     # Blog preview
│   ├── Navbar.tsx          # Navigation with scroll blur
│   ├── Footer.tsx          # Site footer
│   ├── Pagination.tsx      # Shared windowed pagination
│   └── Layout.tsx          # Page layout + scroll restoration
├── pages/             # Route pages
│   ├── Home.tsx / Projects.tsx / Blog.tsx
│   ├── BlogPost.tsx / Experience.tsx / CV.tsx / Contact.tsx / NotFound.tsx
├── config/
│   └── site.ts        # ⭐ All personal/site config in one place
├── constants/
│   └── languages.ts   # Shared GitHub language colors
├── data/
│   ├── posts.ts       # ⭐ Blog content (Markdown)
│   └── experience.ts  # ⭐ Experience & certificate entries
├── hooks/
│   ├── useGitHubRepos.ts   # GitHub API fetch + cache + retry
│   ├── useReveal.ts        # Shared scroll-reveal observer
│   └── usePageTitle.ts     # Per-route document.title
├── contexts/          # Theme context (provider + hook split)
├── routes/            # Router configuration (hash router)
├── utils/
│   ├── Markdown.tsx   # Dependency-free Markdown renderer
│   └── mailto.ts      # Safe mailto URL builder
└── types/             # TypeScript interfaces

tests are colocated as *.test.ts(x) next to the source
.github/workflows/    # CI + GitHub Pages deploy
```

## 📝 Customization

### 1. Site config (start here)

All personal details live in **`src/config/site.ts`** — GitHub username, display
name, email, location, and social links. Change them once and they update
across the React UI (hero, footer, contact page, CV, GitHub fetch).
Update static SEO tags in `index.html` separately.

Leave `linkedin` as an empty string to hide the LinkedIn button.

### 2. Blog posts

Add posts to **`src/data/posts.ts`**. Each post needs a unique `id`, an ISO
`date`, and `tags`. Content is Markdown — supported syntax:

- `## Heading` / `### Heading`
- `**bold**`, `*italic*`, `` `inline code` ``
- `- bullet lists`, `1. numbered lists`
- `> blockquotes`, fenced code blocks with ``` ```

Posts automatically appear on the Blog page, the Home preview, and get a route
at `#/blog/<id>`.

### 3. Experience & certificates

Add jobs, internships, organizations, and certificates in
**`src/data/experience.ts`** — the file has inline comments explaining every
field (including `url` for the certificate link and `description` for its
details). The page lives at `#/experience`.

### 4. CV

The recruiter-facing CV lives at `#/cv`, edited in `src/pages/CV.tsx`.
Contact details come from `SITE`. The hero, navigation, and footer link to it.
The print button opens the browser dialog; select **Save as PDF** to download.
This is not a pre-uploaded PDF. Check all personal facts before sending to recruiters.
Education explicitly states leave of absence, not graduation or active enrollment.

### 5. Analytics (setup required)

1. Create a GA4 property and Web data stream for `https://0xapatelos.github.io`.
2. Copy its Measurement ID (`G-…`) into `SITE.analyticsId` in `src/config/site.ts`.
3. In the Web stream's **Enhanced measurement → Page views → Advanced settings**,
   disable browser-history page-change tracking (or disable automatic page views).
   The app sends its own HashRouter `page_view` events to avoid duplicate counts.
4. Deploy, accept the analytics prompt, and verify navigation in GA4 Realtime.

With an empty or invalid ID, the site loads no analytics script or consent prompt.
With a valid ID, GA4 loads only after the visitor selects **Izinkan**.
**Tolak** keeps GA4 unloaded. The choice is stored locally; the footer analytics
settings button resets it and reloads to unload the script. Page views are tracked;
contact-form field values are never sent. Google Signals and ad personalization
are disabled. Review Google's retention/privacy settings before enabling.
No analytics property or Measurement ID has been provisioned by this repository.

### 6. Project curation

`SITE.hiddenRepos` hides repositories by name (case-insensitive). Forks are always
excluded, including when serving cached data. This affects both Home and Projects;
it does not delete or modify any GitHub repository.

### 7. GitHub profile & repository quick wins

Ready-to-publish Markdown and suggested GitHub settings live in `docs/github/`.
These are local deliverables, not automatically published to other repositories.

### 8. Other TODO sections

```bash
# Find remaining personalization TODOs
grep -r "TODO" src/
```

- `src/components/Introduction.tsx` — roles & bio
- `src/components/Skills.tsx` — tech stack
- `src/components/Education.tsx` — academic history

## ✅ Quality Checks

| Check | Command | Status |
|-------|---------|--------|
| Typecheck | `npm run typecheck` | ✅ |
| Lint | `npm run lint` | ✅ |
| Tests | `npm test` | ✅ |
| Build | `npm run build` | ✅ |

All four run automatically in CI on every push and pull request.

## 📄 License

MIT © Raka Rendra Fayanto — see [LICENSE](LICENSE).
