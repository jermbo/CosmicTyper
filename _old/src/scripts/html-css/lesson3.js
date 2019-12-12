const items = [
  {
    type: "dom",
    desc: "There are some basic html tags that go on every page.",
    final: "<!DOCTYPE html>",
    render: false,
  },
  {
    type: "dom",
    desc: "The html tag is important as it tells the browser what to start doing.",
    final: "<html></html>",
    render: false,
  },
  {
    type: "dom",
    desc: "To link external styles, you need to connect it in the head tags of the document.",
    final: '<link rel="stylesheet" href="styles/styles.css">',
    render: true,
  },
  {
    type: "dom",
    desc: "The body tag is the last piece of boiler plate. This is what you users are actually going to see.",
    final: "<body></body>",
    render: false,
  },
  {
    type: "dom",
    desc: "HTML needs to be open and closed in the correct order. That means nested elements need to be closed first.",
    final: "<h1>Hello <small>World</small></h1>",
    render: true,
  },
  {
    type: "dom",
    desc: "Anchor tags go some where. You can tell it where to go by filling out the href attribute.",
    final: '<a href="/aang.html">Aang</a>',
    render: true,
  },
  {
    type: "style",
    desc: "Now let's all anchor tags",
    final: "a{ color: #0ff1ce; text-decoration: none; }",
    render: true,
  },
  {
    type: "dom",
    desc:
      "If you only wanted to style one element at a time you can use the style attribute and style only that one thing.",
    final: '<div style="background-color: #f0ae12;">Golden</div>',
    render: true,
  },
  {
    type: "dom",
    desc:
      "Image tags are used to show pictures. You can place as many images on a page as you want. Each time you update the src attribute.",
    final: '<img src="https://placekitten.com/g/300/300" />',
    render: true,
  },
  {
    type: "dom",
    desc:
      "Image tags are used to show pictures. You can place as many images on a page as you want. Each time you update the src attribute.",
    final: '<img src="https://placekitten.com/g/400/400" />',
    render: true,
  },
  {
    type: "style",
    desc: "Lets style all the image tags to be a specific size.",
    final: "img{ width: 250px; height: 250px; }",
    render: true,
  },
  {
    type: "dom",
    desc:
      "Anchors allow you to link to other pages in your site, or other websites all together. You can place as many anchors on the page as you would like. To tell the link to navigate to a specific location by its href attribute. You can nest tags inside eachother. You must open and close the tags in order.",
    final: '<p>Visit <a href="katara.html">Katara</a> page</p>',
    render: true,
  },
];
new Typer(items);
