# Codex Agent Instructions — JFit Wellness

> This file is read automatically by OpenAI Codex. See also `CLAUDE.md` (Claude Code's config)
> and `AI_COLLAB.md` (shared context, conventions, and handoff notes for all agents).

## Project Overview

**JFit Wellness** is a single-file (`index.html`) interactive 10-week hybrid fitness planner
and Mediterranean nutrition tracker. There is no build step — it runs directly in the browser
using Tailwind CSS (CDN), Chart.js (CDN), and vanilla JavaScript. All state is stored in
`localStorage`.

## Tech Stack

| Layer | Detail |
|---|---|
| Markup | Semantic HTML5 inside a single `index.html` |
| Styling | Tailwind CSS via CDN + hand-written `<style>` block (CSS custom properties) |
| Charts | Chart.js via CDN |
| JS | Vanilla ES6+ — no bundler, no framework |
| Fonts | Google Fonts: Inter + Playfair Display |
| State | `localStorage` keys: `jfit_completed`, `jfit_dark` |
| PWA | `manifest.json` + `sw.js` (cache-first service worker) |

## Repository Layout

```
/
├── index.html          ← entire app (HTML + CSS + JS)
├── manifest.json       ← PWA manifest
├── sw.js               ← service worker (bump cache version on asset changes)
├── AGENTS.md           ← this file (Codex reads this)
├── CLAUDE.md           ← Claude Code config
├── AI_COLLAB.md        ← shared notes for all agents
└── .github/
    └── pull_request_template.md
```

## Code Conventions

- **CSS variables first**: all colors/shadows via `var(--token)` defined in `:root` and
  `[data-theme="dark"]`. Never hardcode color hex values in component styles.
- **No external dependencies**: do not add npm packages, import maps, or CDN links beyond
  the existing three (Tailwind, Chart.js, Google Fonts).
- **Data lives in JS objects**: `workoutDatabase`, `mealPlanDatabase`, `DAYS` are the single
  source of truth. Do not duplicate content in HTML.
- **`localStorage` keys**: only `jfit_completed` (object) and `jfit_dark` (boolean string).
  Add new keys with a `jfit_` prefix and document them in `AI_COLLAB.md`.
- **PWA cache**: bump the cache name string in `sw.js` whenever static assets change
  (convention: `jfit-vN`).
- **Accessibility**: interactive elements must have `title` or `aria-label` attributes.
  Progress rings need `role="img"` with `aria-label`.
- **Print**: `.no-print` hides elements from the print stylesheet. Do not remove this class
  from navigation, charts, or controls.

## Agent Roles

**Claude Code is the primary driver.** Codex is a collaborator.

| Agent | Role |
|---|---|
| Claude Code | Owns architecture, implements features, merges PRs |
| **Codex (you)** | Code reviews, accessibility audits, bug reports, improvement suggestions |

## Task Guidelines for Codex

Your lane is **review and suggest**, not implement-and-merge unilaterally.

1. **Read `AI_COLLAB.md` first** — check `## Agent Roles`, `## Current State`, and
   `## Open Tasks`. Tasks marked `🔒 Driver only` are reserved for Claude Code.
2. **Your assigned tasks** are those in the Open Tasks table with `Owner: Codex` —
   primarily code reviews, accessibility passes, and investigation reports (#7–12).
3. **For review tasks**: open a PR with your findings as inline comments or a summary
   in the PR description. Do **not** rewrite large blocks of working code.
4. **For bug/improvement ideas** not already in the task list: add them to the Open Tasks
   table in `AI_COLLAB.md` with `Codex-suggested` in the Claimed By column, then open
   a PR for Claude Code to evaluate. Do not implement them yourself.
5. **Do not merge your own PRs.** Claude Code reviews and merges.
6. **Log your work**: append to `## Agent Activity Log` in `AI_COLLAB.md`.
7. **PR format**: follow `.github/pull_request_template.md` — fill in Agent Notes,
   task reference, and confirm `AI_COLLAB.md` was updated.

## What Not to Do

- Do not add React, Vue, or any JS framework.
- Do not convert `<style>` to Tailwind-only classes — the custom property system is load-bearing.
- Do not remove emoji icons; they are part of the visual language.
- Do not modify `sw.js` cache logic without bumping the version string.
- Do not hard-delete `localStorage` keys in user-facing code without a confirmation dialog.
