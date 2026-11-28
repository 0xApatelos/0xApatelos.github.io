# 🌐 Raka Rendra Fayanto — Portfolio & Blog

Personal portfolio website and blog built with React, TypeScript, Vite, and TailwindCSS.

🔗 **Live:** [0xapatelos.github.io](https://0xapatelos.github.io)

## ✨ Features

- **Editorial homepage** — Static introduction, restrained typography, real portrait, and project-first navigation
- 🎨 **Dark/Light Mode** — Theme toggle with localStorage persistence and no flash-of-wrong-theme
- 📊 **Skills & Focus** — IT Specialist foundations, AI exploration, and supporting tools
- 📄 **CV Preview** — Dedicated `#/cv` page with browser print / Save as PDF
- 📈 **Optional GA4** — Consent-gated analytics with explicit HashRouter page views
- 🎓 **Education** — Concise academic status with explicit leave-of-absence wording
- 🔗 **GitHub Integration** — Live repository fetch with sessionStorage caching + ETag revalidation; forks and configured repositories are filtered
- 📝 **Blog** — Markdown-rendered articles with tags, filtering, and pagination
- 📬 **Contact Form** — Native FormSubmit delivery flow, plus Gmail/email-app drafts and clipboard fallback (one-time recipient activation required)
- 🔍 **SEO** — Per-route `document.title`, Open Graph, Twitter cards, canonical URL, favicon
- ♿ **Accessible** — Labeled controls, `prefers-reduced-motion` support, semantic markup
- 📱 **Responsive** — Mobile-first design
- **English content** — UI, CV, project summaries, course descriptions, and ten blog articles; explicit English date formatting

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

## Contact delivery — one-time activation required

GitHub Pages serves static files; it cannot send email itself. The contact form
uses the documented native HTTPS POST flow at [FormSubmit](https://formsubmit.co/)
to forward messages to `SITE.email` (`rakaarendraa@gmail.com`). No frontend secret
or custom backend is needed. CAPTCHA remains enabled, a honeypot is included,
and visitors must acknowledge third-party data processing.

**Owner setup, after deployment:**

1. Open `#/contact` on the real production site and submit a short test message
   using an email address you control. This contacts FormSubmit; it is not done
   automatically by builds or tests.
2. Check `rakaarendraa@gmail.com` (including spam) for the activation email.
3. Confirm it using FormSubmit's activation link. This step cannot be completed
   from this repository, and activation has not been verified here.
4. Send a second message and verify inbox delivery and Reply-To behavior.
5. If it does not arrive, check activation, CAPTCHA, spam filters, and the service
   status. Use the direct email address or Gmail alternative in the meantime.

The form opens the service's own verification/result page in a new tab and keeps
the draft on the portfolio. It deliberately does not show a local “message sent”
confirmation: a handoff is not proof of delivery. There is no custom success
redirect that could be mistaken for a verified send.

**Fallbacks:** Open in Gmail, use a configured email app, or copy the complete
draft. These prepare a message; the visitor still needs to send it. If clipboard
access is denied, selectable text is shown. Third-party availability and actual
email delivery were not tested with a real submission in this sandbox.

Read the [FormSubmit privacy policy](https://formsubmit.co/privacy.pdf) before
activation. Do not collect passwords or sensitive data through this form. Update
`SITE.email` if the recipient changes and activate the new recipient as needed.

## 📁 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Introduction.tsx    # Static introduction + portrait + CV
│   ├── Skills.tsx          # Two evidence-linked practice areas
│   ├── Education.tsx       # Academic status
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
│   ├── selectedProjects.ts # CV projects and English repository-card summaries
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
at `#/blog/<id>`. Existing IDs, publication dates, and tags are preserved in
the English editions. `formatDate` uses `en-GB` and UTC for stable date labels.

### 3. Experience & certificates

Add jobs, internships, organizations, and certificates in
**`src/data/experience.ts`** — the file has inline comments explaining every
field (including `url` for the certificate link and `description` for its
details). The page lives at `#/experience`.

Udemy entries include optional `instructor`, `credentialId`, `courseUrl`, and
`credentialType: 'course-completion'`. Names, recipient, and completion dates
were transcribed from the supplied verification pages; descriptions summarize
the linked course syllabus rather than claiming independent professional
certification. Preserve source dates as recorded, not the current date. Existing
entries without verification URLs remain visible without an invented link.

### 4. CV

The recruiter-facing CV lives at `#/cv`, rendered by `src/pages/CV.tsx`.
`src/data/cv.ts` holds the English profile, phone, laboratory experience, skills,
and coursework transcribed from the owner-supplied **CV Raka 2026.pdf**. These are
self-reported details, not independently verified employment claims. Both laboratory
roles ran January–July 2025; academic leave and the unfinished degree are explicit.
Other contact details come from `SITE`. The original PDF is not published in this
repository. Review the public phone number before deploying if privacy preferences change.

The static CV project list highlights IT-Inventaris, IT Operation Lab, and the
portfolio, reusing relevant entries from `src/data/selectedProjects.ts`. It does
not depend on GitHub API availability. The older `/experience` entries are separate
and need owner confirmation before alignment with the PDF. No client work or
organization role absent from the supplied PDF is added to this CV.
The hero, navigation, and footer link to it.
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
With a valid ID, GA4 loads only after the visitor selects **Allow**.
**Decline** keeps GA4 unloaded. The choice is stored locally; the footer analytics
settings button resets it and reloads to unload the script. Page views are tracked;
contact-form field values are never sent. Google Signals and ad personalization
are disabled. Review Google's retention/privacy settings before enabling.
No analytics property or Measurement ID has been provisioned by this repository.

### 6. Project curation

`SITE.hiddenRepos` hides repositories by name (case-insensitive). Forks are always
excluded, including when serving cached data. This affects Home and the full Projects page;
it does not delete or modify any GitHub repository.

Home shows the first three eligible repositories returned by `useGitHubRepos`,
ordered by latest update. New public repositories can appear automatically after
cache expiry; the profile README repository and other hidden names are excluded
before the three-item limit is applied. Cards show name, summary, language, stars,
and forks, with a link to GitHub. The section includes loading, empty, and error
states, a retry button, and a direct GitHub fallback. The existing five-minute
session cache and ETag revalidation are shared with the Projects page.

`src/data/selectedProjects.ts` remains the curated data source for the CV and
English summary overrides on matching repository cards; it no longer determines
which repositories appear on Home. Unknown repositories use their GitHub About
text, or an English fallback if no description is set. No metrics are fabricated.

### 7. Visual direction

The homepage prioritizes selected work, plain-language contributions, and visible
limitations. Neutral reading surfaces are paired with bright cyan buttons, cyan
and violet accents, and a small lime portrait detail. Accent text uses darker
tones in light mode and brighter tones in dark mode for readability. There are
no animated neon effects, floating orbs, or skill percentage cards; the printable
CV remains black on white. Shared accent tokens live in `src/index.css`. The hero uses an optimized 640×800 WebP portrait from `src/assets/profile.webp`
(with a Vite content-hashed URL); the original remains in `public/images/profile.jpg`
for existing social-preview URLs. Regenerate the WebP when replacing the portrait.
Light/dark themes, keyboard focus, a skip link, CV printing,
and the existing routes remain supported. Home content does not depend on scroll
observers to become visible.

The reference for content hierarchy was [Amri Zadi's portfolio](https://amrizadi.my.id/).
This implementation uses Raka's own photograph, identity, layout, and project copy;
it does not reuse the reference's images, code, or professional achievements.

### 8. Personalization

```bash
# Find remaining personalization TODOs
grep -r "TODO" src/
```

- `src/components/Introduction.tsx` — identity, photo & bio
- `src/components/Skills.tsx` — practice areas & evidence links
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
