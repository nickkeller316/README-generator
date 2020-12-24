//need inquirer for the questions prompts in the node terminal
const inquirer = require('inquirer');
//need fs to read and write files (markdown, README.md)
const fs = require('fs');
//generateMarkdown is where I created the actual README file via markdown, have to export and require said file
const generateMarkdown = require("./utils/generateMarkdown");
//the api file is for github
const api = require("./utils/api");

// array of questions for user, displayed in terminal via inquirer and node
const questions = [
    //user will enter the title of their project, name is title (for use in generateMarkdown)
    //this applies to all the others below, but with different names and functionality in the case of the choices property
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
        },
        //the user will enter their github username 
        {
            type: "input",
            name: "githubusername",
            message: "What is your GitHub username?",
        },
          //the user will enter their email address
        {
            type: "input",
            name: "emailaddress",
            message: "What is your Email address?",
        },
        //description of the users project
        {
            type: 'input',
            message: 'What is the description of your project?',
            name: 'description',
        },
        //installation instructions
        {
            type: 'input',
            message: 'What are the installation instructions for your project?',
            name: 'installation',
        },
        //usage instructions
        {
            type: 'input',
            message: 'What is the usage information for your project?',
            name: 'usage',
        },
        //contributing quidelines
        {
            type: 'input',
            message: 'What are the contribution guidelines for your project?',
            name: 'contributing',
        },
        //test instructions
        {
            type: 'input',
            message: 'What are the test instructions for your project?',
            name: 'tests',
        },
        //the user is prompted with a choice of licenses to choose from
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
//write the README file, via fs
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, function (error) {
    if (error) throw error;
    console.log("Generated readme file successfully");
    });
}

//initializing the program
function init() {
    inquirer.prompt(questions).then((response) => {
        let data = { ...response };
        //this is where we switch the value for the response license that is returned and used in generateMarkDown
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
          //here is where we use the api.js file
          api(data.githubusername).then((apiResponse) => {
            data.avatar = apiResponse.data.avatar_url;
            data.email = apiResponse.data.email;
            console.log(data);
            //call the writeToFile function
            writeToFile("readme.md", generateMarkdown(data));
          });
    });
}


// function call to initialize program
init();

