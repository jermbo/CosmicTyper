const items = [
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Quick refresher of the H1 tag.",
    final: "<h1>Avatar: The Last Airbender</h1>",
    render: true
  },
  {
    type: "style",
    dificulty: 2,
    time: 45,
    desc: "Now let's style the h1",
    final: "h1{ color: #225668; font-size: 30px; }",
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Add a wrapper to contain your page.",
    final: '<div class="wrapper"></div>',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Add a link to the stylesheet.",
    final: '<link rel="stylesheet" href="styles/styles.css">',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Styles go between the STYLE tags.",
    final: "<style></style>",
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Create a DIV and give it a CLASS and ID.",
    final: '<div id="aang" class="character">Content Box</div>',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc: "Create a link to the character page.",
    final: '<a href="" class="character__name">Ihro</a>',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "Paragraphs are used to block out text used to provide information to your users.",
    final: "<p>I have something to share with you.</p>",
    render: true
  },
  {
    type: "style",
    dificulty: 2,
    time: 45,
    desc: "Now let's all paragraph tags",
    final: "p{ font-size: 12px; color: #3fcc6e; }",
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "You want this paragraph to stand out, give it a class so we can style it with css.",
    final: '<p id="different">I am different than the rest.</p>',
    render: true
  },
  {
    type: "style",
    dificulty: 2,
    time: 45,
    desc: "We style classes by adding a period and the name desired.",
    final: "#different{ color: #c41bb0; font-size: 20px; }",
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "Image tags are used to show pictures. You can place as many images on a page as you want. Each time you update the src attribute.",
    final: '<img src="https://placekitten.com/g/200/300" />',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "Anchors allow you to link to other pages in your site, or other websites all together. You can place as many anchors on the page as you would like. To tell the link to navigate to a specific location by its href attribute. You can nest tags inside eachother. You must open and close the tags in order.",
    final: '<p>Go to the <a href="http://html.com">HTML</a> site</p>',
    render: true
  },
  {
    type: "style",
    dificulty: 2,
    time: 45,
    desc: "Now let's all anchor tags",
    final: "a{ color: #b2972a; text-decoration: none; }",
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "The class attribute can be added to any element. You can use a class to identify any element and give it special styles in css",
    final: '<p class="fancy">What a fancy text</p>',
    render: true
  },
  {
    type: "dom",
    dificulty: 2,
    time: 45,
    desc:
      "We have multiple header tags to utilize. You can utilize this to divide your page up, as well as give it the same class of fancy to style it the same as the paragraph.",
    final: '<h2 class="fancy">Fancy Title</h2>',
    render: true
  },
  {
    type: "style",
    dificulty: 2,
    time: 45,
    desc: "All we need to do now is style the fancy class",
    final: ".fancy{ font-family: cursive; }",
    render: true
  }
];
const typer = new Typer();
typer.init(items);
