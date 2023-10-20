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
  .then(function({ name, location, bio, username, linkedIn }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios
    .get(queryUrl)
    .then(function(data) {
      console.log(data);
      // console.log(data.name);
      
      const nameArray = [];
      const nameString = "";
      let numRepos = 0;
      for (const repo in data) {
        const {name} = data.name;

        nameArray.push(name);

        nameString += `${name}\n`
        numRepos++;
      }

      console.log(nameArray);
      console.log(nameString);

      fs.writeFile("namesFile.txt", nameString, (err) => {
        (err) ? console.error(err) : console.log(`File created successfully!\n${numRepos} saved!`);
      });
    });
  });



