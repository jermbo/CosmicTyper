---
title: Roadmap
description: Where CosmicTyper is going — known gaps, ideas, and future direction
status: current
audience: architect, developer, pm
tags: [roadmap, planning, future]
---

[Docs](index.md)

# Roadmap

CosmicTyper v3 is feature-complete for its core loop: select a learner, practice a lesson, see results, track progress over time. What follows are the known next steps.

---

## Near Term

**Progress History**
Learners can see their accuracy trend over time per lesson — not just the last attempt. The data is already being stored in [`attemptsStore`](architecture/state-management.md); this is a display feature.

**Best Accuracy on Lesson Lists**
The lessons list now shows a completion checkmark per lesson, but not the learner's best accuracy. Data exists in [`attemptsStore`](architecture/state-management.md) — needs a UI pass.

**Offline Support**
Lessons are [served from disk via API routes](architecture/data-persistence.md), and progress lives in localStorage. A service worker caching the app shell and lesson responses would make it fully offline-capable after the first load.

---

## Recently Shipped

**Keyboard Guide** — [how to use it](behaviors/keyboard-guide.md) · [spec](features/keyboard-guide.md)
An on-screen keyboard overlay that highlights the next key and shows which finger should press it. The auto-fade-out idea (hiding as accuracy grows) remains future work.

**Warm-up Drills** — [how to use it](behaviors/warm-up-drills.md) · [spec](features/trouble-key-drills.md)
Per-key mistake capture on every attempt, plus auto-generated warm-up drills on the dashboard targeting each learner's practice keys. Miss-*rate* weighting (vs. raw counts) remains a v2 idea.

**Lesson Authoring (Admin)** — [how it works](behaviors/lesson-authoring.md)
A password-protected `/admin` area for creating and editing lessons in the browser. Changes write straight to `data/lessons/` on disk and go live on save.

---

## Medium Term

**Progress History View**
A dedicated screen showing a learner's performance over time — accuracy charts, time spent, lessons completed per week.

**Guided Lesson Authoring**
The `/admin` editor exists for whoever runs the app, but authoring is still developer-flavored (steps, `dom`/`style` types, render flags). A friendlier authoring flow — or shareable lesson packs — would let teachers tailor content without touching those concepts.

---

## Open Questions

- Should learners be able to reset their progress without deleting their profile?
- Is there a meaningful difference between "completed" and "mastered" for a lesson?
- Should the app support a classroom/admin mode where a teacher can see all learner progress?

---

## Further Reading

- [Overview](overview.md) — the product's core principles
- [User Journey](behaviors/user-journey.md) — the current end-to-end flow
- [Results and Progress](behaviors/results-and-progress.md) — what the dashboard and results screen show today
- [Data Persistence](architecture/data-persistence.md) — how attempts are stored today
- [State Management](architecture/state-management.md) — how attemptsStore works
