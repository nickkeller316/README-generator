//need this for the github url and profile picture
const axios = require("axios");

function api(username) {
  const url = `https://api.github.com/users/${username}`;
  return axios.get(url).catch((err) => {
    console.log(`User not found`);
  });
}
//exporting the file to be used in index.js
module.exports = api;