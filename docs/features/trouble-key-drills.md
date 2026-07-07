---
title: Trouble-Key Drills
description: Per-key mistake tracking and auto-generated warm-up drills targeting each learner's weak keys
status: planned
audience: architect, developer, pm
tags: [features, drills, mistakes, personalization, typing-lessons]
---

[Docs](../index.md) > [Features](index.md)

# Trouble-Key Drills

CosmicTyper already counts *how many* mistakes a learner makes. This feature tracks *which keys* they miss, then generates a short, personalized warm-up drill targeting those keys.

The tone matters as much as the mechanics. This is never framed as "your bad keys" — it's a **warm-up**: a friendly, optional practice round that happens to focus where it helps most. Same spirit as [show and forgive](../overview.md).

---

## User Experience

1. The learner's [dashboard](../behaviors/results-and-progress.md) shows a **Warm-up card** once enough data exists: their current practice keys rendered as big friendly keycaps (e.g. `B` `P` `;`) and one button — "Warm up".
2. Tapping it starts a short drill (~8 lines, under two minutes) that looks and behaves exactly like a [typing lesson](../behaviors/typing-lessons.md) — same teleprompter, same keystroke mechanics.
3. The [results screen](../behaviors/results-and-progress.md) appears as usual, comparing against their previous warm-up.
4. As accuracy on a key improves, it drops out of the rotation and another takes its place. No announcement, no "you failed X" — the warm-up just quietly evolves.

If a learner has no trouble keys (new profile, or genuinely accurate), the card shows a generic home-row warm-up instead of hiding — the feature should never feel like a punishment that only appears when you're struggling.

---

## Data Capture

### Per-key mistake recording

`TypingGUI` and `CodeGUI` already have a single wrong-key branch in their keydown handlers (see `handleKeydown` in `src/lib/components/TypingGUI/TypingGUI.svelte`). In that branch, record the **expected character** (what the learner *should* have typed — that's the key that needs practice, regardless of what they pressed instead):

```ts
// inside the wrong-key branch
keyMistakes[expectedChar] = (keyMistakes[expectedChar] ?? 0) + 1;
```

### Type changes

`LessonResult` and `Attempt` (in `src/lib/types/index.ts`) each gain one optional field:

```ts
interface Attempt {
	// ...existing fields...
	keyMistakes?: Record<string, number>; // expected char → miss count
}
```

- Optional so every existing attempt in `ct_attempts` stays valid — `isValidAttempt` in `attemptsStore` must accept its absence.
- Keys are single characters exactly as they appear in lesson text (`"e"`, `"E"`, `" "`, `"<"`). No normalization at capture time; aggregation decides how to fold case.
- No new localStorage key. Attempts remain the single source of truth ([data persistence](../architecture/data-persistence.md)); everything else is derived.

---

## Aggregation: What Counts as a Trouble Key

A derived helper on `attemptsStore` (or a small `troubleKeys.ts` util):

```ts
troubleKeys(learnerId: string, max = 5): string[]
```

Rules for v1:

- **Window** — only the learner's most recent 10 attempts that carry `keyMistakes`. Old struggles shouldn't haunt anyone.
- **Case folding** — `E` misses count toward `e`. Drills practice the lowercase form unless the shifted form itself dominates.
- **Threshold** — a key qualifies with ≥ 3 misses inside the window. Below that it's noise.
- **Cap** — return at most 5 keys, highest miss count first. A warm-up targeting twelve keys targets nothing.
- **Exclusions** — never include characters the on-screen keyboard can't teach in isolation (nothing in v1; revisit if web lessons add exotic characters).

Raw miss counts are frequency-biased (`e` and space get typed far more, so they get missed more). v1 accepts this — the threshold plus recency window keeps it reasonable. Miss *rate* (misses ÷ exposure) is a v2 refinement; see Open Questions.

---

## Drill Generation

A pure function, no storage:

```ts
generateDrill(keys: string[]): TypingLesson
```

- **Shape** — returns a normal `TypingLesson` (`id`, `title`, `difficulty: 'easy'`, `steps: string[]`) so `TypingGUI` renders it with zero changes.
- **Id scheme** — `drill:<learnerId>:<yyyy-mm-dd>`. The `drill:` prefix can never collide with real lesson ids, so `completedLessonIds` and lesson-completion UI are unaffected automatically.
- **Content** — ~8 lines mixing three patterns per trouble key:
  - *Rhythm lines*: the key alternated with home-row anchors — `fbf jbj bbb fjb`
  - *Word lines*: real short words containing the key, drawn from a small bundled word list (`data/drill-words.txt`, one word per line, curated for beginner-friendliness)
  - *Mixed lines*: two trouble keys woven together in one line
- **Non-letter keys** (space, `;`, `<`, `.`) use rhythm and mixed lines only — there's no word bank for `<`.
- Lines stay short (≤ 30 chars) and lowercase unless the trouble key itself is shifted.

Drill attempts are recorded through the normal completion flow (`attemptsStore.add` with `lessonType: 'typing'`), so warm-ups show up in duration/accuracy history and feed *back into* trouble-key aggregation — the loop closes itself.

---

## UI Notes

- **Route** — `/warm-up`, guarded by active learner like every lesson route ([routing](../architecture/routing.md)). It generates the drill on entry from the current trouble keys and hands it to `TypingGUI`.
- **Dashboard card** — keycap visuals, minimal text. Copy guideline: "Warm up", "Keys to practice" — never "weak", "worst", "problem", or "mistakes" in learner-facing text.
- **Results screen** — reuse `ResultsScreen` as-is. The comparison baseline is the learner's previous warm-up attempt (`latestFor` with the drill id pattern).

---

## Implementation Phases

1. **Capture** — `keyMistakes` through `TypingGUI`/`CodeGUI` → `LessonResult` → `Attempt`. Ship this first even if nothing displays it; the feature needs accumulated data to be useful on day one of the UI.
2. **Aggregation** — `troubleKeys()` helper + unit tests around window/threshold/case-folding.
3. **Drill generator** — `generateDrill()` + word list + unit tests.
4. **UI** — dashboard warm-up card, `/warm-up` route, results wiring.

---

## Open Questions

- **Miss rate vs. raw count** — computing exposure per character is derivable (expected-char exposure = the character's count in the lesson text + misses on it, since wrong keys don't advance), but lesson content can be edited in `/admin` after the attempt. Storing per-attempt char counts would be robust but doubles attempt size. Deferred to v2.
- Should the warm-up card show *why* these keys were chosen (tiny accuracy sparkline per key), or is that too much information for the audience?
- Should web-lesson mistakes and typing-lesson mistakes feed one shared pool (current plan) or separate pools per mode?

---

## Further Reading

- [Keyboard Guide](keyboard-guide.md) — companion feature; the guide can highlight trouble keys during drills
- [Typing Lessons](../behaviors/typing-lessons.md) — the mechanics drills reuse
- [Results and Progress](../behaviors/results-and-progress.md) — where warm-up attempts surface
- [Data Persistence](../architecture/data-persistence.md) — the `Attempt` shape this extends
