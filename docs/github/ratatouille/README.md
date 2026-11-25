# Ratatouille

Restaurant website frontend built with **React, TypeScript, Vite, and Tailwind CSS**.

[Demo URL](https://ratatouille-eoxp.vercel.app) · [Source](https://github.com/0xApatelos/ratatouille)

## Features

- Home, About, and Menu pages using React Router.
- Menu cards with category filtering.
- Restaurant profile, opening hours, and FAQs fetched from a REST API.
- Dedicated data-fetching hooks and a shared Axios service.
- Reusable UI components and a loading spinner.

## Run locally

```bash
git clone https://github.com/0xApatelos/ratatouille.git
cd ratatouille
npm install
npm run dev
```

```bash
npm run lint
npm run build
npm run preview
```

## Structure

- `src/pages/` — Home, About, and Menu pages.
- `src/components/` — navigation, footer, menu, FAQ, and opening-hours components.
- `src/hooks/` — hooks for API-backed data.
- `src/services/api.ts` — Axios client and endpoint functions.
- `src/types/api.ts` — API data types.

## API dependency

The current source uses `https://dryan01.pythonanywhere.com/api` as its API base.
It requests `/menus/`, `/menus/categories/`, `/profile/`, `/opening-hour/`, and
`/faq/`. This repository contains the frontend; API availability and CORS affect
whether content loads. Review `src/services/api.ts` to use a backend you control.
The demo and API uptime have not been verified as part of preparing this README.

## Scope and next steps

This is a restaurant frontend project, not a production ordering/payment system.
Useful improvements include moving the API base to `VITE_API_BASE_URL`, adding
loading/error-state tests, and documenting sample API responses. These are
suggestions, not features claimed to be implemented.
