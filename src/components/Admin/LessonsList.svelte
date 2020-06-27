<script>
  import { url } from "@sveltech/routify";
  import { slugify } from "../../utils";
  export let baseURL = "web-lessons";
  export let lessons = [];
</script>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th>Lesson Name</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each lessons as lesson}
        <tr>
          <td width="90%">{lesson.title}</td>
          <td width="10%">
            <a
              class="button"
              title={`View: ${lesson.title}`}
              href={$url(`${baseURL}/${slugify(lesson.title)}`)}>
              <span class="icon">
                <i class="fas fa-eye" />
              </span>
            </a>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
