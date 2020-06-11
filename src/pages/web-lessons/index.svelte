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
<div class="container">
  <section class="page-container">
    <header class="page">
      <h1 class="page__title">Web Lessons</h1>
      <p class="page__desc">
        Let's learn how to type, while learning the basics of HTML and CSS.
      </p>
    </header>
    {#if $webLessons.length}
      <LessonsList baseURL="web-lessons" lessons={$webLessons} />
    {/if}
  </section>
</div>
