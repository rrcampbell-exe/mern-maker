import fs, { promises } from "fs";

import { generateEnv, generateJSON } from "./generators.js";

export const writePkgJsonScripts = (dirName, isOnlyFE, isFEandServer) => {
  // establish file path for env
  let envFilePath;
  isOnlyFE
    ? (envFilePath = `./dist/${dirName}/.env`)
    : (envFilePath = `./dist/${dirName}/client/.env`);

  // create .env in client directory to foil Mac-related errors on launch of React
  fs.writeFile(envFilePath, generateEnv(), (err) => {
    console.log(
      "👴 Mac users on older versions of MacOS will be grateful for the inclusion of this .env in the client directory, we promise..."
    );
    if (err) throw err;

    // if front-end-only project, exit file creation and inform user project is ready to use
    if (isOnlyFE) {
      setTimeout(() => {
        console.log(`

🎉 The end! Your front-end project template can be found in ./dist/${dirName}/. 🥳
  
🤩 Copy this directory to your preferred location on your local device and, from its root directory, use shell command npm run start to test it out! 👀

`);
      }, 1000);
      return;
    }
  });
  if (isOnlyFE) return
  async function updateRootJSON(filePath, isFEandServer) {
    try {
      const data = await promises.readFile(filePath);
      let rootJSON = data.toString();
      if (isFEandServer) {
        rootJSON = rootJSON.replace(
          `"scripts": {`,
          `"scripts": {
    "start": "node server/server.js",
    "develop": "concurrently \\"npm run start\\" \\"cd client && npm start\\"",
    "install": "cd server && npm i && cd ../client && npm i",
    "build": "cd client && npm run build",`
        );
      } else {
        rootJSON = rootJSON.replace(
          `"scripts": {`,
          `"scripts": {
    "start": "node server/server.js",
    "develop": "concurrently \\"cd server && npm run watch\\" \\"cd client && npm start\\"",
    "install": "cd server && npm i && cd ../client && npm i",
    "seed": "cd server && npm run seed",
    "build": "cd client && npm run build",`
        );
      }

      // write a package.json with rootJSON, overwriting previous package
      fs.writeFile(
        `./dist/${dirName}/package.json`,
        generateJSON(rootJSON),
        (err) => {
          console.log(
            "📦 We've taken the liberty of updating your root directory's package.json. You'll thank us later. Onto the next one!"
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
      const data = await promises.readFile(filePath);
      let serverJSON = data.toString();
      serverJSON = serverJSON.replace(
        `"scripts": {`,
        `"scripts": {
    "watch": "nodemon",
    "seed": "node seeders/seeds.js",`
      );

      // write a package.json with serverJSON, overwriting previous package
      fs.writeFile(
        `./dist/${dirName}/server/package.json`,
        generateJSON(serverJSON),
        (err) => {
          console.log(
            "🙌 Hooray! Your server's package.json has also been updated. What a time to be alive."
          );
          if (err) throw err;
        }
      );
    } catch (error) {
      console.error(`Got an error trying to read the file: ${error.message}`);
    }
  }

  // run files to update package.json in respective directories
  updateRootJSON(`./dist/${dirName}/package.json`, isFEandServer);
  !isFEandServer ? updateServerJSON(`./dist/${dirName}/server/package.json`) : null;

  setTimeout(() => {
    if (isFEandServer) {
      console.log(
        `

🎉 The end! Your React front end and Express server project template can be found in ./dist/${dirName}/. 🥳
        
🤩 Copy this directory to your preferred location on your local device and, from its root directory, use shell command npm run develop to test it out! 👀
        
        `
      );
    } else {
      console.log(
        `

🎉 The end! Your full stack MERN project template can be found in ./dist/${dirName}/. 🥳
        
🤩 Copy this directory to your preferred location on your local device and, from its root directory, use shell command npm run develop to test it out! 👀
        
        `
      );
    }
  }, 1000);
};
