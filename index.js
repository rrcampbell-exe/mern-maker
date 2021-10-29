// require access to file system, import inquirer package, exec from child_process
const fs = require("fs");
const fsPromises = require("fs").promises;
const exec = require("child_process").exec;
const inquirer = require("inquirer");

// import functions from utils
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
const generateEnv = require("./utils/generateEnv");
const generateJSON = require("./utils/generateJSON");

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

function relay() {
  // create .env in client directory to foil Mac-related errors on launch of React
  fs.writeFile(`./dist/${dirName}/client/.env`, generateEnv(), (err) => {
    console.log(
      "Mac users will be grateful for the inclusion of this .env in the client directory, we promise..."
    );
    if (err) throw err;

  async function updateRootJSON(filePath) {
    try {
      const data = await fsPromises.readFile(filePath);
      rootJSON = data.toString();
      rootJSON = rootJSON.replace(`"scripts": {`, `"scripts": {
    "start": "node server/server.js",
    "develop": "concurrently \\"cd server && npm run watch\\" \\"cd client && npm start\\"",
    "install": "cd server && npm i && cd ../client && npm i",
    "seed": "cd server && npm run seed",
    "build": "cd client && npm run build",`)
        
    // write a package.json with rootJSON, overwriting previous package
    fs.writeFile(
      `./dist/${dirName}/package.json`,
      generateJSON(rootJSON),
      (err) => {
        console.log(
          "We've taken the liberty of updating your root directory's package.json. You'll thank us later. Onto the next one!"
        );
        if (err) throw err;
      }
    );

    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

  async function updateServerJSON(filePath) {
    try {
      const data = await fsPromises.readFile(filePath);
      serverJSON = data.toString();
      serverJSON = serverJSON.replace(`"scripts": {`, `"scripts": {
    "watch": "nodemon",
    "seed": "node seeders/seeds.js",`)
        
    // write a package.json with serverJSON, overwriting previous package
    fs.writeFile(
      `./dist/${dirName}/server/package.json`,
      generateJSON(serverJSON),
      (err) => {
        console.log(
          "Hooray! Your server's package.json has also been updated. What a time to be alive."
        );
        if (err) throw err;
      }
    );

    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

  // run files to update package.json in respective directories
  updateRootJSON(`./dist/${dirName}/package.json`)
  updateServerJSON(`./dist/${dirName}/server/package.json`)

  setTimeout(() => {console.log(`The end! Your full stack MERN project template can be found in ./dist/${dirName}/. Copy this directory to your preferred location on your local device and, from its root directory, use shell command npm run develop to test it out!`)}, 1000)

  });
}

// fn to initialize question prompts, create project on run of node index
function init() {
  return inquirer.prompt(setupQuestions).then((response) => {
    const dir = "./dist";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    const formatBool = /[^A-Za-z0-9\-_\s]/.test(response.title)

    if (formatBool) {
      return (console.log("Project name can only feature alphanumerics, hyphens, underscores, or spaces. Please try again."))
    }

    // js to format db name based on project name
    dirName = response.title.toLowerCase();
    dirName = dirName.replace(/\s+/g, "-");

    // create root directory
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
    // navigate to project directory
    exec(
      `cd dist/${dirName} && npm init -y && npm i concurrently -D && npx create-react-app client && cd server && npm init -y && npm i apollo-server-express bcrypt express faker graphql jsonwebtoken mongoose && npm i nodemon -D`,
      (error, stdout, stderr) => {
        relay()
        if (error) {
          console.log(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  });
}

// run on node index
init();
