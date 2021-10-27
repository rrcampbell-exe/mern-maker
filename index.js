// require access to file system, import inquirer package
const fs = require("fs");
const inquirer = require("inquirer");

const setupQuestions = [
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
];

// fn to initialize question prompts on run of node index
function init() {
  return inquirer.prompt(setupQuestions).then((response) => {
    const dir = "./dist";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const rootDir = `./dist/${response.title}`;
    fs.mkdirSync(rootDir);
    console.log(
      "The root directory for " + response.title + " has been generated! Creating files..."
    );
  });
}

// run on node index
init();
