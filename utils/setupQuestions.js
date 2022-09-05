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
    type: "list",
    name: "projectType",
    message: "Which type of template does this project require?",
    choices: [
      'React Front-End Only',
      'React Front-End with Express Server',
      'React Front-End, Express Server, and Database'
    ]
  }
];