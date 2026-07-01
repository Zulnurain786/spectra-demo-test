# PTD — spectra-demo

> Tag: PTD-1. Reference this in PR descriptions as `Implements: PTD-1`.

## API surface

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/auth/login` | none | `{ email, password }` | `{ token, user }` |
| GET | `/me` | bearer | — | `{ user }` |
| GET | `/dashboard/items` | bearer | — | `Item[]` |
| POST | `/dashboard/items` | bearer | `{ title }` | `Item` |

## Types

```ts
type User = { id: string; email: string; displayName: string };
type Item = { id: string; title: string; createdAt: string };
```

## Auth

- Bearer token returned from `/auth/login`. Tokens are validated server-side; no client-side decoding.

## Errors

- 400 — validation failure: `{ "error": "<reason>" }`
- 401 — unauthenticated: `{ "error": "unauthorized" }`
- 404 — not found: `{ "error": "not found" }`

## Spec

The runtime spec is exposed at `/openapi.json` and generated from Zod schemas via `zod-to-openapi`. Spectra extracts the contract via `mcp-api-contract.extract_contract` (Strategy 2 — auto-gen).
