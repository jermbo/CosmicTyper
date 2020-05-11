<script>
  import { createEventDispatcher } from "svelte";
  import { url } from "@sveltech/routify";
  export let baseURL = "web-lessons";
  export let lessons = [];

  const dispatch = createEventDispatcher();

  function slugify(name) {
    return name
      .toLowerCase()
      .split(" ")
      .join("_");
  }
</script>

<style lang="scss">
  .lesson-table {
    max-height: 75vh;
    overflow-x: auto;
  }
  th {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>

<div class="card lesson-table">
  <table class="table is-striped is-hoverable is-fullwidth">
    <thead>
      <tr>
        <th class="has-background-grey-lighter">Lesson Name</th>
        <th class="has-background-grey-lighter">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each lessons as lesson}
        <tr class:is-selected={lesson.hasCompleted}>
          <td width="75%">{lesson.title}</td>
          <td width="25%">
            <a
              class="button is-small is-info"
              href={$url(`${baseURL}/${slugify(lesson.title)}`)}>
              View Lesson
            </a>
            <a
              class="button is-small is-info"
              href={$url(`${baseURL}/${slugify(lesson.title)}/edit`)}>
              Edit Lesson
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
