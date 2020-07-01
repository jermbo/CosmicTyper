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
<div class="page">
  <div class="page-header">
    <div class="page-header__info">
      <h1 class="page__title">Web Lessons</h1>
      <p class="page__subtitle">
        Let's learn how to type, while learning the basics of HTML and CSS.
      </p>
    </div>
  </div>

  <div class="page-body">
    {#if $webLessons.length}
      <LessonsList baseURL="web-lessons" lessons={$webLessons} />
    {/if}
  </div>
</div>
