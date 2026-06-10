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
Learners can see their accuracy trend over time per lesson — not just the last attempt. The data is already being stored in `attemptsStore`; this is a display feature.

**Lesson Completion Indicators**
The lessons list should surface which lessons a learner has already completed and what their best accuracy was. Again, data exists — needs a UI pass.

**Offline Support**
Lessons are fetched from an external API and cached in localStorage. A service worker would make the app fully offline-capable after the first load.

---

## Medium Term

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
- [Data Persistence](architecture/data-persistence.md) — how attempts are stored today
- [State Management](architecture/state-management.md) — how attemptsStore works
