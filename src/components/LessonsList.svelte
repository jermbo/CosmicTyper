<script>
  import { createEventDispatcher } from "svelte";
  import { isActive, url } from "@sveltech/routify";
  export let baseURL = "web-lessons";
  export let lessons = [];

  const dispatch = createEventDispatcher();

  function slugify(name) {
    return name
      .toLowerCase()
      .split(" ")
      .join("_");
  }
  function markComplete(id) {
    dispatch("completed", id);
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
        <th class="has-background-grey-lighter">Done</th>
        <th class="has-background-grey-lighter">Lesson Name</th>
        <th class="has-background-grey-lighter">Difficulty</th>
        <th class="has-background-grey-lighter">Action</th>
      </tr>
    </thead>
    <tbody>
      {#each lessons as lesson}
        <tr class:is-selected={lesson.hasCompleted}>
          <td class="text-center" width="5%">
            <i class="fas fa-check" class:is-hidden={!lesson.hasCompleted} />
          </td>
          <td width="80%">{lesson.title}</td>
          <td width="10%" class="is-capitalized">{lesson.difficulty}</td>
          <td width="5%">
            <a
              class="button is-small is-info"
              href={$url(`/${baseURL}/${slugify(lesson.title)}`)}>
              Start Lesson
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
