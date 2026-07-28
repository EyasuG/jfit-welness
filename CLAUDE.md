# Claude Code Instructions — JFit Wellness

> See also `AGENTS.md` (Codex's config) and `AI_COLLAB.md` (shared context for all agents).

## Project Summary

Single-file PWA fitness planner (`index.html`). No build step. Tailwind CSS + Chart.js via
CDN, vanilla JS, `localStorage` for persistence. See `AGENTS.md` for the full tech-stack
table and repo layout.

## Role

Claude Code is the **primary driver** on this project. Codex collaborates via PRs (reviews,
audits, suggestions). Claude Code reviews and merges Codex PRs, implements all features, and
owns all architectural decisions. See `AI_COLLAB.md → Agent Roles` for full breakdown.

## Claude-Specific Workflow

- **Before starting any task**: read `AI_COLLAB.md` → `## Current State` and
  `## Open Tasks` to avoid duplicating work already done by Codex or a previous session.
- **After completing a task**: append a one-line entry to `## Agent Activity Log` in
  `AI_COLLAB.md` with today's date, your agent name, and what changed.
- **Branch naming**: `feature/<short-description>` or `fix/<short-description>`.
  Always branch off `main`.
- **Commit style**: `type(scope): description` — e.g. `feat(meals): add 7-day variety`.
  Co-author line: `Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>`.

## Key Files to Know

| File | Purpose |
|---|---|
| `index.html` | Entire app — HTML structure, `<style>` block, `<script>` data + logic |
| `sw.js` | Service worker — bump `jfit-vN` cache name on any asset change |
| `manifest.json` | PWA manifest — icons, theme color, display mode |
| `AI_COLLAB.md` | Shared agent notes — read before every session |

## CSS Token Reference

```
--bg          Page background
--surface     Card / panel background
--surface2    Inset / secondary background (session blocks, stat cards)
--border      All border colors (rgba)
--text        Primary text
--text2       Secondary text
--text3       Muted / label text
--terracotta  #C96F53  — push days, active accent
--sage        #6C8E75  — pull days, success states
--gold        #B8943F  — nutrition accent
--shadow      Card shadow
--shadow-lg   Hover / elevated shadow
```

## localStorage Keys

| Key | Type | Purpose |
|---|---|---|
| `jfit_completed` | JSON object | `{ "w1_d0": true, … }` — session completion map |
| `jfit_checkins` | JSON object | Per-session energy, mood, note, and ISO date history |
| `jfit_dark` | `"true"` / `"false"` | Dark mode preference |

Add new keys with `jfit_` prefix and document them here and in `AI_COLLAB.md`.

## Preview

```bash
npx serve -p 4321 .
# open http://localhost:4321
```

The `.claude/launch.json` file wires this up to the in-app browser preview automatically.

## Code Review Checklist

Before raising a PR, verify:
- [ ] All new colors use CSS custom properties (`var(--token)`), not hardcoded hex
- [ ] Dark mode tested (toggle + check all new elements)
- [ ] Print layout intact (`.no-print` on any new controls/charts)
- [ ] `sw.js` cache version bumped if any static asset changed
- [ ] `AI_COLLAB.md` activity log updated
- [ ] PR description follows `.github/pull_request_template.md`
