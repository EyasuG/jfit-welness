# AI Collaboration Notes — JFit Wellness

**This file is the shared brain for all AI agents working on this repo.**
Both Claude Code and Codex should read this before starting work and update the
Activity Log after completing a task. It is committed to the repo so all agents
and human collaborators stay in sync.

---

## Agent Roles

| Agent | Role | Responsibilities |
|---|---|---|
| **Claude Code** | 🚗 Primary Driver | Owns architecture, implements all features, writes and merges PRs, maintains this file, makes final decisions on code structure |
| **Codex** | 🤝 Collaborator | Code reviews, surfacing bugs, suggesting improvements, writing up task proposals — opens PRs for Claude Code to review and merge |

**Ground rules:**
- Claude Code has final say on all architectural decisions.
- Codex should open PRs against `main` with the `.github/pull_request_template.md` filled in — Claude Code will review and merge.
- Codex should **not** merge its own PRs.
- If Codex spots a bug or improvement opportunity not in the Open Tasks list, it adds it there (with `Codex-suggested` in the Claimed By column) rather than implementing it unilaterally.
- Anything marked `🔒 Driver only` in the Open Tasks list is reserved for Claude Code.

---

## Current State (last updated: 2026-07-28)

The app is a single `index.html` PWA. The following features are **complete and stable**:

| Feature | Status | Notes |
|---|---|---|
| 10-week workout schedule (all 10 weeks) | ✅ Done | `workoutDatabase` object in JS |
| Phase 1 / Phase 2 toggle | ✅ Done | |
| Week tab selector with completion count | ✅ Done | |
| Per-session completion checkboxes | ✅ Done | Stored in `jfit_completed` |
| Daily check-in modal + energy/mood notes | ✅ Done | Stored in `jfit_checkins` |
| Overall + per-week SVG progress rings | ✅ Done | |
| Streak counter | ✅ Done | Counts full weeks + partial days |
| Confetti on session complete | ✅ Done | Canvas-based, 3s auto-stops |
| Dark mode toggle | ✅ Done | Stored in `jfit_dark` |
| Macro doughnut chart (Chart.js) | ✅ Done | Updates on diet-goal toggle |
| Platform allocation bar chart | ✅ Done | Updates per phase |
| 7-day meal variety (BMI + Muscle modes) | ✅ Done | 56 unique meals total |
| Per-meal substitute toggle | ✅ Done | Animated expand/collapse |
| Meal day auto-detects today | ✅ Done | Highlights current weekday |
| Today command center | ✅ Done | Phone-first summary card for the current day with quick actions |
| Workout mode modal + rest timer | ✅ Done | Full-screen phone flow for today’s session with 60s/90s/2m/3m timer presets |
| Daily recovery quick check | ✅ Done | Stored in `jfit_daily` with sleep, energy, soreness, and protein readiness |
| Muscle Gain Lab | ✅ Done | Personalized protein, training volume, rep ranges, recovery cues, and weekly execution guidance |
| Weekly body weight trend chart | ✅ Done | Stored in `jfit_strength` and rendered in Nutrition view |
| Glossary toast popup | ✅ Done | 9s auto-dismiss, spring animation |
| Hover tooltips on technical terms | ✅ Done | CSS `::after` via `data-tip` |
| App integration guide (sidebar) | ✅ Done | NRC, Gym, FitOn, BODi cards |
| Scientific glossary section | ✅ Done | 6 cards at page bottom |
| Print stylesheet | ✅ Done | `.no-print` class system |
| PWA (manifest + service worker) | ✅ Done | Cache: `jfit-v7` |

---

## Open Tasks

> Agents: pick a task, note it as "In Progress (AgentName, date)" while working,
> then mark it Done and log it in the Activity Log below.

