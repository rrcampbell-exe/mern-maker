// require access to file system, import inquirer package
const fs = require("fs");
const exec = require("child_process").exec;
const inquirer = require("inquirer");
const generateGitignore = require("./utils/generateGitignore");
const generateServer = require("./utils/generateServer");
const generateConnection = require("./utils/generateConnection");
const generateUser = require("./utils/generateUser");
const generateModelsIndex = require("./utils/generateModelsIndex");
const generateTypeDefs = require("./utils/generateTypeDefs");
const generateResolvers = require("./utils/generateResolvers");
const generateSchemasIndex = require("./utils/generateSchemasIndex");
const generateSeeds = require("./utils/generateSeeds");
const generateAuth = require("./utils/generateAuth");

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
    // js to format db name based on project name
    dirName = response.title.toLowerCase();
    dirName = dirName.replace(/\s+/g, "-");
    const rootDir = `./dist/${dirName}`;
    fs.mkdirSync(rootDir);
    console.log(
      "The root directory for " +
        response.title +
        " has been generated! Creating files..."
    );
    // add .gitignore to root directory
    fs.writeFile(`./dist/${dirName}/.gitignore`, generateGitignore(), (err) => {
      console.log(
        "A .gitignore has been added to the root directory. Onto the server..."
      );
      if (err) throw err;
    });
    // create server directory
    const serverDir = `./dist/${dirName}/server`;
    fs.mkdirSync(serverDir);
    console.log(
      "The server directory for " +
        response.title +
        " has been generated! Building server..."
    );
    // add .gitignore to server directory
    fs.writeFile(
      `./dist/${dirName}/server/.gitignore`,
      generateGitignore(),
      (err) => {
        console.log(
          "A .gitignore has been added to the server directory. Continuing server build..."
        );
        if (err) throw err;
      }
    );
    // create config directory
    const configDir = `./dist/${dirName}/server/config`;
    fs.mkdirSync(configDir);
    console.log(
      "A config directory has been added to the server directory. The build continues..."
    );
    // create models directory
    const modelsDir = `./dist/${dirName}/server/models`;
    fs.mkdirSync(modelsDir);
    console.log(
      "A models directory has been added to the server directory. We march on..."
    );
    // create schemas directory
    const schemasDir = `./dist/${dirName}/server/schemas`;
    fs.mkdirSync(schemasDir);
    console.log(
      "We've got a schemas directory in the server directory! The grind continues..."
    );
    // create seeders directory
    const seedersDir = `./dist/${dirName}/server/seeders`;
    fs.mkdirSync(seedersDir);
    console.log(
      "Your server's seeds now have a home in the seeders directory! Can't wait to see what you grow..."
    );
    // create utils directory
    const utilsDir = `./dist/${dirName}/server/utils`;
    fs.mkdirSync(utilsDir);
    console.log("Take this utils directory. It's dangerous to go alone...");
    // create server.js in server directory
    fs.writeFile(
      `./dist/${dirName}/server/server.js`,
      generateServer(),
      (err) => {
        console.log(
          "We've got a server! Now let's establish a connection to our database..."
        );
        if (err) throw err;
      }
    );
    // create connection.js in config directory
    fs.writeFile(
      `./dist/${dirName}/server/config/connection.js`,
      generateConnection(response),
      (err) => {
        console.log(
          "Mongoose noises! We've got ourselves a database connection. Onward..."
        );
        if (err) throw err;
      }
    );
    // create User.js in models directory
    fs.writeFile(
      `./dist/${dirName}/server/models/User.js`,
      generateUser(),
      (err) => {
        console.log("Creating a User model to make things easy for you...");
        if (err) throw err;
      }
    );
    // create index.js in models directory
    fs.writeFile(
      `./dist/${dirName}/server/models/index.js`,
      generateModelsIndex(),
      (err) => {
        console.log(
          "While we're at it, let's get that User model imported into and exported from an index.js file..."
        );
        if (err) throw err;
      }
    );
    // create typeDefs.js in schemas directory
    fs.writeFile(
      `./dist/${dirName}/server/schemas/typeDefs.js`,
      generateTypeDefs(),
      (err) => {
        console.log(
          "That User model could probably do with some typeDefs. Let's give you a head start on writing them..."
        );
        if (err) throw err;
      }
    );
    // create resolvers.js in schemas directory
    fs.writeFile(
      `./dist/${dirName}/server/schemas/resolvers.js`,
      generateResolvers(),
      (err) => {
        console.log(
          'A typeDef walks into a bar. The bartender asks, "Where are your resolvers?" Oh, they\'re right here... #AntiJoke'
        );
        if (err) throw err;
      }
    );
    // create index.js in schemas directory
    fs.writeFile(
      `./dist/${dirName}/server/schemas/index.js`,
      generateSchemasIndex(),
      (err) => {
        console.log(
          "An index.js in a schemas folder never hurt anyone—at least not that we know of..."
        );
        if (err) throw err;
      }
    );
    // create seeds.js in seeders directory
    fs.writeFile(
      `./dist/${dirName}/server/seeders/seeds.js`,
      generateSeeds(),
      (err) => {
        console.log(
          "That seeders folder is looking kind of lonely. Let's get you started with some sample user seeds..."
        );
        if (err) throw err;
      }
    );
    // create auth.js in utils directory
    fs.writeFile(
      `./dist/${dirName}/server/utils/auth.js`,
      generateAuth(),
      (err) => {
        console.log(
          '"WHAT ARE YOUR LOGIN CREDENTIALS?" <-- This is what your newly created auth.js will ask of prospective users (though hopefully without all the yelling)...'
        );
        if (err) throw err;
      }
    );
    // test exec functionality
    // setTimeout(() => {
      exec(`code dist/${dirName}/`, (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      });
    // }, 5000);
  });
}

// run on node index
init();
