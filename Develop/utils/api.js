
const axios = require("axios");

function api(username) {
  const url = `https://api.github.com/users/${username}`;
  return axios.get(url).catch((err) => {
    console.log(`User not found`);
  });
}
module.exports = api;