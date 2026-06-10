---
title: Learner System
description: How learner profiles work — creation, color identity, selection, and the active learner session
status: current
audience: architect, developer, pm
tags: [behaviors, learner, profiles, identity]
---

[Docs](../index.md) > [Behaviors](index.md)

# Learner System

A learner is a named profile with a color. Profiles exist so multiple people can share one device without their progress mixing. There are no passwords or accounts — just a name and a color.

---

## Creating a Learner

The learner picks a name (up to 30 characters) and one color from a fixed palette of eight:

| Name | Color |
|------|-------|
| Cherry | `#e64c65` |
| Ocean | `#35aadc` |
| Lime | `#bada55` |
| Tangerine | `#fcb150` |
| Lavender | `#a855f7` |
| Mint | `#10b981` |
| Slate | `#64748b` |
| Coral | `#f97316` |

The palette is fixed intentionally — no hex input, no confusion for beginners. The color becomes the learner's visual identity throughout the app (avatar, cards, accents).

---

## Selecting a Learner

The home screen (`/`) shows all learner profiles as large clickable cards. Selecting one sets them as the active learner and navigates to the dashboard.

- With **6 or fewer** learners: no search, just the grid.
- With **7 or more** learners: a search input appears to filter by name.
- The app supports up to 30 learners.

---

## Active Learner

Only one learner is active at a time. The active learner's ID is stored in `localStorage` under `ct_active_learner`. All progress tracking — attempts, stats, completion — is scoped to this ID.

Returning to `/` lets anyone switch learners. There is no "logout" — selecting a different learner simply replaces the active one.

---

## Further Reading

- [User Journey](user-journey.md) — where learner selection fits in the full flow
- [Data Persistence](../architecture/data-persistence.md) — how learner data is stored
- [State Management](../architecture/state-management.md) — how `learnerStore` works
