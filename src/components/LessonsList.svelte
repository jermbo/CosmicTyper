<script>
  import { createEventDispatcher } from "svelte";
  import { url } from "@sveltech/routify";
  import { slugify } from "../utils";
  export let baseURL = "web-lessons";
  export let lessons = [];

  const dispatch = createEventDispatcher();

  function markComplete(id) {
    dispatch("completed", id);
  }
</script>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Done</th>
        <th>Lesson Name</th>
        <th>Difficulty</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {#each lessons as lesson}
        <tr class:has-completed={lesson.hasCompleted}>
          <td>
            <i class="fas fa-check complete-icon" />
          </td>
          <td width="70%">{lesson.title}</td>
          <td class="capitalize">{lesson.difficulty}</td>
          <td>
            <a
              class="button is-small"
              href={$url(`/${baseURL}/${slugify(lesson.title)}`)}>
              Start Lesson
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
