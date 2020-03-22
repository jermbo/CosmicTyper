<script>
  import { onMount } from "svelte";
  import { state } from "../store";
  import { navigate } from "svelte-routing";

  import TypingGUI from "./TypingGUI/TypingGUI.svelte";

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
    )[0];
  }

  onMount(() => {
    if (!$typingLessons.length) {
      navigate("/typing-lessons");
    }
    findLesson();
  });
</script>

<div class="container">
  <TypingGUI lesson={specificLesson} />
</div>
