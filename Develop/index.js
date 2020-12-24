
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown");
const api = require("./utils/api");

// array of questions for user
const questions = [
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
        },
        {
            type: "input",
            name: "githubusername",
            message: "What is your GitHub username?",
        },
          //email address
        {
            type: "input",
            name: "emailaddress",
            message: "What is your Email address?",
        },
        {
            type: 'input',
            message: 'What is the description of your project?',
            name: 'description',
        },
        {
            type: 'input',
            message: 'What are the installation instructions for your project?',
            name: 'installation',
        },
        {
            type: 'input',
            message: 'What is the usage information for your project?',
            name: 'usage',
        },
        {
            type: 'input',
            message: 'What are the contribution guidelines for your project?',
            name: 'contributing',
        },
        {
            type: 'input',
            message: 'What are the test instructions for your project?',
            name: 'tests',
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have",
            choices: [
              "Mozilla Public License 2.0",
              "MIT License",
              "GNU AGPLv3",
              "GNU GPLv3",
            ],
          },
        ];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (error) {
    if (error) throw error;
    console.log("Generated readme file successfully");
    });
}


function init() {
    inquirer.prompt(questions).then((response) => {
        let data = { ...response };
        switch (response.license) {
            case "Mozilla Public License 2.0":
              data.licenseBadge = `![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)`;
              break;
            case "MIT License":
              data.licenseBadge = `![MIT License](https://img.shields.io/badge/MIT-License-brightgreen)`;
              break;
            case "GNU AGPLv3":
              data.licenseBadge = `![GNU AGPLv3](https://img.shields.io/badge/GNU-AGPLv3-orange)`;
              break;
            case "GNU GPLv3":
              data.licenseBadge = `![GNU GPLv3](https://img.shields.io/badge/GNU-GPLv3-red)`;
              break;
          }
          api(data.githubusername).then((apiResponse) => {
            data.avatar = apiResponse.data.avatar_url;
            data.email = apiResponse.data.email;
            console.log(data);
            writeToFile("readme.md", generateMarkdown(data));
          });
    });
}


// function call to initialize program
init();

