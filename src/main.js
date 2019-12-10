import App from "./App.svelte";

import lesson from "./lessons/html-01";

const app = new App({
  target: document.body,
  props: {
    lessons: lesson
  }
});

export default app;
