# Typer APIs

As of right now, `Typer` has no public methods. Everything is handled within the `Typer` module. You simply need to pass in an array of objects to a `new Typer()` instance.

## Lesson Structure

The object requires four properties: `type`, `desc`, `final`, and `render`. An object is an individual task the student must complete before moving onto the next task.

```JavaScript
{
   type: "dom",
   desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
   final: "<h1>largest heading</h1>",
   render: true
}
```

### type -string-

There are two `types` an object can be: `dom` or `style`. The _dom_ tells `Typer` to load this task under specific methods to render properly. The same goes with _style_.

### desc -string-

This should describe the item on screen as concisely as possible. In some cases, when dealing with small, vertical screen sizes, the length of text matters.

### final -string-

`Typer` will take the _final_ property and present it on the screen for the student to type along. Once the student gets the section correct, _final_ will render itself in the results window.

### render -bool-

There are some situations where the item being practiced does not need to be rendered on the page. If you would not like the item presented on the screen, then set this property to "false". ( The absence of this property defaults to "true" )
