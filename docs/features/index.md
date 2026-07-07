---
title: Features Overview
description: Orientation for the features folder — planned and in-progress work
status: current
audience: architect, developer, pm
tags: [features, overview, navigation]
---

[Docs](../index.md)

# Features Overview

The features folder holds specs for planned and in-progress work. Each document describes one feature end to end: the user experience, the data model changes, integration points, and an implementation order. When a feature ships, its user-facing behavior graduates into [behaviors](../behaviors/index.md) and the spec is updated to `status: shipped`.

---

## Documents

| Doc                                           | Status  | What it covers                                                                |
| --------------------------------------------- | ------- | ----------------------------------------------------------------------------- |
| [Trouble-Key Drills](trouble-key-drills.md)   | shipped | Per-key mistake tracking and auto-generated warm-up drills                    |
| [Keyboard Guide](keyboard-guide.md)           | shipped | On-screen keyboard highlighting the next key and the finger that presses it   |

The two specs are companions: the keyboard guide teaches *where keys are*, the drills target *which keys need work*. Both are shipped — their user-facing behavior is documented in [Keyboard Guide](../behaviors/keyboard-guide.md) and [Warm-up Drills](../behaviors/warm-up-drills.md); the specs remain the record of design decisions and open questions.

---

## Further Reading

- [Roadmap](../roadmap.md) — how these fit the larger direction
- [Behaviors Overview](../behaviors/index.md) — where shipped behavior is documented
