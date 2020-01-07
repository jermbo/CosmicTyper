export default [
  {
    categories: ["html-css", "easy"],
    title: "The First Lesson",
    hasCompleted: true,
    steps: [
      {
        type: "dom",
        desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
        action: ["<h1>hello</h1>"],
        render: true,
      },
      {
        type: "dom",
        desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
        action: ["<h2>", "  world", "</h2>"],
        render: true,
      },
      {
        type: "style",
        desc: "Now let's all paragraph tags",
        action: ["h1 {", "  font-size: 12px;", "  color: #444;", "}"],
        render: true,
      },
      {
        type: "dom",
        desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
        action: ["<span>hello world</span>"],
        render: true,
      },
    ],
  },
  {
    categories: ["html-css", "easy"],
    title: "The Second Lesson",
    hasCompleted: false,
    steps: [
      {
        type: "dom",
        desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
        action: ["<h1>largest heading</h1>"],
        render: true,
      },
    ],
  },
  {
    categories: ["html-css", "hard"],
    title: "The Third Lesson",
    hasCompleted: false,
    steps: [
      {
        type: "dom",
        desc: "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
        action: ["<h1>largest heading</h1>"],
        render: true,
      },
    ],
  },
];
