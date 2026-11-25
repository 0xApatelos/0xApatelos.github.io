# GitHub profile upgrade — publication checklist

## Verified state (2026-11-24)

The public GitHub API currently lists only:

- `0xApatelos/0xApatelos.github.io`
- `0xApatelos/Newton-Rhapson-Calculator`

The profile bio is empty; its website is already `https://0xapatelos.github.io/`.
The profile repository `0xApatelos/0xApatelos` was not found.

The previous portfolio changes were committed as `d9f61ce` and merged in PR #2.
The profile-upgrade files in this folder are publication assets for review in
this portfolio repository; merging them does not automatically install the
profile README or change account settings.

### Write-access blocker

Two separate attempts failed:

- `PATCH /user` to update the bio: **HTTP 403 — Resource not accessible by integration**.
- `gh repo create 0xApatelos/0xApatelos --public`: **Resource not accessible by integration (createRepository)**.

An earlier attempt to update the portfolio description also returned HTTP 403.
Push access does not guarantee profile-editing, repository-creation, or repository
administration permission. Reconnect GitHub in Arena with suitable permissions;
if the integration does not support those operations, use GitHub's UI instead.
Do not paste passwords, access tokens, private keys, or OAuth secrets into chat.

No repository was deleted, renamed, or made public/private by this task.
No bio, pins, topics, or remote README was changed by this task.

## 1. Publish the profile README

1. Open <https://github.com/new> while signed in as `0xApatelos`.
2. Set the repository name to **`0xApatelos`** and visibility to **Public**.
3. Add a README and create the repository.
4. Replace its root `README.md` with `docs/github/profile/README.md` from this portfolio checkout.
5. Upload `docs/github/profile/assets/header.svg` as **`assets/header.svg`** in the new repository. Keep that relative path so the banner displays.
6. Open <https://github.com/0xApatelos> to verify the banner, links, and project table.

Only the contents of `profile/` belong in the new profile repository. Do not
replace the portfolio's root README with the profile README.

The profile uses only currently public project links. Earlier drafts highlighted
`ratatouille` and `tugas-ipsd`; these are no longer publicly listed and have been
removed from the new profile. Their older README drafts remain archived here;
do not publish private code or datasets just to improve profile appearance.

## 2. Edit the profile

Open <https://github.com/settings/profile> and use:

**Bio**

> IT Specialist & AI Enthusiast | IT support, automation & practical AI. Building and learning in public.

**Website**

`https://0xapatelos.github.io/` (already configured)

**Location**

`Surakarta, Indonesia` — optional if you want this displayed publicly.

**Social link**

`https://www.linkedin.com/in/raka-rendra-724929279/`

## 3. Make the two public repositories understandable

In each repository's **About → Edit** dialog:

| Repository | Description | Suggested topics |
| --- | --- | --- |
| `0xApatelos.github.io` | Personal portfolio & blog of Raka Rendra Fayanto — IT Specialist & AI Enthusiast. Built with React, TypeScript, Vite & Tailwind CSS. | `portfolio`, `react`, `typescript`, `vite`, `tailwindcss`, `github-pages` |
| `Newton-Rhapson-Calculator` | Java Swing coursework project demonstrating a Newton–Raphson update for a fixed polynomial, using OOP interfaces and a desktop UI. | `java`, `swing`, `numerical-methods`, `newton-raphson`, `oop`, `learning-project` |

Keep the existing calculator repository name for now to avoid breaking links.
Use the standard spelling **Newton–Raphson** in titles and descriptions.

Publish `newton-raphson/README.md` as the calculator repository's root README.
Its setup instructions correct the old clone URL and explain the mismatched
main-class configuration. This draft does not change the calculator's code.

Before promoting the calculator, fix its configured main class, stop tracking
build output/crash logs/private IDE settings, add a real screenshot, and test the
setup. The README documents limitations instead of claiming a complete solver.

## 4. Pin real work

On the profile page choose **Customize your pins**:

1. Pin `0xApatelos.github.io` first.
2. Pin `Newton-Rhapson-Calculator` after its setup/docs are improved.
3. Add IT/AI projects from `PROJECT-PLAN.md` only once working public versions exist.

Two well-documented projects are better than six empty or template repositories.
Do not use fake activity, purchased stars, unsupported skill percentages, or forks
presented as original work. Pins must be set by the account owner in GitHub's UI.

## 5. Publication check

- [ ] Profile banner loads on desktop and mobile.
- [ ] Bio, website, LinkedIn, and email are correct.
- [ ] Every selected-project link is accessible while signed out.
- [ ] Each featured project has reproducible setup, limitations, and a real screenshot/demo.
- [ ] Calculator setup has been tested on JDK 21.
- [ ] Public files and Git history contain no personal data or secrets.
- [ ] Planned projects are not represented as shipped work.
