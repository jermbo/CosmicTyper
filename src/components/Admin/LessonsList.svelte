<script>
  import { url } from "@sveltech/routify";
  import { slugify } from "../../utils";
  export let baseURL = "web-lessons";
  export let lessons = [];
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
          <td width="10%">
            <a
              class="control button is-small"
              title={`View: ${lesson.title}`}
              href={$url(`${baseURL}/${slugify(lesson.title)}`)}>
              <span class="icon has-text-info">
                <i class="fas fa-eye" />
              </span>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
