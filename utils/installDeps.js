import { exec } from "child_process";
import { writePkgJsonScripts } from "./writePkgJsonScripts.js"



// navigate to project directory
export const installDeps = (dirName, isOnlyFE, isFEandServer) => {
  let pkgInstallCmd
  if (isOnlyFE) {
    pkgInstallCmd = `cd dist && npx create-react-app ${dirName}`
  } else if (isFEandServer) {
    pkgInstallCmd = `cd dist/${dirName} && npm init -y && npm i concurrently -D && npm i express && npx create-react-app client`
  } else {
    pkgInstallCmd = `cd dist/${dirName} && npm init -y && npm i concurrently -D && npx create-react-app client && cd server && npm init -y && npm i apollo-server-express bcrypt express faker graphql jsonwebtoken mongoose && npm i nodemon -D`
  }
  exec(
    pkgInstallCmd,
    (error, stdout, stderr) => {
      writePkgJsonScripts(dirName, isOnlyFE, isFEandServer)
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