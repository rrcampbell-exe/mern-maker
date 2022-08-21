import fs, { promises } from "fs";

import {
  generateEnv,
  generateJSON
} from './generators.js'

export const writePkgJsonScripts = (dirName) => {
  // create .env in client directory to foil Mac-related errors on launch of React
  fs.writeFile(`./dist/${dirName}/client/.env`, generateEnv(), (err) => {
    console.log(
      "Mac users will be grateful for the inclusion of this .env in the client directory, we promise..."
    );
    if (err) throw err;

  async function updateRootJSON(filePath) {
    try {
      const data = await promises.readFile(filePath);
      let rootJSON = data.toString();
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
      const data = await promises.readFile(filePath);
      let serverJSON = data.toString();
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