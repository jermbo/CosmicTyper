<script>
  import { onMount } from "svelte";
  import { LessonsList } from "../../components";
  import { state, getWebLessonsAction } from "../../store";

  const { webLessons } = state;

  onMount(async () => {
    if (!$webLessons.length) {
      await getWebLessonsAction();
    }
  });
</script>

<!-- routify:options name="web-lessons" -->
<section class="container">
  <header class="has-margin-top-4 has-margin-bottom-4">
    <h1 class="is-size-3">Web Lessons</h1>
    <p>Let's learn how to type, while learning the basics of HTML and CSS.</p>
  </header>
  {#if $webLessons.length}
    <LessonsList baseURL="web-lessons" lessons={$webLessons} />
  {/if}
</section>
