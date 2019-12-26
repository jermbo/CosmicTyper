export default [
  {
    question: "What would you like to practice today?",
    possibleAnswers: [
      {
        label: "HTML & CSS",
        action: {
          key: "lesson",
          type: "html-css"
        }
      },
      {
        label: "General Typing",
        action: {
          key: "lesson",
          type: "typing"
        }
      }
    ]
  },
  {
    question: "Would you like a challenge or take it easy today?",
    possibleAnswers: [
      {
        label: "Take it easy",
        action: {
          key: "level",
          type: "easy"
        }
      },
      {
        label: "Challenge Me",
        action: {
          key: "level",
          type: "hard"
        }
      }
    ]
  }
];
