<script>
  import LessonsList from "./LessonsList.svelte";
  import Lesson from "./Lesson.svelte";

  export let lessons;
  let lesson = lessons[0];

  function handelLessonSelect({ detail }) {
    const index = detail.index;
    lesson = lessons[index];
  }

  function handelBackToLessonSelect() {
    lesson = null;
  }
</script>

<style lang="scss" global>
  @import "./styles/styles.scss";
</style>

<main>
  {#if !lesson}
    <LessonsList on:lessonSelect={handelLessonSelect} {lessons} />
  {/if}

  {#if lesson}
    <Lesson on:backToLessonSelect={handelBackToLessonSelect} {lesson} />
  {/if}
</main>
