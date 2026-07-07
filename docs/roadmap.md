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

**Lesson Completion Indicators**
The lessons list should surface which lessons a learner has already completed and what their best accuracy was. Again, data exists — needs a UI pass.

**Offline Support**
Lessons are [bundled in the app](architecture/data-persistence.md). A service worker would make the app fully offline-capable after the first load.

**Keyboard Guide** — spec: [Keyboard Guide](features/keyboard-guide.md)
An on-screen keyboard below the lesson that highlights the next key and shows which finger should press it. Standalone UI feature; ships in phases starting with typing lessons.

**Trouble-Key Capture** — spec: [Trouble-Key Drills](features/trouble-key-drills.md)
Record *which* keys a learner misses on every attempt, not just how many mistakes. Ship the capture phase early so data accumulates before the drills UI lands.

---

## Medium Term

**Trouble-Key Drills** — spec: [Trouble-Key Drills](features/trouble-key-drills.md)
Auto-generated warm-up drills targeting each learner's weak keys, built from the captured per-key mistake data. Depends on Trouble-Key Capture having been live long enough to be meaningful.

**Progress History View**
A dedicated screen showing a learner's performance over time — accuracy charts, time spent, lessons completed per week.

**Lesson Authoring**
The ability to create custom lessons, either in-app or via a simple data format, so teachers can tailor content to their students.

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
