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

<div class="table-container">
  <table class="table is-striped is-fullwidth is-hoverable">
    <thead>
      <tr>
        <th class="has-background-grey-lighter">Lesson Name</th>
        <th class="has-background-grey-lighter">Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each lessons as lesson}
        <tr>
          <td width="90%">{lesson.title}</td>
          <td width="10%" class="field has-addons">
            <a
              class="control button is-small"
              title={`View: ${lesson.title}`}
              href={$url(`${baseURL}/${slugify(lesson.title)}`)}>
              <span class="icon has-text-info">
                <i class="fas fa-eye" />
              </span>
            </a>
            <a
              class="control button is-small"
              title={`Edit: ${lesson.title}`}
              href={$url(`${baseURL}/${slugify(lesson.title)}/edit`)}>
              <span class="icon has-text-danger">
                <i class="fas fa-edit" />
              </span>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
