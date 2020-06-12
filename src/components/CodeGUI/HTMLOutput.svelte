<script>
  // Stores
  import { HTML_CODE, CSS_CODE } from "../../store/code-data.js";

  // HACK - but necessary to avoid formatting issues in VSCode
  const styleWord = "style";
  let cssCode;
  CSS_CODE.subscribe((code) => {
    cssCode = `<${styleWord}> ${code.join("")} </${styleWord}>`;
  });
</script>

<div class="render">
  {@html cssCode}
  {@html $HTML_CODE.join('')}
</div>
