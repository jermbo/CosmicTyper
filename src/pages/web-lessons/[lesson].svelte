<script>
  import { onMount } from "svelte";
  import { state, updateWebLesson } from "../../store";
  import { isActive, url, goto } from "@sveltech/routify";

  import CodeGUI from "../../components/CodeGUI/CodeGUI.svelte";

  const { webLessons } = state;

  export let id = "";
  let specificLesson = null;

  function findLesson() {
    const title = id
      .split("_")
      .join(" ")
      .toLowerCase();
    specificLesson = $webLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    )[0];
  }

  onMount(() => {
    if (!$webLessons.length) {
      $goto("/web-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    console.log("mark complete", id);
    updateWebLesson(id);
    $goto("/web-lessons");
  }
</script>

<div class="container">
  <CodeGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
