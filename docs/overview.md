---
title: CosmicTyper Overview
description: What CosmicTyper is, why it exists, and who it's for
status: current
audience: architect, developer, pm
tags: [vision, overview, product]
---

[Docs](index.md)

# CosmicTyper Overview

CosmicTyper is a browser-based typing practice tool built for non-computer-friendly learners. The goal is to make typing feel approachable — not intimidating. HTML and CSS knowledge is a side benefit, not the headline.

---

## Who It's For

Students and beginners who are not yet comfortable with computers. Multiple learners may share a single device — a family at home or a classroom with a shared machine.

---

## What It Does

CosmicTyper has two learning modes:

**[Web Lessons](behaviors/web-lessons.md)** — The learner types real HTML and CSS. A live preview updates as they progress, making the connection between code and visual output immediate and tangible.

**[Typing Lessons](behaviors/typing-lessons.md)** — General typing practice with structured, progressively harder content.

After every lesson a [results screen](behaviors/results-and-progress.md) shows time, keystrokes, mistakes, and accuracy — with a comparison to the learner's previous attempt so improvement is always visible.

Two practice aids support both modes: an on-screen [keyboard guide](behaviors/keyboard-guide.md) that highlights the next key and the finger that presses it, and personalized [warm-up drills](behaviors/warm-up-drills.md) on the dashboard targeting the keys each learner misses most.

---

## Core Principles

- **Local-first** — no accounts, no server, everything in the browser.
- **[Multi-learner](behaviors/learner-system.md)** — each person has a profile so their progress never mixes with someone else's.
- **Show and forgive** — wrong keystrokes are counted and flashed red, but the lesson doesn't stop. Learning should feel safe.
- **Approachable UI** — big cards, named colors, no jargon. Designed for people who find computers uncomfortable.

---

## Further Reading

- [User Journey](behaviors/user-journey.md) — end-to-end flow through the app
- [Learner System](behaviors/learner-system.md) — how profiles and identity work
- [Architecture Overview](architecture/index.md) — how the system is built
- [State Management](architecture/state-management.md) — how learner and lesson data flows
- [Roadmap](roadmap.md) — where CosmicTyper is going next
