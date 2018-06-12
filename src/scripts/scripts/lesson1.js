const items = [
  {
    type: "dom",
    desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
    final: "<h1>largest heading</h1>",
    render: true
  },
  {
    type: "dom",
    desc: 'The H2 tag is the second most important tag. This is usually the most commonly used heading tag. Remember to always close your tags with a forward slash "/" ',
    final: "<h2>large heading</h2>",
    render: true
  },
  {
    type: "style",
    desc: "Here we will add a STYLE to style our text in the next test. This will turn the text green. ",
    final: ".green{ color: green; }",
    render: true
  },
  {
    type: "dom",
    desc: "Now we will make an H3 tag with a CLASS. This acts as a SELECTOR for styles. ",
    final: '<h3 class="green">green heading</h3>',
    render: true
  },
  {
    type: "dom",
    desc: "Add a wrapper to contain your page.",
    final: '<div class="wrapper"></div>',
    render: true
  },
  {
    type: "dom",
    desc: "Styles go between the STYLE tags.",
    final: "<style></style>",
    render: true
  },
  {
    type: "dom",
    desc: 'The "p" tag is what we use for body text. This text is smaller and fills out most of content on the site.',
    final: '<p class="body">body text</p>',
    render: true
  },
  {
    type: "style",
    desc: "Create a STYLE tag to color text yellow. ",
    final: ".yellow{ color: yellow; }",
    render: true
  },
  {
    type: "dom",
    desc: 'The "<span>" tag is used in addition to other tags and sometimes alone.',
    final: '<span class="yellow">inbetween tag</span>',
    render: true
  },
  {
    type: "dom",
    desc: 'The "href" or "Link Tag" is what we link everything together with on the web. This is not the only way to link things but the most common.',
    final: '<a href="http://google.com">Link Tag</a>',
    render: true
  },
  {
    type: "dom",
    desc: 'Tags can be "Nested" within each other to do things like LINK BODY TEXT.',
    final: '<p>Nested <a href="#">elements</a></p>',
    render: true
  },
  {
    type: "dom",
    desc: 'This is the "img" or IMAGE tag. We place the images here by setting the path inside the "src" or SOURCE attribute.',
    final: '<img src="http://placekitten.com/400/200" />',
    render: true
  }
];

new Typer(items);
