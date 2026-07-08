---
title: Keyboard Guide
description: On-screen keyboard that highlights the next key and shows which finger should press it
status: shipped (v1 — phases 1–3; fade-out is future work)
audience: architect, developer, pm
tags: [features, keyboard, finger-hints, accessibility, typing-lessons]
---

[Docs](../index.md) > [Features](index.md)

# Keyboard Guide

A visual keyboard rendered below the lesson text that lights up the next key to press and shows which finger should press it. For learners who don't yet know home row — CosmicTyper's core audience — this removes the scariest part of typing: hunting the physical keyboard with your eyes while losing your place on screen.

The guide is a hint, not a crutch: it can be switched off per learner, and the long-term goal is for it to fade away as confidence grows.

---

## User Experience

- During a [typing lesson](../behaviors/typing-lessons.md) or [web lesson](../behaviors/web-lessons.md), a keyboard floats over the bottom of the screen as an overlay — lesson layout is untouched.
- The **next expected key glows** — a soft pulse, not an alarm.
- When the next character needs Shift (uppercase, `<`, `?`…), **both the base key and the correct Shift key highlight** — always the Shift on the *opposite* hand from the character key, which is the habit worth teaching from day one.
- Every key is **tinted by finger zone** — the standard eight-finger touch-typing zones, each with its own soft color, thumbs sharing the space bar. A short label under the keyboard names the finger for the current key: "left index".
- On a wrong keystroke the guide does nothing extra — the existing red cursor flash is the feedback. Show and forgive; the keyboard never scolds.
- A floating **toggle button** (keyboard icon, bottom-right corner) slides the keyboard on and off screen. The choice is remembered per learner.

---

## Component Design

New component: `src/lib/components/KeyboardGuide/KeyboardGuide.svelte`.

```ts
interface Props {
	nextChar: string | null; // the character the learner must type next, null hides highlight
}
```

The component is fully derived from `nextChar` — no internal state, no knowledge of lessons or learners. Both GUIs already know the next expected character (`actionOutput[currentChar]` in `TypingGUI`), so integration is one prop.

### Supporting data (same folder, plain TS modules)

**`layout.ts`** — the physical layout: rows of keys, each key with its `code`, display legend, width, and finger assignment:

```ts
interface KeyDef {
	code: string; // 'KeyF', 'Semicolon', 'Space', 'ShiftLeft'…
	legend: string; // what's printed on the cap
	finger: Finger; // 'l-pinky' | 'l-ring' | … | 'r-pinky' | 'thumb'
	width?: number; // in key units, default 1
}
```

v1 ships US QWERTY only (see Open Questions).

**`charMap.ts`** — character → key lookup:

```ts
interface KeyTarget {
	code: string; // which key to highlight
	shift: boolean; // whether a Shift key highlights too
}
keyForChar(char: string): KeyTarget | null; // null → no highlight (unknown char)
```

Covers lowercase/uppercase letters, digits, space, and every shifted symbol that appears in lesson content — web lessons make `<`, `>`, `{`, `}`, `:`, `;`, `"`, `/`, `.`, `-`, `#` common, so the map must be complete for the full US layout, not just letters.

An unknown character degrades gracefully: no highlight, no error. The lesson is never blocked by the guide.

---

## Integration

- **`KeyboardDock`** (same folder) wraps `KeyboardGuide` with the toggle button and the show/hide state: a `position: fixed` overlay centered at the bottom of the viewport that slides off screen when toggled, plus the floating toggle button. The GUIs render the dock, not the guide directly.
- **`TypingGUI`** — renders `<KeyboardDock nextChar={actionOutput[currentChar] ?? null} />`. Because the overlay floats above the teleprompter, the active line stays vertically centered regardless of toggle state.
- **`CodeGUI`** — same one-prop integration in `Typer` for [web lessons](../behaviors/web-lessons.md). The overlay spans the viewport rather than the typing pane, so keys stay full size in the two-pane layout.
- **Toggle persistence** — new localStorage key, following the [`ct_` convention](../architecture/data-persistence.md):

| Key        | Type                                            | Owned by     | Description                  |
| ---------- | ----------------------------------------------- | ------------ | ---------------------------- |
| `ct_prefs` | `Record<learnerId, { keyboardGuide: boolean }>` | `prefsStore` | Per-learner UI preferences   |

A tiny `prefsStore` (same pattern as `attemptsStore`: load, mutate, persist through `storage.ts` helpers). Default is **on** — the audience that needs the guide most is the least likely to discover a toggle. Missing entries mean default.

---

## Visual & Accessibility Notes

- Finger-zone tints stay soft and desaturated so the *highlight* is unmistakably the loudest thing on the keyboard.
- The glow pulse respects `prefers-reduced-motion` (steady highlight, no animation) — same media query `TypingGUI` already uses for scrolling.
- The guide is decorative reinforcement of information already on screen: mark it `aria-hidden="true"` so screen readers aren't told about every key change.
- Keys are display-only in v1 — not clickable, not focusable. This is a map, not an input method (see Open Questions).
- Below ~460px viewport width (or on touch-only devices, where a physical-keyboard map is meaningless) the overlay and its toggle auto-hide regardless of the stored preference.

---

## Implementation Phases

1. **Static keyboard** — `layout.ts`, finger-zone rendering, docked into `TypingGUI` behind the toggle.
2. **Highlighting** — `charMap.ts`, next-key glow, Shift pairing, finger label.
3. **Persistence + CodeGUI** — `prefsStore`, toggle memory, web-lesson integration.
4. **Fade-out (later)** — auto-suggest hiding once a learner sustains high accuracy; ties into [trouble-key drills](trouble-key-drills.md) data.

---

## Open Questions

- **International layouts** — QWERTY-US is assumed everywhere (lesson content included). Is AZERTY/QWERTZ support ever in scope, or is US-only a stated constraint?
- Should the guide highlight the learner's current [trouble keys](trouble-key-drills.md) with a subtle marker during warm-up drills?
- Tap-to-type on the on-screen keys for touch devices — out of scope for v1, but is it wanted at all given the product teaches *physical* typing?

---

## Further Reading

- [Trouble-Key Drills](trouble-key-drills.md) — companion feature sharing the same lesson surfaces
- [Typing Lessons](../behaviors/typing-lessons.md) — primary integration point
- [Component Structure](../architecture/component-structure.md) — where `KeyboardGuide` fits
- [Data Persistence](../architecture/data-persistence.md) — the `ct_prefs` key follows these conventions
