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

During a step with `render: true`, each finished **line** is committed the moment its last character is typed:

- `dom` lines are appended to the HTML output.
- `style` lines are appended to the CSS output.

The **Yours** preview re-renders on every committed line and pulses briefly, so the learner feels the cause-and-effect of what they just typed. Steps with `render: false` are typed for practice only — their lines never enter the output or the code minimap.

---

## Layout

The web lesson screen has four panels arranged with draggable dividers:

- **Left pane** — _Typer_: the code lines to type with the cursor, a step progress bar, and the current step's description.
- **Right top** — two side-by-side previews: **🎯 Goal** (the finished output the lesson builds toward) and **✨ Yours** (everything rendered so far).
- **Right bottom** — _CodeOutput_: a tabbed HTML/CSS minimap of all committed lines. The newest lines flash, and the tab auto-switches to whichever language just changed.

Every divider is draggable, and each preview can be collapsed to a thin strip, giving learners full width for whichever view they prefer. The [keyboard guide](keyboard-guide.md) floats over the bottom of the screen.

---

## Further Reading

- [Typing Lessons](typing-lessons.md) — the simpler single-pane typing experience
- [Results and Progress](results-and-progress.md) — what happens when the last step is complete
- [Component Structure](../architecture/component-structure.md) — `CodeGUI`, `Typer`, `CodeOutput`, `PreviewPane`, `Preview`, `ResizableSplit`
