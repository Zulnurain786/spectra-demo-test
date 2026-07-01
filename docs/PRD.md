# PRD — spectra-demo

> Tag: PRD-1. Reference this in PR descriptions as `Implements: PRD-1`.

## Vision

A minimal task-list product used to exercise Spectra's consistency checks. Authenticated users can log in, see a personal dashboard, and add or list tasks (called Items).

## Users

- **Member**: any authenticated user.

## Screens

### Login (route `/login`, Figma frame `Login`)

- Email and password fields.
- Submit button labelled "Sign in".
- On success: redirect to `/dashboard`.
- On error: inline message under the form.

### Dashboard (route `/dashboard`, Figma frame `Dashboard`)

- Top bar showing the user's display name.
- "Add item" form: a text input and an "Add" button.
- List of items, newest first, each showing its title and creation time.

## Functional requirements

| ID | Requirement |
|---|---|
| FR-1 | Users sign in with email + password and receive a session token. |
| FR-2 | Authenticated users can fetch their profile (display name, email). |
| FR-3 | Authenticated users can list their items. |
| FR-4 | Authenticated users can add a new item with a non-empty title. |

## Non-functional requirements

- All pages must render under 500ms on the demo dataset.
- API responses must include consistent error shapes (`{ "error": "message" }`).
- All endpoints except login require a Bearer token.
