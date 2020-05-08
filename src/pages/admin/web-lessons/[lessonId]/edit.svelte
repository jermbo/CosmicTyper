<script>
  import { context } from "@sveltech/routify";
  console.log($context); /** /blog/:postId/view **/
  import { params } from "@sveltech/routify";
  console.log($params); /** {userId: 123, postId: 456} **/
</script>
