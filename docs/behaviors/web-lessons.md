---
title: Web Lessons
description: How HTML/CSS typing lessons work — steps, keystroke mechanics, live preview, and show-and-forgive
status: current
audience: architect, developer, pm
tags: [behaviors, web-lessons, typing, html, css, preview]
---

[Docs](../index.md) > [Behaviors](index.md)

# Web Lessons

A web lesson teaches HTML and CSS by having the learner type real code character by character. A live preview updates as they go, making the connection between what they type and what it looks like immediate.

---

## Lesson Structure

Each web lesson is a sequence of **steps**. Every step has:

- **`desc`** — a plain-English instruction shown to the learner (e.g. "Add a heading to the page")
- **`type`** — either `dom` (HTML) or `style` (CSS)
- **`action`** — the exact lines of code the learner must type
- **`render`** — whether completing this step updates the live preview

```mermaid
flowchart LR
    Lesson --> Step1["Step 1\ntype HTML"]
    Step1 --> Step2["Step 2\ntype CSS"]
    Step2 --> StepN["Step N\n..."]
    StepN --> Complete["Lesson complete"]
```

---

## Keystroke Mechanics

The learner types into the whole window — there is no text input field. Every keypress is captured globally.

1. Timer starts on the first keystroke.
2. The expected character is shown with a blinking underline cursor.
3. **Correct key** — the character lights up green and the cursor advances.
4. **Wrong key** — the cursor flashes red for 300ms, a mistake is counted, the cursor does not move. This is "show and forgive": the lesson never stops, but mistakes are recorded.
5. At the end of a line, the completed row is committed and the next line becomes active.
6. At the end of a step, the lesson advances to the next step automatically.

---

## Live Preview

When a step with `render: true` is completed:

- `dom` steps push their lines into the HTML output.
- `style` steps push their lines into the CSS output.

The preview pane re-renders on every committed row, so the learner sees the page build up in real time. Steps with `render: false` advance the code buffer without updating the visual output.

---

## Layout

The web lesson screen has four panels arranged in a resizable two-column split:

- **Left column**
  - _Typer_ — the active typing area (step description, expected lines, cursor)
  - _CodeOutput_ — a tabbed HTML/CSS minimap showing all committed lines; the lines added by the most recent step flash briefly so the learner can see exactly what they just contributed

- **Right column**
  - _Live preview_ — updates as render steps complete
  - _Goal preview_ — shows the finished output the lesson builds toward, so learners always know what they're typing toward

The divider between the columns is draggable. Each preview pane can also be collapsed to a thin strip, giving learners full screen for whichever view they prefer.

---

## Further Reading

- [Typing Lessons](typing-lessons.md) — the simpler single-pane typing experience
- [Results and Progress](results-and-progress.md) — what happens when the last step is complete
- [Component Structure](../architecture/component-structure.md) — `CodeGUI`, `Typer`, `CodeOutput`, `PreviewPane`, `Preview`, `ResizableSplit`
