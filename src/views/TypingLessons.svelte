<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../components";
  import { state, getTypingLessonsAction } from "../store";

  const { typingLessons } = state;

  onMount(async () => await getTypingLessons());

  async function getTypingLessons() {
    if (!$typingLessons.length) {
      console.log("no typing lessons yet");
      await getTypingLessonsAction();
    }
  }
</script>

<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Typing Lessons</h1>
    <p>In this section, you can work on your general typing skills.</p>
  </header>

  <LessonsList lessons={$typingLessons} />
</section>
