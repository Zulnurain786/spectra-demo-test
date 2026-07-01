# `spectra-demo` (dev-only fixture — NOT product code)

Sample full-stack app used to test and demo Spectra during development. **This directory is not part of the Spectra product.** Spectra in production is a hosted bot that pulls customer code, docs, and designs from external sources via MCP at PR time — it does not embed any sample app.

`spectra-demo` exists purely so we have a concrete repo to point Spectra at while building it. It currently lives inside the `spectra` monorepo for development convenience; **before deployment it will be promoted to its own GitHub repo** so Spectra can install on it like any third-party project.

## Stack

- `frontend/` — **React 19 + Vite 8 + TanStack Query v5**, two screens (`/login`, `/dashboard`). Bearer-token auth via `localStorage`. All API calls go through `src/api/client.ts`.
- `backend/` — **NestJS 11 + class-validator + class-transformer + @nestjs/swagger 11**, four endpoints under `/api/*`, exposes the OpenAPI document at `/openapi.json` and Swagger UI at `/docs`. Picked over `nestjs-zod` because class-validator is what real-world NestJS repos use, so `mcp-api-contract`'s extractor sees a realistic shape.
- `docs/` — PRD.md / PTD.md / HLTD.md (or pointed at Notion in `.spectra.yml`).
- `.spectra.yml` — the configuration Spectra reads on every PR.
- `.github/workflows/preview.yml` — uses the reusable `spectra/preview-action` to build, serve, and emit a `deployment_status` event with the preview URL.

## Running locally

```bash
pnpm --filter @spectra/demo-backend dev      # http://localhost:3001 (proxied through Vite)
pnpm --filter @spectra/demo-frontend dev     # http://localhost:5173
```

The frontend's Vite dev server proxies `/api/*` to the backend, so production and dev share the same URL shape.

## Definition of done (Week 1 scaffold)

- Two-screen frontend renders against the four-endpoint NestJS backend.
- `/openapi.json` available; Swagger UI at `/docs`.
- `.spectra.yml` parses cleanly against `@spectra/shared`'s `SpectraConfigSchema`.
- Preview workflow stub committed (real implementation in Weeks 2-3 by Person A).
