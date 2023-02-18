<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../components";
  import { state, getWebLessonsAction, updateWebLesson } from "../store";

  const { webLessons } = state;

  onMount(async () => await getWebLessons());

  async function getWebLessons() {
    if (!$webLessons.length) {
      await getWebLessonsAction();
    }
  }

  function finishLesson({ detail: id }) {
    updateWebLesson(id);
  }
</script>

<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Web Lessons</h1>
    <p>Let's learn how to type, while learning the basics of HTML and CSS.</p>
  </header>

  <LessonsList
    baseURL="web-lessons"
    lessons={$webLessons}
    on:completed={finishLesson} />
</section>
