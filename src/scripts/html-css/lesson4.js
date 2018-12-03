const items = [
  {
    type: "dom",
    desc:
      "Anchors allow you to link to other pages in your site, or other websites all together. You can place as many anchors on the page as you would like. To tell the link to navigate to a specific location by its href attribute. You can nest tags inside eachother. You must open and close the tags in order.",
    final: '<p>Go to <a href="lukas.html">Lukas Graham</a> page</p>',
    render: true,
  },
  {
    type: "style",
    desc: "You can change the size and color of the paragraph by using the font-size and color properties.",
    final: "p{ color: #11ccdd; font-size: 25px; font-weight: bold; }",
    render: true,
  },
  {
    type: "style",
    desc: "You can select elements inside of another element like so",
    final: "p a{ color: #ff00aa; text-decoration: none; }",
    render: true,
  },
  {
    type: "dom",
    desc:
      "The class attribute can be added to any element. You can use a class to identify any element and give it special styles in css",
    final: '<h3 class="fancy">Welcome to my site!</h3>',
    render: true,
  },
  {
    type: "dom",
    desc:
      "We have multiple header tags to utilize. You can utilize this to divide your page up, as well as give it the same class of fancy to style it the same as the paragraph.",
    final: '<p class="fancy">Hope you enjoy your stay!</p>',
    render: true,
  },
  {
    type: "style",
    desc: "You can change the size and color of the paragraph by using the font-size and color properties.",
    final: ".fancy{ color: #11ccdd; font-family: cursive; }",
    render: true,
  },
  {
    type: "dom",
    desc: "Add a wrapper to contain your page.",
    final: '<div class="wrapper"></div>',
    render: true,
  },
  {
    type: "style",
    desc: "Create a STYLE tag to color text yellow. ",
    final: ".yellow{ color: yellow; }",
    render: true,
  },
  {
    type: "dom",
    desc: 'The "<span>" tag is used in addition to other tags and sometimes alone.',
    final: '<p><span class="yellow">inbetween tag</span></p>',
    render: true,
  },
];
new Typer(items);
