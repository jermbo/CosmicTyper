---
title: Codebase Audit (archived)
description: Historical point-in-time audit — many findings have since been fixed
status: archived
audience: developer
tags: [audit, archive, tech-debt]
---

[Docs](index.md)

# CosmicTyper — Codebase Audit

> ⚠️ **Archived snapshot.** This audit predates the modernization branch and no longer reflects the code. Many findings are fixed: storage now catches corrupt JSON and `clearAll()` was replaced by a `ct_`-scoped `clearAppStorage()`; a skip link, per-route titles, progress-bar ARIA, keyed `{#each}` lists, and reduced-motion scrolling exist; the results screen uses a native `<dialog>` with Escape support; lesson detail pages load independently and show a "Lesson not found" state; the error page links home; a layout-level learner guard and `svelte.config.js` exist; loaded data is validated. Still open at last check: no automated tests, the near-duplicate typing engines (`TypingGUI` / `Typer`), and slug-by-title lesson routing. Verify against the code before acting on anything below.

> Scope: all `src/` files, `package.json`, `vite.config.ts`, `eslint.config.js`, `tsconfig.json`, `src/app.html`, `src/app.css`.
> App stack: SvelteKit 2 / Svelte 5, client-only, `localStorage` persistence, external lesson API.

---

## Performance

**Global key handlers remain active after lesson completion**
Both `TypingGUI` and `Typer` stay mounted while the results overlay is shown. Their `svelte:window` `keydown` handlers continue intercepting every keystroke even when the lesson is over, doing unnecessary work and potentially conflicting with overlay controls.

**Per-keystroke DOM churn on the active line**
The current typing line renders one `<span>` per character, updated on every correct key. On longer lines this creates a large DOM tree that is rebuilt frequently, which can cause jank on lower-end devices.

**Array copying on every committed row**
The `codeData` store spreads full arrays (`[...this.htmlCode, ...lines]`) on every row commit. Over a long web lesson this becomes O(n²) allocation work with no practical benefit.

**`Array.includes()` inside each-loop renders**
`CodeOutput` calls `codeData.recentHtml.includes(i)` for every line on every render cycle. This is avoidable linear work per render frame.

**Smooth scroll on every step change ignores reduced-motion**
A `$effect` triggers `scrollIntoView({ behavior: 'smooth' })` on every `currentStep` change without checking `prefers-reduced-motion`, causing layout and animation work on each step for all users regardless of their system preference.

**External Google Fonts block first paint**
`src/app.css` opens with `@import url('https://fonts.googleapis.com/...')`, which is render-blocking, adds a third-party network round-trip, and fails entirely if the user is offline or the CDN is unavailable.

**Missing `{#each}` keys in `LessonsList`**
Lesson rows are iterated without a `(lesson.id)` key, which prevents Svelte from efficiently reconciling DOM when the list updates.

**Lessons bundled at build time**
Lesson content lives in `src/lib/data/*.json` and ships with the app. Edits require a rebuild/redeploy, but there is no stale localStorage cache or external API dependency.

**Dashboard re-derives data repeatedly**
`forLearner()`, `completedLessonIds()`, and sort operations run in multiple separate `$derived` blocks; `completedLessonIds()` is called again inside another `$derived.by`. This compounds as attempt history grows.

---

## Security

**No runtime validation of bundled lesson payloads**
Lesson JSON is cast directly to typed interfaces without schema validation. A malformed entry in `src/lib/data/` can crash the UI at load time.

**`JSON.parse` without error handling**
`src/lib/utils/storage.ts` parses stored JSON with no `try/catch`. A single corrupt or tampered storage entry can break app initialization entirely with no recovery path.

**Learner and attempt data trusted on load**
Persisted learner objects and attempt records are read from `localStorage` and used without any structural validation. Tampered values (e.g. fabricated accuracy, missing required fields) can produce nonsense stats or runtime errors.

**`color` field accepts arbitrary CSS**
The learner `create()` function accepts any color string. `ColorPicker` restricts this in the UI, but `localStorage` can be edited directly to inject arbitrary CSS into `--avatar-color` (e.g. additional property values). Low-impact locally, but the sanitization gap is real.

**Lesson HTML/CSS rendered without content sanitization**
Web lesson content from bundled lesson data is composed into an `iframe` `srcdoc` directly. The `sandbox` attribute mitigates script execution and same-origin access, but CSS-based exfiltration (`@import`, `url()`), phishing UI, and style breakout attempts remain possible vectors.

**No Content Security Policy**
There are no security response headers, no `svelte.config.js` hooks, and no `hooks.server.ts`. If a future change introduces `{@html}` or inline scripts, there is no defense-in-depth layer.

**Hard-coded third-party API with no integrity checks**
All lesson data is sourced from a single external URL with no pinning, SRI, or fallback. A compromised API affects every user until their local cache is manually cleared.

**`clearAll()` wipes all origin storage**
`src/lib/utils/storage.ts` exports a `clearAll()` that calls `localStorage.clear()` without scoping to the app's `ct_` key prefix. If this is ever wired to a UI action it would silently destroy unrelated origin data.

---

## Accessibility

**Results modal has no focus management or keyboard trap**
`ResultsScreen` uses `role="dialog"` and `aria-modal="true"` but does not move focus into the dialog on open, does not trap focus within it, and does not close on `Escape`. Keyboard and screen-reader users can interact with content behind the overlay, which violates the WAI-ARIA dialog pattern.

**Global key capture blocks all keyboard navigation**
`TypingGUI` and `Typer` call `preventDefault()` on all keydown events while a lesson is active. `Tab`, navigation keys, and browser shortcuts are suppressed, making it impossible for keyboard users to reach any other UI during a lesson. This violates WCAG 2.1.2 (no keyboard trap).

