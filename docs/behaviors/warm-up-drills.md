---
title: Warm-up Drills
description: How to use warm-up drills — personalized practice targeting the keys a learner misses most
status: current
audience: architect, developer, pm
tags: [behaviors, warm-up, drills, mistakes, personalization]
---

[Docs](../index.md) > [Behaviors](index.md)

# Warm-up Drills

A short, personalized practice round on the learner's [dashboard](results-and-progress.md). CosmicTyper quietly tracks *which* keys each learner misses during lessons and builds a warm-up that targets exactly those keys. It's framed as a warm-up, never as "your bad keys" — same spirit as show and forgive.

---

## How to Use It

1. **Open the dashboard.** The **Warm-up card** sits below "Continue learning". If the learner has been missing particular keys lately, the card shows them as keycaps (e.g. `b` `p` `;`) under *Keys to practice*.
2. **Click "Warm up".** A short drill starts — around 8 lines, under two minutes — in the same teleprompter as a normal [typing lesson](typing-lessons.md). Each line mixes three patterns: rhythm lines (`fbf jbj bbb fjb`), real short words containing the key, and pairs of practice keys woven together.
3. **Finish and check the results.** The usual [results screen](results-and-progress.md) appears, comparing against the learner's *previous warm-up* so improvement is visible.
4. **Repeat whenever.** Warm-ups make a nice start to a session. As accuracy on a key improves, it quietly drops out of the rotation and another takes its place — no announcements.

New learners (or genuinely accurate ones) still get a warm-up: a generic home-row round (`f` `j` `d` `k`). The card never disappears, so it never feels like a punishment that only shows up when you struggle.

---

## Where the Keys Come From

- Every lesson attempt records which characters were missed (the character the learner *should* have typed).
- Only the **last 10 attempts** count — old struggles don't haunt anyone.
- A key needs **3+ misses** in that window to qualify; capitals count toward their lowercase key.
- At most **5 keys** show on the card; drills practice the top 4.

Warm-up results feed back into the same tracking, so the rotation updates itself.

---

## Good to Know

- Warm-ups appear in **Recent activity** as "Warm-up", but they don't count toward the *Lessons completed* stat — they're practice, not progress through the course.
- Mistakes from both typing lessons *and* web lessons feed the same pool, so HTML characters like `<` or `;` can show up as practice keys.
- For teachers: the keycaps on the card are a quick read on what a learner is finding hard right now.

---

## Further Reading

- [Keyboard Guide](keyboard-guide.md) — companion feature showing where those keys live
- [Results and Progress](results-and-progress.md) — the results screen warm-ups reuse
- [Trouble-Key Drills spec](../features/trouble-key-drills.md) — design decisions and implementation detail
