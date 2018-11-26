# Cosmic Typer

This tool is designed to teach students to type the syntax of HTML and CSS.

### Project Setup

This project has a dev process automated by Gulp. Everything is built in the `./src/` folder, and the Gulp process enables the steps necessary for the build. Gulp compiles and places everything in the `./build/` folder from which `deploy` is based.

Run `npm i` to get the dependencies required. Then, run `npm run dev` and watch the magic happen.

### Typer APIs

As of right now, `Typer` has no public methods. Everything is handled within the `Typer` module. You simply need to pass in an array of objects to a `new Typer()` instance.

### Lesson Structure

The object requires four properties: `type`, `desc`, `final`, and `render`. An object is an individual task the student must complete before moving onto the next task.

```JavaScript
{
   type: "dom",
   desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
   final: "<h1>largest heading</h1>",
   render: true
}
```

#### type -string-

There are two `types` an object can be: `dom` or `style`. The _dom_ tells `Typer` to load this task under specific methods to render properly. The same goes with _style_.

#### desc -string-

This should describe the item on screen as concisely as possible. In some cases, when dealing with small, vertical screen sizes, the length of text matters.

#### final -string-

`Typer` will take the _final_ property and present it on the screen for the student to type along. Once the student gets the section correct, _final_ will render itself in the results window.

#### render -bool-

There are some situations where the item being practiced does not need to be rendered on the page. If you would not like the item presented on the screen, then set this property to "false". ( The absence of this property defaults to "true" )

## How to Use

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

Navigate to the project folder in your terminal of choice, make sure the `node_modules` folder is present, and run `npm run dev`.

After the browser opens, click the desired lesson and give it a whirl.

## Contributors

[Jeremy "Jermbo" Lawson](https://github.com/jermbo)

[Reggs](https://github.com/reggs)

[Chelsea Pontbriand](https://github.com/ChelseaPontbriand)

## License

MIT © [Jeremy "Jermbo" Lawson](https://github.com/jermbo)