| # | Task | Priority | Status | Owner | Claimed By |
|---|---|---|---|---|---|
| 1 | Add water intake tracker (daily goal: 3–4L, tap to increment) | Medium | Open | Claude Code | — |
| 2 | Workout timer / stopwatch overlay for active sessions | Medium | ✅ Done | User-directed | Codex (2026-07-28) |
| 3 | Body weight log chart (user inputs weekly weigh-in, sparkline shows trend) | High | ✅ Done | User-directed | Codex (2026-07-28) |
| 4 | Animated muscle-group heat map showing which muscles are hit each day | Low | Open | Claude Code | — |
| 5 | Export weekly schedule as a PNG card (share to social) | Low | Open | Claude Code | — |
| 6 | Calorie target calculator input (height/weight → TDEE → auto-set macro grams) | High | Open | 🔒 Driver only | — |
| 7 | Code review: audit inline `onclick` handlers, unused variables, dead code | Low | Open | **Codex** | — |
| 8 | Accessibility review: `aria-label` on SVG rings, icon-only buttons, color contrast | Medium | Open | **Codex** | — |
| 9 | Add `prefers-reduced-motion` guard around confetti and fade-up animations | Low | Open | **Codex** | — |
| 10 | Investigate + report: `calculateStreak()` logic gaps — file findings as PR comment | Medium | Open | **Codex** | — |
| 11 | Review meal substitute toggle — check keyboard accessibility and focus states | Low | Open | **Codex** | — |
| 12 | Review dark mode — flag any elements that don't respond to `data-theme` correctly | Low | Open | **Codex** | — |
| 13 | Install-flow polish for iPhone: stronger add-to-home-screen onboarding and post-install cues | Medium | Open | Claude Code | Codex-suggested |
| 14 | Notification strategy for workout, weigh-in, and bedtime reminders without breaking the local-first model | High | Open | 🔒 Driver only | Codex-suggested |
| 15 | Improve workout timer resilience when the app backgrounds or the screen locks | Medium | Open | Claude Code | Codex-suggested |
| 16 | Add app shortcuts / quick actions for “Start Today”, “Recovery Check”, and “Log Weight” | Medium | Open | Claude Code | Codex-suggested |

---

## Deployment

### Live URL
**https://eyasug.github.io/jfit-welness/**

### How It Works
Every push to `main` triggers `.github/workflows/deploy.yml`, which runs a
validate step first, then deploys the entire repo root to GitHub Pages.
No build step — files are served as-is.

### CI on Pull Requests
`.github/workflows/pr-check.yml` runs on every PR targeting `main` and:
- **Blocks merge** if hardcoded hex colors are found in the JS/script block
- **Blocks merge** if `sw.js` is missing a versioned cache name (`jfit-vN`)
- **Blocks merge** if `manifest.json` is invalid JSON
- **Warns** (non-blocking) if `AI_COLLAB.md` was not updated
- Posts a pass/summary comment on the PR when all checks pass

### One-Time GitHub Setup (repo owner must do this once)
1. Go to **Settings → Pages** in `EyasuG/jfit-welness`
2. Under **Source**, select **GitHub Actions**
3. Save — the next push to `main` will deploy automatically

### Service Worker Cache
Bump `jfit-vN` in `sw.js` whenever any static asset changes.
The PR check enforces that a cache version string is always present.

---

## Architecture Decisions & Rationale

These are recorded so agents don't re-litigate settled decisions.

| Decision | Rationale |
|---|---|
| Single `index.html` file | Keeps the PWA deployable as a static file with zero build tooling. Do not split without explicit user approval. |
| GitHub Pages for hosting | Zero cost, zero infra, auto-deploys on push to main via Actions. |
| CSS custom properties over Tailwind utilities for theming | Tailwind doesn't support dynamic theme switching without JS class toggling. CSS vars + `data-theme` on `<html>` is cleaner and faster. |
| No JS framework | Keeps the bundle at zero. Vanilla JS is sufficient for the DOM complexity here. |
| `localStorage` only (no backend) | User data stays local. No auth/privacy surface. If a sync feature is added, add it as an opt-in, not a default. |
| Chart.js over D3 | Simpler API for the two chart types used (doughnut + bar). D3 not needed. |
| Meal data in JS objects (not HTML) | Makes it easy for agents to edit meal content without touching markup. |

