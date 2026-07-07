---
title: Typing Lessons
description: How general typing lessons work — teleprompter display and keystroke mechanics
status: current
audience: architect, developer, pm
tags: [behaviors, typing-lessons, typing, teleprompter]
---

[Docs](../index.md) > [Behaviors](index.md)

# Typing Lessons

A typing lesson is pure typing practice — no code, no preview. The learner works through a sequence of text lines one at a time, building speed and accuracy.

---

## Lesson Structure

A typing lesson is a flat list of **steps**, where each step is a single string — a line of text to type. There are no sub-parts or descriptions. The lesson is just: type this, then this, then this.

---

## Teleprompter Display

All lines are shown at once, stacked vertically. The display behaves like a teleprompter:

- **Done lines** (above the active line) — dimmed, solid black, 45% opacity. They fade into the past.
- **Active line** — highlighted with a light background band. This is where the cursor is.
- **Upcoming lines** (below the active line) — faint gray preview of what's coming next.

As the learner completes each line, the view scrolls smoothly to keep the active line centered vertically. The learner's eye never has to search for where they are.

```
  gone line, faded out          ← done
  another done line             ← done
┌─────────────────────────────┐
│  the line you are typing now │  ← active (highlighted)
└─────────────────────────────┘
  next line, grayed out         ← upcoming
  and the one after that        ← upcoming
```

---

## Keystroke Mechanics

Identical to [web lessons](web-lessons.md) at the keystroke level:

1. Timer starts on the first keystroke.
2. **Correct key** — character turns green, cursor advances.
3. **Wrong key** — cursor flashes red for 300ms, mistake counted, cursor does not move (show and forgive). The character the learner *should* have typed is recorded for [warm-up drills](warm-up-drills.md).
4. End of line — automatically advances to the next step. A progress bar above the text tracks "Step N / M".
5. End of last line — lesson complete, results screen appears.

The on-screen [keyboard guide](keyboard-guide.md) floats over the bottom of the screen, glowing the next key to press.

---

## Further Reading

- [Web Lessons](web-lessons.md) — the richer two-pane HTML/CSS experience
- [Results and Progress](results-and-progress.md) — what happens when the last line is typed
- [Component Structure](../architecture/component-structure.md) — `TypingGUI`
