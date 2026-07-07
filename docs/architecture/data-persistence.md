---
title: Data Persistence
description: How and where CosmicTyper stores data — localStorage schema and key conventions
status: current
audience: architect, developer
tags: [architecture, storage, localstorage, data]
---

[Docs](../index.md) > [Architecture](index.md)

# Data Persistence

CosmicTyper is local-first: all learner data — profiles, attempts, preferences — lives in the browser's `localStorage`, with no database and no accounts. The `ct_` prefix namespaces every key to avoid collisions. Lesson *content* is the exception: it lives on disk and is served by the app's own API routes (see below).

---

## localStorage Keys

| Key                 | Type        | Owned by        | Description                        |
| ------------------- | ----------- | --------------- | ---------------------------------- |
| `ct_learners`       | `Learner[]` | `learnerStore`  | All learner profiles               |
| `ct_active_learner` | `string`    | `learnerStore`  | ID of the currently active learner |
| `ct_attempts`       | `Attempt[]` | `attemptsStore` | Every lesson attempt, all learners |
| `ct_prefs`          | `Record<learnerId, { keyboardGuide?: boolean }>` | `prefsStore` | Per-learner UI preferences |

---

## Core Data Shapes

```ts
interface Learner {
	id: string; // crypto.randomUUID()
	name: string;
	color: string; // hex from the fixed PALETTE
	createdAt: string; // ISO 8601
	lastActiveAt: string; // ISO 8601
}

interface Attempt {
	id: string;
	learnerId: string;
	lessonId: string;
	lessonType: 'web' | 'typing';
	completedAt: string; // ISO 8601
	duration: number; // seconds
	keystrokes: number; // correct + incorrect
	mistakes: number; // wrong key presses
	accuracy: number; // 0–100
	keyMistakes?: Record<string, number>; // expected char → miss count; absent on older attempts
}
```

---

## Storage Helpers

All reads and writes go through `src/lib/utils/storage.ts` — never call `localStorage` directly in components or stores.

```ts
getLsItem<T>(key); // read + JSON.parse; corrupt values are removed and return null
setLsItem<T>(key, val); // JSON.stringify + write
removeLsItem(key); // delete a key
clearAppStorage(); // remove only ct_-prefixed keys (dev/debug use only)
```

Stores also validate shapes on load: invalid attempts and learners are filtered out, and a learner color outside the palette falls back to the first palette color.

---

## Lesson Content

Lessons live on disk under `data/lessons/`:

| Type    | Path                                      | Format                                      |
| ------- | ----------------------------------------- | ------------------------------------------- |
| Web     | `data/lessons/web/{id}.json`              | Full lesson object                          |
| Typing  | `data/lessons/typing/{id}/meta.json`      | `id`, `title`, `difficulty`                 |
| Typing  | `data/lessons/typing/{id}/lines.txt`      | One line per row — what the learner types   |

The learner app loads lessons via `/api/lessons/*`. Edit lessons in the browser at [`/admin`](../behaviors/lesson-authoring.md) or by editing the files directly.

Lessons are sorted by `difficulty` (alphabetical: `easy` → `hard` → `medium`) when loaded.

One piece of state lives outside localStorage: the admin session is a signed, 24-hour `ct_admin_session` cookie issued by `src/lib/server/auth.ts`.

---

## Legacy Keys

Pre-v3 stored lessons under `web-lessons` and `typing-lessons` with a `hasCompleted` field embedded on each lesson. These keys are deleted automatically on first load. Completion is now derived per-learner from `attemptsStore` — see [State Management](state-management.md).

---

## Further Reading

- [State Management](state-management.md) — how stores hydrate from and write to these keys
- [Learner System](../behaviors/learner-system.md) — what the `Learner` shape represents in the product
- [Results and Progress](../behaviors/results-and-progress.md) — what the `Attempt` shape represents in the product
- [Overview](../overview.md) — why local-first matters for this product
