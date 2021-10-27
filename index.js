// require access to file system, import inquirer package
const fs = require("fs");
const inquirer = require("inquirer");
const generateGitignore = require("./utils/generateGitignore");

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
    // create root directory
    const rootDir = `./dist/${response.title}`;
    fs.mkdirSync(rootDir);
    console.log(
      "The root directory for " + response.title + " has been generated! Creating files..."
    );
    // add .gitignore to root directory
    fs.writeFile(`./dist/${response.title}/.gitignore`, generateGitignore(), (err) => {
      console.log("A .gitignore has been added to the root directory. Onto the server...")
      if (err) throw err
  }) 
    // create server directory
    const serverDir = `./dist/${response.title}/server`;
    fs.mkdirSync(serverDir);
    console.log(
      "The server directory for " + response.title + " has been generated! Building server..."
    );
    // add .gitignore to server directory
    fs.writeFile(`./dist/${response.title}/server/.gitignore`, generateGitignore(), (err) => {
      console.log("A .gitignore has been added to the server directory. Continuing server build...")
      if (err) throw err
  }) 
  });
}

// run on node index
init();
