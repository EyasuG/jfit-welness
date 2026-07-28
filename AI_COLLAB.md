# AI Collaboration Notes — JFit Wellness

**This file is the shared brain for all AI agents working on this repo.**
Both Claude Code and Codex should read this before starting work and update the
Activity Log after completing a task. It is committed to the repo so all agents
and human collaborators stay in sync.

---

## Current State (last updated: 2026-07-27)

The app is a single `index.html` PWA. The following features are **complete and stable**:

| Feature | Status | Notes |
|---|---|---|
| 10-week workout schedule (all 10 weeks) | ✅ Done | `workoutDatabase` object in JS |
| Phase 1 / Phase 2 toggle | ✅ Done | |
| Week tab selector with completion count | ✅ Done | |
| Per-session completion checkboxes | ✅ Done | Stored in `jfit_completed` |
| Overall + per-week SVG progress rings | ✅ Done | |
| Streak counter | ✅ Done | Counts full weeks + partial days |
| Confetti on session complete | ✅ Done | Canvas-based, 3s auto-stops |
| Dark mode toggle | ✅ Done | Stored in `jfit_dark` |
| Macro doughnut chart (Chart.js) | ✅ Done | Updates on diet-goal toggle |
| Platform allocation bar chart | ✅ Done | Updates per phase |
| 7-day meal variety (BMI + Muscle modes) | ✅ Done | 56 unique meals total |
| Per-meal substitute toggle | ✅ Done | Animated expand/collapse |
| Meal day auto-detects today | ✅ Done | Highlights current weekday |
| Glossary toast popup | ✅ Done | 9s auto-dismiss, spring animation |
| Hover tooltips on technical terms | ✅ Done | CSS `::after` via `data-tip` |
| App integration guide (sidebar) | ✅ Done | NRC, Gym, FitOn, BODi cards |
| Scientific glossary section | ✅ Done | 6 cards at page bottom |
| Print stylesheet | ✅ Done | `.no-print` class system |
| PWA (manifest + service worker) | ✅ Done | Cache: `jfit-v6` |

---

## Open Tasks

> Agents: pick a task, note it as "In Progress (AgentName, date)" while working,
> then mark it Done and log it in the Activity Log below.

| # | Task | Priority | Status | Claimed By |
|---|---|---|---|---|
| 1 | Add water intake tracker (daily goal: 3–4L, tap to increment) | Medium | Open | — |
| 2 | Workout timer / stopwatch overlay for active sessions | Medium | Open | — |
| 3 | Body weight log chart (user inputs weekly weigh-in, sparkline shows trend) | High | Open | — |
| 4 | Animated muscle-group heat map showing which muscles are hit each day | Low | Open | — |
| 5 | Export weekly schedule as a PNG card (share to social) | Low | Open | — |
| 6 | Calorie target calculator input (height/weight → TDEE → auto-set macro grams) | High | Open | — |
| 7 | Code review: audit all inline `onclick` handlers → convert to event delegation | Low | Open | — |
| 8 | Accessibility pass: add `aria-label` to SVG progress rings and icon-only buttons | Medium | Open | — |
| 9 | Add `prefers-reduced-motion` guard around confetti and fade-up animations | Low | Open | — |
| 10 | Investigate: `calculateStreak()` logic is simplified — refine to track actual days | Medium | Open | — |

---

## Architecture Decisions & Rationale

These are recorded so agents don't re-litigate settled decisions.

| Decision | Rationale |
|---|---|
| Single `index.html` file | Keeps the PWA deployable as a static file with zero build tooling. Do not split without explicit user approval. |
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

*(Empty — add entries below as needed)*

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
```
