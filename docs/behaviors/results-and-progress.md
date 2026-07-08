---
title: Results and Progress
description: How the results screen works, how accuracy is calculated, and what the dashboard shows
status: current
audience: architect, developer, pm
tags: [behaviors, results, progress, dashboard, accuracy]
---

[Docs](../index.md) > [Behaviors](index.md)

# Results and Progress

Every completed lesson produces a results screen. Every attempt is saved to history. The dashboard surfaces that history as a personal progress summary.

---

## Results Screen

The results screen appears as a modal overlay the moment the last step is completed. It shows four stats for the current run:

| Stat           | What it means                                                                |
| -------------- | ---------------------------------------------------------------------------- |
| **Time**       | Total elapsed seconds from first keystroke to last                           |
| **Keystrokes** | Every key pressed — correct and incorrect combined                           |
| **Mistakes**   | Wrong key presses only                                                       |
| **Accuracy**   | `(keystrokes - mistakes) / keystrokes × 100`, rounded to the nearest integer |

Below the stats, a comparison to the previous attempt is shown:

- First time completing the lesson → "First time completing this lesson 🎉"
- Accuracy improved → "Better than last time! ↑ N% accuracy"
- Accuracy dropped → "↓ N% accuracy vs. last time"
- Accuracy unchanged → "Same accuracy as last time"
- Time improved → "Faster! ↓ Xm Xs vs. last time"
- Time slower → "↑ Xm Xs slower than last time"

The learner can **Try Again** (resets and replays the same lesson) or **Done** (navigates to the dashboard). Pressing Escape acts as Done.

---

## How Attempts Are Saved

The `Attempt` record is saved to [`attemptsStore`](../architecture/state-management.md) the moment the lesson completes — before the learner picks a button — and persisted in `localStorage` under [`ct_attempts`](../architecture/data-persistence.md). Trying again doesn't discard the finished run; it stays in history. Every attempt is kept — not just the most recent. This enables comparison over time.

---

## Dashboard Stats

The dashboard derives all its numbers from the learner's full attempt history at read time:

| Stat                  | Derived from                                                       |
| --------------------- | ------------------------------------------------------------------ |
| **Lessons completed** | Count of unique lesson IDs the learner has completed at least once ([warm-up drills](warm-up-drills.md) don't count) |
| **Average accuracy**  | Mean accuracy across all attempts, warm-ups included               |
| **Time practiced**    | Sum of all attempt durations                                       |
| **Recent activity**   | Last 5 attempts, sorted by completion date                         |
| **Continue learning** | First uncompleted lesson — web lessons first, then typing lessons  |

Completion is never stored on the lesson itself. It is always derived per-learner from the attempts list, so switching learners always shows the right completion state.

---

## Further Reading

- [User Journey](user-journey.md) — where results and the dashboard fit in the full flow
- [Data Persistence](../architecture/data-persistence.md) — the `Attempt` shape and `ct_attempts` key
- [State Management](../architecture/state-management.md) — how `attemptsStore` queries attempts
