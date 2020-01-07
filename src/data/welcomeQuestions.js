export default [
  {
    question: "What would you like to practice today?",
    possible_answers: [
      {
        label: "HTML & CSS",
        action: {
          key: "lesson_type",
          type: "html-css",
        },
      },
    ],
  },
  {
    question: "Would you like a challenge or take it easy today?",
    possible_answers: [
      {
        label: "Take it easy",
        action: {
          key: "difficulty",
          type: "easy",
        },
      },
      {
        label: "Challenge Me",
        action: {
          key: "difficulty",
          type: "hard",
        },
      },
    ],
  },
];
