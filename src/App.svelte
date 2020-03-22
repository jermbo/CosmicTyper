<script>
  import "./scss/styles.scss";
  import { Router, Link, Route } from "svelte-routing";
  import Welcome from "./views/Welcome.svelte";
  import WebLessons from "./views/WebLessons.svelte";
  import TypingLessons from "./views/TypingLessons.svelte";
  import PageNotFound from "./views/PageNotFound.svelte";

  import { Nav, Redirect, WebLesson, TypeLesson } from "./components";

  export let url = "";
</script>

<Router {url}>
  <Nav />
  <Route path="/">
    <Redirect path="/welcome" />
  </Route>
  <Route path="/welcome" component={Welcome} />
  <Route path="/web-lessons" component={WebLessons} />
  <Route path="/web-lessons/:id" let:params>
    <WebLesson id={params.id} />
  </Route>
  <Route path="/typing-lessons" component={TypingLessons} />
  <Route path="/typing-lessons/:id" let:params>
    <TypeLesson id={params.id} />
  </Route>
  <Route path="**" component={PageNotFound} />
</Router>
