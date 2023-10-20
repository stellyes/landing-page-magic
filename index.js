const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    // {
    // type: "input",
    // message: "Enter your name",
    // name: "name",
    // },
    // {
    //   type: "input",
    //   message: "Enter your location",
    //   name: "location",
    // },
    // {
    //   type: "input",
    //   message: "Enter your bio",
    //   name: "bio",
    // },
    {
      type: "input",
      message: "Enter your GitHub username",
      name: "username",
    },
    // {
    //   type: "input",
    //   message: "Enter your LinkedIn URL",
    //   name: "linkedIn",
    // },
  ])
  .then(function ({ name, location, bio, username, linkedIn }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function (response) {
      // console.log(response);
      // console.log(response.data[0].name);
      // console.log(response.data[0].html_url);

      const nameArray = [];
      const urlArray = [];
      var nameString = "";
      var urlString = "";
      var numRepos = 0;
      for (const repo of response.data) {
        // console.log(repo);
        // const { name } = repo.name;
        // const { url } = repo.html_url;
        // console.log(repo.name);
        // console.log(repo.html_url);
        nameArray.push(repo.name);
        urlArray.push(repo.html_url);

        nameString += `${repo.name}\n`;
        urlString += `${repo.html_url}\n`;
        numRepos++;
      }

      // console.log(nameArray);
      // console.log(nameString);
      // console.log(urlArray);
      // console.log(urlString);

      fs.writeFile("namesFile.txt", nameString, (err) => {
        err
          ? console.error(err)
          : console.log(`File created successfully!\n${numRepos} saved!`);
      });
    });
  });
