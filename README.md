# 🏭 Mern Maker 

[![license-MIT-blue.png](https://img.shields.io/badge/license-MIT-blue)](#License)

## 📝 Description
An application that generates full stack MERN project templates based on user input.

## 📖 Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Credits](#credits)
- [Questions, Comments, Suggestions](#questions-comments-suggestions)

## 🛠️ Installation
To install this app locally, clone it to your device.

## ⌨️ Usage
With the app open in your IDE, run `npm start` or `node index` from the root directory and answer the prompts provided.

Once you have answered the prompts, MERN Maker gets to work. **Please be patient as the MERN Maker builds your project.** 

Depending on your device and the quality of your internet connection, it can take several minutes to create all of the files necessary for out-of-the-box functionality.

The console will confirm when the build is complete.

**Note: You may receive errors in the console related to the functionality of GraphQL, but please note that as of October 29th, 2021, these errors do not inhibit the app's functionality.**

Once the build is complete, visit the `dist` directory and relocate the folder with your project's name to your desired location.

If you chose to create a project with a database included, then, from the root of your project, you may optionally run `npm run seed` to seed your database with the provided user seeds.

To run projects that feature a server, use command `npm run develop` while in your project's root directory. Otherwise, from the same directory, use command `npm run start` to initialize your project.

The front end will then run on `localhost:3000`, with the ability to interface with your optional database via GraphQL queries in the Apollo Client running on `localhost:3001/graphql`.

 ## ✨ Features
 - Inquirer

## 💼 License
© 2021-2022 Ryan R. Campbell

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## 🎬 Credits
### Developed By
- [Ryan R. Campbell](https://www.github.com/rrcampbell-exe/)

## 📨 Questions, Comments, Suggestions
Please email [Ryan R. Campbell](mailto:campbell.ryan.r@gmail.com) with any questions, to report any bugs, or to make any feature suggestions. You can also [contact Ryan R. Campbell on GitHub](https://www.github.com/rrcampbell-exe/).

This README was generated by [Ryan R. Campbell's](https://www.github.com/rrcampbell-exe/) [README Generator](https://github.com/rrcampbell-exe/readme-generator).