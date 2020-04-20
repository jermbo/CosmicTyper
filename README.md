# Cosmic Typer

This tool is designed to introduce students to better typing abilities as we as the basics of web development.

## Project Setup

This project is built with the [Svelte](https://svelte.dev) framework. Svelte provides the ability to utilize components, stores, and reactive development.

To get the project up and running, install the dependencies by running `npm i`. Once that is completed, run the command `npm run dev`, and navigate to `http://localhost:7777` in your browser of choice.

## Web Lessons

The Web Lessons is a place to practice typing HTML and CSS. The use will be presented a list of lessons that are pulled from an API and are stored locally on the users machine. The reason for this is to reduce the number of API calls, as well as keep track of which lessons the user has completed.

*Note: This is a temporary solution until a proper backend and database is finalized.*

### Web Lesson Structure

Each lesson will be as follows:

```JavaScript
// Lesson Template
{
  title: String,
  difficulty: String, // easy | medium | hard
  hasCompleted: Boolean, // defaults to false
  steps: Step[],
}

// Step Template
{
  type: String, // dom | style
  desc: String,
  render: Boolean, // defaults to true. ( might be deprecated in the future. )
  action: String[],
}
```

## Typing Lessons

The Typing Lessons is a place to practice general typing. The use will be presented a list of lessons that are pulled from an API and are stored locally on the users machine. The reason for this is to reduce the number of API calls, as well as keep track of which lessons the user has completed.

### Typing Lesson Structure

Each lesson will be as follows:

```JavaScript
// Lesson Template
{
  title: String,
  difficulty: String, // easy | medium | hard
  hasCompleted: Boolean, // defaults to false
  steps: String[],
}
```

## License

MIT &copy; Jeremy "Jermbo" Lawson
