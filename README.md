# Cosmic Typer

This tool is designed to help teach students to type the syntax of HTML and CSS.

### Project Setup

This project has a dev process automated by Gulp. Everything is built in the `./src/` folder, and the Gulp process enables the steps necessary for the build. Gulp compiles and places everything in the `./build/` folder from which `deploy` is based.


Run `npm i` to get the dependencies required. Then run `npm run dev` and watch the magic happen.

### Typer APIs

As of right now, Typer has no public methods, everything is handled within the `Typer` module. You simply need to pass in an array of objects to a `new Typer()` instance.

### Lesson Structure

The object needs to have four required properties; `type` `desc` `final` `render`. An object is an individual task the student must complete before moving onto the next task.

```JavaScript
{
   type: "dom",
   desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
   final: "<h1>largest heading</h1>",
   render: true
}
```

#### type -string-

There are two `types` an object can be, either `dom` or `style`. _dom_ tells the `Typer` to load this under specific methods to render properly. Same goes with the _style_.

#### desc -string-

This should describe the item on screen as concisely as possible. In some cases are are dealing with small vertically screen sizes, so length of text matters.

#### final -string-

`Typer` will take the _final_ property and present it on screen for the student to type along to. Once the student gets the section right, _final_ will render itself in the results window.

#### render -bool-

There are some situations where the item being practiced does not need to be rendered on page. If you would not like the item presented on screen then set this property to false. ( The absence of this property defaults to true )

## How to use.

The number of tasks students should complete is completely up to you. Our suggestion is to keep the lesson meaning full, engaging, and on a particular topic.

To create a new lesson, create a lesson HTML and corresponding JavaScript file. Connect the newly created JavaScript file to the new lesson HTML. Be sure to load `Typer.js` before lesson JavaScript.

In the new lesson JavaScript file, build your tasks as an array of objects.

Instantiate a new instance of Typer and provide the array to the constructor.

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

Update the `index.html` file with new lesson link.

Navigate to your project folder in your terminal of choice, make sure the node_modules folder is present, and run `npm run dev`.

After the browser opens up, click the desired lesson and give it a whirl.

## Contributors

[Jeremy "Jermbo" Lawson](https://github.com/jermbo)

[Reggs](https://github.com/reggs)

## License

MIT © [Jeremy "Jermbo" Lawson](https://github.com/jermbo)
