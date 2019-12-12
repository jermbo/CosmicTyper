<script>
  import { HTML_CODE, CSS_CODE } from "./stores/CodeState.js";

  let cssCode;
  CSS_CODE.subscribe(code => {
    // -disable-next-line
    cssCode = `<style>${code.join("")}</style>`;
  });

  let htmlCode;
  HTML_CODE.subscribe(code => (htmlCode = code.join("")));
</script>

<style html="cssCode" class="localStyle">

</style>

<div class="render">
  {@html cssCode}
  {@html htmlCode}
</div>
