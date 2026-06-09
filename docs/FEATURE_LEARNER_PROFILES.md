# Feature Spec: Learner Profiles & Progress Tracking

**Status:** Planned  
**Created:** June 9, 2026  
**Scope:** Multi-session, multi-learner progress tracking — local-first, no server required

---

## Overview

CosmicTyper is designed to teach non-computer-friendly people to type, with HTML/CSS knowledge as a side benefit. This feature introduces learner profiles, per-learner progress tracking, a personal dashboard, and a lesson results screen — all stored in `localStorage` with no backend dependency.

---

## Goals

- Multiple learners can share a single device without their data mixing
- Each learner has a visual identity (name + color) for quick recognition
- Progress is tracked across multiple attempts per lesson so learners can see improvement over time
- Wrong keystrokes give immediate visual feedback ("show and forgive") and are counted
- After completing a lesson, the learner sees a results screen with their stats
- Each learner has a personal dashboard showing their history and progress

---

## User Flows

### 1. App Entry

```
Open App
  └─▶ Learner Selection Screen
        ├─▶ Select existing learner ──▶ Personal Dashboard
        └─▶ Create new learner ──▶ Personal Dashboard
```

The learner selection screen is always the entry point. There is no auto-login or "last active" shortcut — every session starts with a conscious learner selection. This keeps the experience clear for non-technical users sharing a device.

### 2. Lesson Flow

```
Personal Dashboard
  └─▶ Navigate to Web Lessons or Typing Lessons
        └─▶ Select a lesson
              └─▶ Lesson (typing interface)
                    └─▶ Results Screen
                          ├─▶ Try Again ──▶ Same lesson
                          └─▶ Done ──▶ Personal Dashboard
```

### 3. Create Learner Flow

```
Learner Selection Screen
  └─▶ "Add Learner" button
        └─▶ Enter name
              └─▶ Pick a color
                    └─▶ Confirm ──▶ Personal Dashboard (first visit, no history)
```

---

## Screens

### Learner Selection Screen

- **Default layout:** Large cards (one per learner), displayed in a grid
- **Scale:** Designed for 2–4 learners; gracefully handles up to 30
- **Search:** A search/filter input appears when there are more than 6 learners
- Each card shows:
  - Learner avatar (colored circle with initials)
  - Learner name
  - Last active date (e.g., "Last seen 2 days ago")
- An **"Add Learner"** card is always visible at the end of the grid
- No delete from this screen (manage from dashboard settings)

### Create Learner Form

- Name input (text, required, max 30 chars)
- Color picker (a fixed palette of ~8 friendly colors, no hex input)
- Avatar preview updates live as name and color are selected
- Submit creates the profile and navigates to the dashboard

### Personal Dashboard

Shows a summary of the learner's activity and quick access to lessons.

**Sections:**
1. **Header** — Avatar, name, and a greeting ("Welcome back, Alex!")
2. **Stats strip** — Three key numbers at a glance:
   - Lessons completed (count)
   - Average accuracy (across all attempts)
   - Total time practiced (formatted as "2h 14m")
3. **Continue Learning** — The most recently started but incomplete lesson, if any
4. **Recent Activity** — Last 5 completed lessons with date and accuracy
5. **Quick Nav** — Buttons to go to Web Lessons or Typing Lessons

### Results Screen

Shown immediately after a lesson completes, before returning to the lesson list.

**Displays:**
- Lesson name
- Time taken (e.g., "1m 42s")
- Keystrokes
- Mistakes made
- Accuracy percentage (keystrokes − mistakes) / keystrokes × 100
- **Comparison to previous attempt** if one exists:
  - "Better than last time! ↑ 8% accuracy"
  - "Your fastest run yet! ↓ 23s"
  - "First time completing this lesson 🎉" on first attempt
- Two actions: **Try Again** and **Done**

### Error Feedback (Show and Forgive)

When a wrong key is pressed during a lesson:
- The current character flashes red briefly (CSS animation, ~300ms)
- A mistake is counted in the background
- The lesson does **not** advance — the learner must still press the correct key
- No blocking, no sound, no penalty beyond the count — just clear visual feedback

---

## Data Model

### Learner

```typescript
interface Learner {
  id: string;          // generated uuid (crypto.randomUUID)
  name: string;
  color: string;       // one of the palette values, e.g. '#e64c65'
  createdAt: string;   // ISO 8601
  lastActiveAt: string;
}
```

### Attempt

```typescript
interface Attempt {
  id: string;
  learnerId: string;
  lessonId: string;
  lessonType: 'web' | 'typing';
  completedAt: string;  // ISO 8601
  duration: number;     // seconds
  keystrokes: number;   // total correct + incorrect key presses
  mistakes: number;     // wrong key presses
  accuracy: number;     // 0–100, computed as (keystrokes - mistakes) / keystrokes * 100
}
```

---

## localStorage Schema

All keys are prefixed with `ct_` to avoid collisions with other apps.

| Key | Type | Description |
|-----|------|-------------|
| `ct_learners` | `Learner[]` | All learner profiles |
| `ct_active_learner` | `string` | ID of the currently selected learner |
| `ct_lessons_web` | `WebLesson[]` | Web lesson definitions (no per-learner state) |
| `ct_lessons_typing` | `TypingLesson[]` | Typing lesson definitions (no per-learner state) |
| `ct_attempts` | `Attempt[]` | All attempts across all learners |

