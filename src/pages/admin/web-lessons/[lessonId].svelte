<script>
  import { onMount } from "svelte";
  import { state } from "../../../store";
  import { url, goto, params } from "@sveltech/routify";

  const { webLessons } = state;
  const { lessonId } = $params;

  let lessonData = null;

  function findLesson() {
    const title = lessonId
      .split("_")
      .join(" ")
      .toLowerCase();
    lessonData = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$webLessons.length) {
      $goto("/admin/web-lessons");
    }
    findLesson();
  });
</script>

<!-- routify:options name="admin-web-lesson-single" -->
{#if lessonData}
  <div class="container">
    <header>
      <a class="button is-small is-info" href={$url('admin-web-lessons')}>
        Back
      </a>
      <div class="level">
        <h1 class="is-size-3">{lessonData.title}</h1>
        <a
          class="button is-small is-danger is-outlined"
          href={$url(`${lessonId}/edit`)}>
          <span class="icon">
            <i class="fas fa-edit" />
          </span>
          <span>Edit</span>
        </a>
      </div>
    </header>
  </div>
{/if}
