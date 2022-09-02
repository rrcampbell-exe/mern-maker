export const setupQuestions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your project?",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Please enter a project title.");
        return false;
      }
    },
  },
  {
    type: "confirm",
    name: "isOnlyFE",
    message: "Does your project require a front-end only?",
    validate: (isOnlyFE) => {
      if (isOnlyFE) {
        return true;
      } else {
        console.log("Just seeing what happens here.");
        return false;
      }
    },
  },
];