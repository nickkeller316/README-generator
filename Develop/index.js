
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require("./utils/generateMarkdown");
const util = require('util');
const writeFileAsync = util.promisify(fs.writeFile);
// array of questions for user
const questions = () =>{
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the title of your project?',
            name: 'title',
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
    ]);
};

// function to write README file
const writeReadmeFile = (answers) =>
`${answers.title}
${answers.description}
${answers.installation}
${answers.usage}
${answers.contributing}
${answers.tests}
`;
// function to initialize program
questions()
  .then((answers) => writeFileAsync('README.md', writeReadmeFile(answers)))
  .then(() => console.log('Successfully wrote to README.md'))
  .catch((err) => console.error(err));
