<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../../components";
  import {
    state,
    getTypingLessonsAction,
    updateTypingLesson,
  } from "../../store";

  const { typingLessons } = state;

  onMount(async () => await getTypingLessons());

  async function getTypingLessons() {
    if (!$typingLessons.length) {
      await getTypingLessonsAction();
    }
  }

  function finishLesson({ detail: id }) {
    updateTypingLesson(id);
  }
</script>

<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Typing Lessons</h1>
    <p>In this section, you can work on your general typing skills.</p>
  </header>

  <LessonsList
    baseURL="typing-lessons"
    lessons={$typingLessons}
    on:completed={finishLesson} />
</section>
