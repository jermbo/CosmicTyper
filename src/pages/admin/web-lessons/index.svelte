<script>
  import LessonsList from "../../../components/LessonsList.svelte";
  // let webData = [];
  let display = false;

  const getData = (async () => {
    const resp = await fetch("http://localhost:1337/web-lessons");
    return await resp.json();
  })();
</script>

<style>
  pre {
    height: 50vh;
    overflow-y: auto;
  }
</style>

<!-- routify:options name="admin-web-lessons" -->
<div class="container">
  <p>Web Lessons Admin</p>
  <!-- <pre>{JSON.stringify(webData, null, 2)}</pre>
  {#await getData}
    <p>Getting data</p>
  {:then lessons}
    <pre>{JSON.stringify(lessons, null, 2)}</pre>
    <!--  -->
  <!-- {:catch error}
    <p>something went wrong {error}</p>
  {/await} -->

  {#await getData}
    <p>...waiting</p>
  {:then lessons}
    <pre>{JSON.stringify(lessons, null, 2)}</pre>
    <!-- <LessonsList baseURL="admin/web-lessons" {lessons} /> -->
  {:catch error}
    <p>An error occurred!</p>
  {/await}
</div>
