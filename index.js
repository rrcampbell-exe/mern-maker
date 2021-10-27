// require access to file system, import inquirer package
const fs = require("fs");
const inquirer = require("inquirer");
const generateGitignore = require("./utils/generateGitignore");
const generateServer = require("./utils/generateServer");
const generateConnection = require("./utils/generateConnection");

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

// fn to initialize question prompts, create project on run of node index
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
    // create config directory
    const configDir = `./dist/${response.title}/server/config`;
    fs.mkdirSync(configDir);
    console.log(
      "A config directory has been added to the server directory. The build continues..."
    ); 
    // create models directory
    const modelsDir = `./dist/${response.title}/server/models`;
    fs.mkdirSync(modelsDir);
    console.log(
      "A models directory has been added to the server directory. The build marches on..."
    ); 
    // create schemas directory
    const schemasDir = `./dist/${response.title}/server/schemas`;
    fs.mkdirSync(schemasDir);
    console.log(
      "We've got a schemas directory in the server directory! The grind continues..."
    ); 
    // create seeders directory
    const seedersDir = `./dist/${response.title}/server/seeders`;
    fs.mkdirSync(seedersDir);
    console.log(
      "Your server's seeds now have a home in the seeders directory! Can't wait to see what you grow..."
    ); 
    // create util directory
    const utilDir = `./dist/${response.title}/server/util`;
    fs.mkdirSync(utilDir);
    console.log(
      "Take this util directory. It's dangerous to go alone..."
    );
    // create server.js in server directory
    fs.writeFile(`./dist/${response.title}/server/server.js`, generateServer(), (err) => {
      console.log("We've got a server! Now let's establish a connection to our database...")
      if (err) throw err
  }) 
    // create connection.js in config directory
    fs.writeFile(`./dist/${response.title}/server/config/connection.js`, generateConnection(response), (err) => {
      console.log("Mongoose noises! We've got ourselves a database connection. Onward...")
      if (err) throw err
  }) 
  });
}

// run on node index
init();