---

## Shared Conventions

### Branch Naming
```
feature/<short-description>     # new feature
fix/<short-description>         # bug fix
refactor/<short-description>    # non-functional change
review/<agent>-<date>           # code review pass
```

### Commit Message Format
```
type(scope): short description

Longer explanation if needed.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
# or
Co-Authored-By: Codex <codex@openai.com>
```

### CSS Token Rule
All colors in new code must use a `var(--token)`. New tokens go in both `:root` and
`[data-theme="dark"]`. Document new tokens in `CLAUDE.md` → CSS Token Reference.

### localStorage Rule
New keys must use the `jfit_` prefix. Document in `CLAUDE.md` → localStorage Keys.

### Service Worker Rule
Bump `jfit-vN` in `sw.js` whenever any cached static asset changes.

---

## Handoff Notes

Use this section for context that doesn't fit anywhere else — things one agent wants the
next agent to know, or things the human owner flagged mid-session.

### 2026-07-27 — Claude Code → Codex

**`main` is clean and up to date.** Your `codex/pwa-hardening-checkin-modal` branch was
reviewed, had one fix applied (check-in modal Save button token correction), and was
merged with a no-ff merge commit. You're clear to branch off `main` for new work.

**For your research + interactive feature work:**
- Branch off `main` using `feature/<name>` or `codex/<name>`
- Keep PRs focused — one feature per PR is easier for Claude Code to review
- If you're adding a new `localStorage` key, register it in `CLAUDE.md → localStorage Keys`
  AND `AI_COLLAB.md → Current State` before opening the PR
- If you're adding a new CSS token, add it to both `:root` and `[data-theme="dark"]` blocks
- Heavy JS additions should go at the end of the `<script>` block, after existing functions
- Do not reorganize existing function order — it breaks the driver's mental model of the file

**Current `main` HEAD:** `e4a6e73` (merge commit)

---

## Agent Activity Log

Append entries here after completing any task. Keep it chronological, newest at bottom.

```
DATE        | AGENT        | CHANGE SUMMARY
------------|--------------|--------------------------------------------------
2026-07-27  | Claude 4.6   | Initial app created — 10-week planner, Tailwind/
            |              | Chart.js, workout database for all 10 weeks
2026-07-27  | Claude 4.6   | Full redesign v3 — CSS design system, dark mode,
            |              | progress rings, confetti, glossary toast, day cards
            |              | with color-coded borders, animated transitions
2026-07-27  | Claude 4.6   | 7-day meal variety — 56 unique meals (BMI +
            |              | Muscle modes), per-meal substitute toggles,
            |              | auto-detect today's day in meal tab strip
2026-07-27  | Claude 4.6   | Created AGENTS.md, CLAUDE.md, AI_COLLAB.md,
            |              | .github/pull_request_template.md for Codex collab
2026-07-28  | Codex        | PWA hardening pass — upgraded SW to `jfit-v7`
            |              | with runtime CDN caching + update prompt, added
            |              | local app icons, documented `jfit_checkins`
2026-07-28  | Codex        | Added Muscle Gain Lab — evidence-based strength
            |              | coaching, weekly weigh-in trend chart, dynamic
            |              | muscle-mode macro targets, and session execution
            |              | cues stored in `jfit_strength`
2026-07-28  | Codex        | PWA hardening pass — upgraded SW to `jfit-v7`
            |              | with runtime CDN caching + update prompt, added
            |              | local app icons, documented `jfit_checkins`
2026-07-28  | Codex        | Added phone-first utility layer: Today command
            |              | center, quick recovery logging stored in
            |              | `jfit_daily`, mobile action dock, and workout
            |              | mode with built-in rest timer presets
2026-07-28  | Claude 4.6   | Auto-deployment: enhanced deploy.yml with
            |              | validate → deploy pipeline; added pr-check.yml
            |              | for hex-token enforcement, sw.js version check,
            |              | manifest validation, and PR summary comments
```
