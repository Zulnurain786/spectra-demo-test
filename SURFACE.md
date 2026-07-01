# spectra-demo surface (frozen for Phase 1)

This is the fixed target all tracks and eval fixtures build against. Keep it
small (plan 11, the demo-repo trap). Change it only via the orchestrator so
Tracks B, C, and D stay in agreement.

## Screens (frontend, React + Vite)

- `Login` - `data-testid="screen-login"`. Fields: `login-email`, `login-password`, submit `login-submit`, title `login-title` ("Sign in").
- `Dashboard` - `data-testid="screen-dashboard"`. Header `dashboard-header` + `dashboard-user`, add-item form `add-item-form` (`add-item-input`, `add-item-submit`), list `items-list` with `item-<id>` rows.

Routes served by the frontend preview: `/login`, `/dashboard`.

## Endpoints (backend, NestJS, prefix `/api`, OpenAPI at `/openapi.json`)

- `POST /api/auth/login` - body `{ email, password }`, returns `{ token, user }`.
- `GET /api/me` - returns `{ user: { id, email, displayName } }`.
- `GET /api/dashboard/items` - returns `ItemDto[]`.
- `POST /api/dashboard/items` - body `{ title }`, returns `ItemDto`.

## Design (Figma)

- One Figma file id (placeholder `demo-figma-file` until a real file is connected).
- Two frames named `Login` and `Dashboard` mirroring the screens above.

## Requirement docs

- `docs/PRD.md`, `docs/PTD.md`, `docs/HLTD.md` in this repo. `.spectra.yml` reads them via `source: repo`. A Notion mirror is added later for the doc-router Notion adapter eval.

## Eval fixtures target these deltas

Broken-PR fixtures (Track D) introduce drift against this surface, for example:
a renamed Figma label vs frontend, a removed/changed `items` response field
(breaking API), a route described in the PRD but missing from the frontend.
