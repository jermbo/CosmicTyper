---
title: Architecture Overview
description: The CosmicTyper system at a glance — all moving parts and how they connect
status: current
audience: architect, developer
tags: [architecture, overview, system-design]
---

[Docs](../index.md)

# Architecture Overview

CosmicTyper is a SvelteKit 2 app. Learner profiles and attempt history live in localStorage. Lesson content lives in `data/lessons/` and is served by SvelteKit API routes. An optional `/admin` area edits lessons on disk.

---

## System Map

```mermaid
graph TD
    Data["data/lessons/\nper-lesson files"]
    API["/api/lessons/*"]
    Admin["/admin\nlesson editor"]
    LS["localStorage\nct_ keys"]

    Admin -->|read / write| Data
    Data --> API
    API -->|fetch| LessonsStore
    LS  <-->|hydrate / persist| LearnerStore
    LS  <-->|hydrate / persist| AttemptsStore
    LS  <-->|hydrate / persist| PrefsStore

    LessonsStore --> Routes
    LearnerStore --> Routes
    AttemptsStore --> Routes
    PrefsStore --> Routes

    subgraph Routes["SvelteKit Routes"]
        Home["/  Learner Select"]
        Dashboard["/dashboard"]
        WebLessons["/web-lessons/[id]"]
        TypingLessons["/typing-lessons/[id]"]
        WarmUp["/warm-up"]
    end

    Routes --> Components["UI Components"]
```

---

## Key Layers

| Layer          | What lives here                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| **Routes**     | Pages — each route owns its data-loading and layout                               |
| **Stores**     | Reactive state — `learnerStore`, `lessonsStore`, `attemptsStore`, `prefsStore`, `codeData` |
| **Components** | Reusable UI — `CodeGUI`, `TypingGUI`, `KeyboardGuide`, `ResultsScreen`, etc.      |
| **Data**       | Lesson files — `data/lessons/web/`, `data/lessons/typing/`                        |
| **Server**     | `src/lib/server/` — lesson file I/O and admin session auth; `hooks.server.ts` guards `/admin` |
| **Utils**      | Pure helpers — `storage.ts`, `format.ts`, `lesson.ts`, `drill.ts`                 |
| **Types**      | Shared TypeScript interfaces — `Learner`, `Attempt`, `WebLesson`, `TypingLesson`  |

---

## Technology Choices

- **SvelteKit 2 + Svelte 5 runes** — `$state`, `$derived`, `$effect` replace the old options API
- **TypeScript** throughout
- **Plain CSS** with custom properties — no CSS framework
- **Vite** dev server on port `7777`

---

## Further Reading

- [Routing](routing.md) — page structure and navigation flow
- [State Management](state-management.md) — how stores work and talk to each other
- [Data Persistence](data-persistence.md) — localStorage schema and key conventions
- [Component Structure](component-structure.md) — UI component hierarchy
