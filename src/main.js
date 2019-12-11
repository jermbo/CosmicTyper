import App from "./App.svelte";

import lessons from "./lessons/lessons";

const app = new App({
  target: document.body,
  props: {
    lessons: lessons.lessons
  }
});

export default app;
