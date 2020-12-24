// function to generate markdown for README
function generateMarkdown(data) {
  return `
  # ${data.title}
  # Table of Contents:
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Licenses](#Licenses)
  - [Contributing](#Contributing)
  - [Test](#Test)
  - [Questions](#Questions)             
# Description
${data.description}
# Installation
${data.installation}
# Usage 
${data.usage}
# Contributing
${data.contributing}
# Tests
${data.tests}
# License 
${data.licenseBadge}
# Questions 
Please take a look at the documentation in my github repository for "README-generator" 
and email me if you have any questions!
${data.emailaddress} <br/>
Github user name: ${data.githubusername} <br/>
[profile-picture](${data.avatar}=100x)
`;
}

module.exports = generateMarkdown;

