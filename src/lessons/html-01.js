export default [
  {
    type: "dom",
    desc:
      'This is the "img" or IMAGE tag. We place the images here by setting the path inside the "src" or SOURCE attribute. This is the "img" or IMAGE tag. We place the images here by setting the path inside the "src" or SOURCE attribute. This is the "img" or IMAGE tag. We place the images here by setting the path inside the "src" or SOURCE attribute.',
    code: [`<div>`, `  <img src="http://placekitten.com/400/200" />`, `</div>`],
    render: true
  },
  {
    type: "dom",
    desc:
      "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
    code: ["<h1>largest heading</h1>"],
    render: true
  },
  {
    type: "dom",
    desc:
      "The H2 tag is the second most important tag. This is usually the most commonly used heading tag. Remember to always close your tags with a forward slash '/' ",
    code: ["<h2>large heading</h2>"],
    render: true
  },
  {
    type: "style",
    desc:
      "Here we will add a STYLE to style our text in the next test. This will turn the text green. ",
    code: [".green {", "  color: green;", "}"],
    render: true
  },
  {
    type: "dom",
    desc:
      "Now we will make an H3 tag with a CLASS. This acts as a SELECTOR for styles. ",
    code: ['<h3 class="green">green heading</h3>'],
    render: true
  },

  {
    type: "style",
    desc: "Create a STYLE tag to color text yellow. ",
    code: [".yellow{ color: yellow; }"],
    render: true
  },
  {
    type: "dom",
    desc:
      'The "p" tag is what we use for body text. This text is smaller and fills out most of content on the site.',
    code: ["<p>", "  <span>body</span>", "  text", "</p>"],
    render: true
  },
  {
    type: "dom",
    desc:
      'Tags can be "Nested" within each other to do things like LINK BODY TEXT.',
    code: ['<p>Nested <a href="#">elements</a></p>'],
    render: true
  }
];
