# How to Use

The number of tasks students should complete is entirely up to you. We suggest to keep the lesson full and engaging, while sticking to a particular topic.

To begin a new lesson, create a lesson HTML file and a corresponding JavaScript file. Connect the newly created JavaScript file to the new lesson HTML. Be sure to load `Typer.js` before lesson JavaScript.

In the new lesson JavaScript file, build your tasks as an array of objects.

Instantiate a new instance of `Typer` and provide an array to the constructor.

```JavaScript
const items = [
    {
    type: "dom",
    desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
    final: "<h1>largest heading</h1>",
    render: true
  },
  {
    type: "dom",
    desc: "The H2 tag is the second most important tag. This is usually the most commonly used heading tag. Remember to always close your tags with a forward slash '/' ",
    final: "<h2>large heading</h2>",
    render: true
  },
  ...
];

new Typer( items );
```

Update the `index.html` file with the new lesson link.

Navigate to the project folder in your terminal of choice, make sure the `node_modules` folder is present, if not `npm i` to install dependencies, and run `npm run dev`.

After the browser opens, click the desired lesson and give it a whirl.
