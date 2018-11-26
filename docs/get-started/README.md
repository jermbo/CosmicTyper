# Introduction

Get to know the most important part of coding. The keyboard! Cosmic Typer is a tool designed to teach students to type, with a special focus on programming languages. Younger students have grown up on keyboardless devices, or extremely modified screen keyboards, and typing is a skill that needs to be learned. When learning to programming being efficient at typing is crucial, especially with the special characters required by any language. This tool aims to get the students comfortable typing and teach them some basics of web development with curated lessons that actively provides feedback as they type.

## How It Works

When a student chooses a lesson, they will be presented with a snippet of a programming language along with a description of what they are seeing. They will need to type the snippet exactly as it is seen on screen. For every correct key stroke, the character will highlight green and the student can move onto the next character. For every incorrect key stroke, the snippet area will briefly flash red to indicate to the student that the incorrect character has been selected. Once the student has completed the snippet, the resulting visual will be displayed in the bottom of the screen.

This tool is meant to be a warm-up. Something to start before the lesson begins. Even if the student has completed all the available lessons before, it is still good practice to do them again. The idea is to build muscle memory and be generally more familiar with the keyboard, where things are and how to access the special characters.

## Project Setup

This project has a dev process automated by Gulp. Everything is built in the `./src/` folder, and the Gulp process enables the steps necessary for the build. Gulp compiles and places everything in the `./build/` folder from which `deploy` is based.

Run `npm i` to get the dependencies required. Then, run `npm run dev` and watch the magic happen.
