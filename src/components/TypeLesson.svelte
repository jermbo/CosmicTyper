<script>
  import { onMount } from "svelte";
  import { state } from "../store";

  const { typingLessons } = state;

  export let id = "";
  let specificLesson = null;

  function findLesson() {
    const title = id
      .split("_")
      .join(" ")
      .toLowerCase();
    specificLesson = $typingLessons.filter(
      (lesson) => lesson.title.toLowerCase() == title,
    );
  }

  onMount(() => findLesson());
</script>

<div class="container">
  <h1>Typing Lesson ID: {id}</h1>
  <pre>{JSON.stringify(specificLesson, null, 2)}</pre>
</div>
