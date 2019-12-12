export default {
  lessons: [
    {
      categories: ["html", "css", "beginner"],
      title: "The First Lesson",
      steps: [
        {
          type: "style",
          desc: "Now let's all paragraph tags",
          code: ["h1 {", "  font-size: 12px;", "  color: #3fcc6e;", "}"],
          render: true
        },
        {
          type: "dom",
          desc:
            "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
          code: ["<h1>", "  hello", "</h1>"],
          render: true
        },
        {
          type: "dom",
          desc:
            "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
          code: ["<h1>hello</h1>"],
          render: true
        },
        {
          type: "dom",
          desc:
            "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
          code: ["<span>hello world</span>"],
          render: true
        }
      ]
    },
    {
      categories: ["html", "css", "beginner"],
      title: "The Second Lesson",
      steps: [
        {
          type: "dom",
          desc:
            "This is the H1 heading tag. Our most important tag. Type out the tag and the words in between.",
          code: ["<h1>largest heading</h1>"],
          render: true
        }
      ]
    }
  ]
};
