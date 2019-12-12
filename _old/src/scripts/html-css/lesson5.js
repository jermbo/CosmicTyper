const items = [
  {
    type: "dom",
    desc:
      "We're going to learn how to move elements around on the page a bit. First we need a container and a few elements inside of that container.",
    final: '<div class="item-container"><div class="item1"></div><div class="item2"></div></div>',
    render: true,
  },
  {
    type: "style",
    desc: "Now let's style the item-container so it's visible on the page.",
    final: ".item-container{ width: 500px; height: 500px; border: 1px solid black; }",
    render: true,
  },
  {
    type: "style",
    desc: "Let's give our items some size and color! Start with item1.",
    final: ".item1{ background-color: red; width: 100px; height: 100px; }",
    render: true,
  },
  {
    type: "style",
    desc: "Great! Now style item2.",
    final: ".item2{ background-color: blue; width: 100px; height: 100px; }",
    render: true,
  },
  {
    type: "style",
    desc:
      "Flexbox is used to position items inside of a container (.item-container in this case). We have to enable flex on the container. Watch closely to see how each new line of CSS manipulates our items.",
    final: ".item-container{ display: flex; }",
    render: true,
  },
  {
    type: "style",
    desc:
      "They moved! Why? Flexbox puts our items on an X and Y axis. This is more than a little confusing at first. Think of 'justify' as left to right or horizontal. And think of 'align' as up to down or vertical. Use justify to move the items to the center of the container.",
    final: ".item-container{ justify-content: center; }",
    render: true,
  },
  {
    type: "style",
    desc:
      "It... Kind of worked. So why aren't they completely in the center? Don't worry! We'll get there. Now that we've centered the items horizontally let's do vertical.",
    final: ".item-container{ align-items: center; }",
    render: true,
  },
  {
    type: "style",
    desc:
      "Finally! We have them in the center. Flexbox can be very complex but learning a little of it can be enough to make a huge difference. Let's wrap this up with 2 more lines of CSS. These will overwrite some of our last code. Just to give you an idea of how powerful Flexbox can be.",
    final: ".item-container{ justify-content: space-evenly; }",
    render: true,
  },
  {
    type: "style",
    desc:
      "Just as 'space-evenly' sounds, it spaces the items... Evenly! Finish it up by making the items go as far apart as they can.",
    final: ".item-container{ justify-content: space-between; }",
    render: true,
  },
];
new Typer(items);
