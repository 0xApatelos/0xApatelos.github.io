# GitHub quick wins — publication checklist

## Current status

All Markdown in this folder is prepared locally. No remote README, GitHub bio,
pin, or repository setting has been changed by this work.

Attempting to edit the portfolio repository description using `gh repo edit`
returned **HTTP 403: Resource not accessible by integration**. The following
chained profile update did not run. Reconnect GitHub in Arena with the required
repository/profile permissions, or apply the settings manually.

No commits, pushes, or pull requests were made in this session's working branch.

## 1. GitHub profile README

Create a **public** repository named `0xApatelos` under the `0xApatelos` account.
Publish `profile/README.md` from this folder as its root `README.md`.
GitHub displays it on the account's profile because the repository name matches
the username. This file belongs in that repository, not as the portfolio's root README.

## 2. Profile settings

Suggested bio (under GitHub's 160-character limit):

> IT Specialist & AI Enthusiast | Exploring IT support, automation & practical AI. Building and learning in public.

Website: `https://0xapatelos.github.io`

Use the profile's **Customize your pins** interface to pin:

1. `0xApatelos.github.io`
2. `ratatouille`
3. `tugas-ipsd` **only after checking the datasets for private/personal data**.

Do not pin forks as though they were original projects. Do not present the
`learn-next` official course starter as an original showcase project.

## 3. Repository descriptions

| Repository | Suggested description |
| --- | --- |
| `0xApatelos.github.io` | Personal portfolio & blog of Raka Rendra Fayanto — IT Specialist & AI Enthusiast. Built with React, TypeScript, Vite & Tailwind CSS. |
| `ratatouille` | Restaurant frontend with React, TypeScript, Vite & Tailwind CSS. Menu filtering, FAQs, opening hours, and REST API integration. |
| `tugas-ipsd` | Learning project: Indonesian text clustering with Python, Metaflow, TF-IDF & K-Means; Excel input and cluster-summary exports. |

Set each in the repository's **About → Edit** dialog. Once the GitHub connection
has the required permissions, `gh repo edit OWNER/REPO --description '…'` is an
alternative. No credentials belong in this document or in chat.

## 4. Top repository READMEs

- Portfolio: the root `README.md` in this checkout is updated.
- Ratatouille: publish `ratatouille/README.md` from this folder to that repo root.
- Text clustering: review privacy concerns first, then publish `tugas-ipsd/README.md`.

These README drafts describe code inspected using the GitHub API. They do not
claim unmeasured performance, test results, deployed-service uptime, or ownership
of unrelated upstream/fork code.
