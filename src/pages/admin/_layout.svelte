<script>
  import { goto } from "@sveltech/routify";
  // import { authorize } from "my-auth-service";
  function authorize() {
    return new Promise((resolve, reject) => {
      if (Math.random() > 0.3) {
        resolve("You are logged in");
      } else {
        reject("Need to test reject");
      }
    });
  }
</script>

{#await authorize()}
  Checking permissions...
{:then}
  <slot />
{:catch}
  {$goto('/')}
{/await}
