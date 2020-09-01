<script>
  import { createEventDispatcher } from "svelte";
  import { url } from "@sveltech/routify";
  import { slugify } from "../utils";
  import { _ } from "svelte-i18n";

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
        <th>{$_(`page.common_ui.table_head.done`, { default: 'Done' })}</th>
        <th>
          {$_(`page.common_ui.table_head.lesson_name`, {
            default: 'Lesson Name',
          })}
        </th>
        <th>
          {$_(`page.common_ui.table_head.difficulty`, {
            default: 'Difficulty',
          })}
        </th>
        <th>{$_(`page.common_ui.table_head.action`, { default: 'Action' })}</th>
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
              {$_(`page.common_ui.buttons.start_lesson`, {
                default: 'Start Lesson',
              })}
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