**Focus rings removed without replacement**
`outline: none` appears on the search input and on tab controls in multiple components. Some tabs restore a custom focus style only via a `.focus` class, not `:focus-visible`, leaving keyboard users without a visible focus indicator in certain states.

**`ColorPicker` radiogroup missing arrow-key navigation**
The color picker is marked with `role="radiogroup"` / `role="radio"` but has no roving `tabindex` or arrow-key handlers, which is the expected keyboard interaction pattern for radio groups.

**Completion status not exposed to assistive technology**
The completion checkmark in `LessonsList` is a visual `✓` character with no `aria-label` or visually hidden text. Screen-reader users cannot determine which lessons they have completed.

**Mobile nav lacks `aria-controls` linkage and Escape dismiss**
The nav burger button sets `aria-expanded` but the menu panel has no `id` to link back via `aria-controls`. There is also no `Escape` key handler to close the menu.

**No skip-to-content link and no per-route `<title>`**
The app lacks a skip navigation link and no route sets a `<title>` via `<svelte:head>`. Screen-reader users hear the same page name on every navigation and must tab through the full nav on every page.

**Progress bars not accessible**
The typing and code progress elements are visual only. Neither has `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, or `aria-valuemax`.

**Animations ignore `prefers-reduced-motion` in most components**
Only `ResizableSplit` respects the reduced-motion media query. Cursor flashes, wrong-character animations, and transition effects in `TypingGUI`, `Typer`, `ResultsScreen`, and `HTMLOutput` apply to all users unconditionally.

**Potential color contrast failures**
Several color combinations may not meet WCAG AA contrast requirements: the `#bada55` primary on white at small text sizes, `#7a7a7a` grey at `0.75rem` uppercase, done lines at `opacity: 0.45`, and upcoming lines at `opacity: 0.5`.

**Invalid HTML structure in code display**
`CodeOutput` places `<div>` elements as direct children of `<pre>`, which is invalid HTML. Assistive technology may parse the structure unpredictably.

---

## Dead and Redundant Code

**`bestAccuracyFor()` is never called**
`src/lib/stores/attempts.svelte.ts` exports a `bestAccuracyFor()` method that has no callers anywhere in the codebase.

**`clearAll()` is never called**
`src/lib/utils/storage.ts` exports `clearAll()` which is used nowhere in app code.

**`slugify()` duplicated in two files**
Identical slug-generation logic exists independently in `LessonsList.svelte` and `dashboard/+page.svelte` with no shared utility.

**Near-duplicate lesson detail pages**
`src/routes/typing-lessons/[id]/+page.svelte` and `src/routes/web-lessons/[id]/+page.svelte` are effectively the same file, differing only in which component and store they reference.

**Near-duplicate typing engine logic**
`TypingGUI.svelte` and `Typer.svelte` share large blocks of identical code: modifier key lists, wrong-flash timer logic, keystroke stat tracking, `$effect` reset patterns, and `svelte:window` handlers.

**Empty barrel export file**
`src/lib/index.ts` is a placeholder with no exports. It has no function.

**Broken error page home link**
`src/routes/+error.svelte` links back to `/welcome`, which is not a valid route. Users hitting an error are sent into a 404 loop.

---

## Code Quality and Architecture

**`svelte.config.js` is missing; adapter config is misplaced**
The build adapter is passed inside `vite.config.ts` to the Vite plugin rather than in `svelte.config.js` under `kit.adapter`. SvelteKit tooling reports no adapter found, which is a deployment blocker.

**No error handling anywhere in the app**
There are zero `try/catch` blocks across all source files. API fetch failures, storage parse errors, and unexpected data shapes all propagate unhandled, leaving users with broken or blank UI and no recovery path.

**Lesson detail routes fail on cold start / direct link**
If a user bookmarks or directly navigates to a lesson URL, `lessonsStore` is empty and the page redirects to the list without triggering a data fetch. Detail pages have no independent load path.

**Lesson routing uses slugified titles instead of stable IDs**
URLs are built by slugifying the lesson title string. Titles with punctuation or disambiguation issues can collide or break, and any API-side title rename silently breaks all existing links and completion records.

**No "lesson not found" UI**
When a lesson lookup returns `null` (bad slug, deleted lesson), `TypingGUI` and `CodeGUI` render empty shells with no user-facing error or call to action.

**Possible runtime crash on final lesson step in `Typer`**
`Typer.svelte` increments `currentStep` past the last valid index before calling `complete()`. The template reads `lesson.steps[currentStep].desc` without optional chaining, which can throw on the final step. (`TypingGUI` resets step index first; `Typer` does not.)

**Effect timers not cleaned up on component destroy**
The `wrongTimer` in `TypingGUI` and `Typer`, and `pulseTimer` / `HTMLOutput` timers, are set via `$effect` or `setTimeout` with no teardown. This can produce state updates after the component is unmounted.

**Route guard is client-only**
The learner auth guard in `+layout.svelte` runs in an `$effect` (browser only). No server-side load guard exists, so SSR or prerendered output could briefly expose protected route markup.

**No tests**
There are no test files and no `test` script in `package.json`. Typing logic, storage operations, and routing behavior are entirely unguarded against regressions.

**ESLint a11y rules not enabled**
`eslint.config.js` does not enforce accessibility rules. Numerous buttons across the codebase lack explicit `type="button"`, which can cause unintended form submissions if these elements are ever placed inside a `<form>`.

**Bleeding-edge toolchain versions**
`package.json` pins `typescript@6.0.3` and `vite@8.0.16`, which are very recent releases. Ecosystem plugin compatibility and subtle tooling bugs are elevated risks at these versions.
