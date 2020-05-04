<script>
  import { onMount } from "svelte";
  import { state, updateTypingLesson } from "../../store";
  // import { navigate } from "svelte-routing";
  import { isActive, url, goto } from "@sveltech/routify";

  import TypingGUI from "../../components/TypingGUI/TypingGUI.svelte";

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
      $goto("/typing-lessons");
    }
    findLesson();
  });

  function markComplete({ detail: id }) {
    console.log("mark typing complete", id);
    updateTypingLesson(id);
    $goto("/typing-lessons");
  }
  console.log("in TypeLesson");
</script>

<div class="container">
  <TypingGUI lesson={specificLesson} on:sectionFinished={markComplete} />
</div>
