<script>
  import { onMount } from "svelte";
  import { state } from "../store";
  import { navigate } from "svelte-routing";
  import { updateWebLesson } from "../store";

  import CodeGUI from "./CodeGUI/CodeGUI.svelte";

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
      navigate("/web-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    console.log("mark complete", id);
    updateWebLesson(id);
    navigate("/web-lessons");
  }
</script>

<div class="container">
  <CodeGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
