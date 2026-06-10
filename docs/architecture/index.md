---
title: Architecture Overview
description: The CosmicTyper system at a glance — all moving parts and how they connect
status: current
audience: architect, developer
tags: [architecture, overview, system-design]
---

[Docs](../index.md)

# Architecture Overview

CosmicTyper is a SvelteKit 2 single-page application running entirely in the browser. There is no backend. Data lives in localStorage. Lessons are fetched from an external API and cached locally.

---

## System Map

```mermaid
graph TD
    API["External API\nsampleapis.com/typer"]
    LS["localStorage\nct_ keys"]

    API -->|fetch + cache| LessonsStore
    LS  <-->|hydrate / persist| LessonsStore
    LS  <-->|hydrate / persist| LearnerStore
    LS  <-->|hydrate / persist| AttemptsStore

    LessonsStore --> Routes
    LearnerStore --> Routes
    AttemptsStore --> Routes

    subgraph Routes["SvelteKit Routes"]
        Home["/  Learner Select"]
        Dashboard["/dashboard"]
        WebLessons["/web-lessons/[id]"]
        TypingLessons["/typing-lessons/[id]"]
    end

    Routes --> Components["UI Components"]
```

---

## Key Layers

| Layer | What lives here |
|-------|----------------|
| **Routes** | Pages — each route owns its data-loading and layout |
| **Stores** | Reactive state — `learnerStore`, `lessonsStore`, `attemptsStore`, `codeDataStore` |
| **Components** | Reusable UI — `CodeGUI`, `TypingGUI`, `LearnerCard`, `ResultsScreen`, etc. |
| **Utils** | Pure helpers — `storage.ts`, `api.ts`, `format.ts`, `lesson.ts` |
| **Types** | Shared TypeScript interfaces — `Learner`, `Attempt`, `WebLesson`, `TypingLesson` |

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
