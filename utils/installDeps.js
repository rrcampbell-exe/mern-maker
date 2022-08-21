import { exec } from "child_process";
import { writePkgJsonScripts } from "./writePkgJsonScripts.js"



// navigate to project directory
export const installDeps = (dirName) => {
  exec(
    `cd dist/${dirName} && npm init -y && npm i concurrently -D && npx create-react-app client && cd server && npm init -y && npm i apollo-server-express bcrypt express faker graphql jsonwebtoken mongoose && npm i nodemon -D`,
    (error, stdout, stderr) => {
      writePkgJsonScripts(dirName)
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
}