> **Note:** The current storage keys `web-lessons` and `typing-lessons` embed `hasCompleted` directly on the lesson object, which is not compatible with multiple learners. These will be migrated to `ct_lessons_web` / `ct_lessons_typing` (definitions only) with completion state derived from `ct_attempts` per learner.

**Deriving lesson completion per learner:**
```typescript
const completedLessonIds = attempts
  .filter(a => a.learnerId === activeLearner.id)
  .map(a => a.lessonId);

const hasCompleted = completedLessonIds.includes(lesson.id);
```

---

## Store Architecture Changes

### New: `learner.svelte.ts`

```typescript
class LearnerStore {
  learners = $state<Learner[]>([]);
  activeLearner = $state<Learner | null>(null);

  load() { ... }           // hydrate from localStorage
  create(name, color) { ... }
  setActive(id) { ... }
  deactivate() { ... }
}

export const learnerStore = new LearnerStore();
```

### New: `attempts.svelte.ts`

```typescript
class AttemptsStore {
  attempts = $state<Attempt[]>([]);

  load() { ... }
  add(attempt: Omit<Attempt, 'id' | 'completedAt'>) { ... }
  forLearner(learnerId: string) { ... }       // filter by learner
  forLesson(learnerId, lessonId) { ... }       // history for one lesson
  latestFor(learnerId, lessonId) { ... }       // most recent attempt
  bestAccuracyFor(learnerId, lessonId) { ... }
}

export const attemptsStore = new AttemptsStore();
```

### Modified: `lessons.svelte.ts`

- Remove `hasCompleted` / `hasStarted` from the stored lesson objects
- Storage keys updated to `ct_lessons_web` and `ct_lessons_typing`
- Completion state is always derived from `attemptsStore` for the active learner

---

## Component Architecture

### New Components

| Component | Location | Description |
|-----------|----------|-------------|
| `LearnerSelect.svelte` | `routes/` | Entry screen, learner cards + add button |
| `LearnerCard.svelte` | `lib/components/` | Single learner card (avatar, name, last seen) |
| `LearnerAvatar.svelte` | `lib/components/` | Colored circle with initials, reusable |
| `CreateLearner.svelte` | `lib/components/` | Name input + color picker form |
| `Dashboard.svelte` | `routes/dashboard/` | Personal dashboard page |
| `ResultsScreen.svelte` | `lib/components/` | Post-lesson results overlay |
| `ColorPicker.svelte` | `lib/components/` | Fixed palette color selector |

### Modified Components

| Component | Change |
|-----------|--------|
| `TypingGUI.svelte` | Track keystrokes + mistakes, emit result data on complete |
| `Typer.svelte` | Track keystrokes + mistakes, emit result data on complete |
| `LessonsList.svelte` | Derive `hasCompleted` from attemptsStore for active learner |
| `Nav.svelte` | Add active learner avatar + "switch learner" affordance |
| `+layout.svelte` | Guard: redirect to `/` (learner select) if no active learner |

---

## Route Changes

| Route | Change |
|-------|--------|
| `/` | Becomes the Learner Selection screen (replaces the redirect to `/welcome`) |
| `/welcome` | Removed — welcome content moves into the dashboard header |
| `/dashboard` | New — personal dashboard for the active learner |
| `/web-lessons` | Guard: requires active learner |
| `/typing-lessons` | Guard: requires active learner |

---

## Learner Avatar Colors (Palette)

Eight distinct, friendly colors — enough variety without overwhelming a beginner:

| Name | Hex |
|------|-----|
| Cherry | `#e64c65` |
| Ocean | `#35aadc` |
| Lime | `#bada55` |
| Tangerine | `#fcb150` |
| Lavender | `#a855f7` |
| Mint | `#10b981` |
| Slate | `#64748b` |
| Coral | `#f97316` |

---

## Implementation Phases

This feature is large enough to require multiple iterations. Each phase is independently shippable.

### Phase 1 — Learner Profiles
- `Learner` type and `learnerStore`
- Learner selection screen (`/`)
- Create learner form (name + color picker)
- Active learner persisted in localStorage
- Layout guard redirecting to `/` when no active learner
- Learner avatar in nav with switch option

### Phase 2 — Storage Migration
- Rename localStorage keys to `ct_` prefix
- Remove `hasCompleted` / `hasStarted` from lesson objects
- `attemptsStore` scaffolded (empty, no UI yet)
- `LessonsList` derives completion from attempts store

### Phase 3 — Error Tracking
- Wrong keystroke detection in `TypingGUI` and `Typer`
- Red flash animation on wrong key
- Keystroke and mistake counters tracked during lesson

### Phase 4 — Results Screen
- `ResultsScreen` component
- Attempt saved to `attemptsStore` on lesson completion
- Show time, keystrokes, mistakes, accuracy
- Comparison to previous attempt
- "Try Again" and "Done" actions

### Phase 5 — Personal Dashboard
- `/dashboard` route
- Stats strip (completed, accuracy, time)
- Recent activity list
- Continue learning shortcut

### Phase 6 — Progress History (Future)
- Per-lesson attempt history view
- Simple improvement chart (no charting library — CSS bar chart)

---

## Open Questions

- Should learners be able to rename themselves or change their color from the dashboard?
- Should there be any way to delete a learner and their data (requires a confirmation step given the audience)?
- Should the "switch learner" in the nav require navigating back to the selection screen, or show an inline dropdown?

---

## Related Docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [MODERNIZATION_ROADMAP.md](./MODERNIZATION_ROADMAP.md)
- [DEVELOPMENT.md](./DEVELOPMENT.md)
