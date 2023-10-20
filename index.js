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
      var htmlRepoList = "";
      var numRepos = 0;
      for (const repo of response.data) {
        // console.log(repo);
        // const { name } = repo.name;
        // const { url } = repo.html_url;
        // console.log(repo.name);
        // console.log(repo.html_url);
        nameArray.push(repo.name);
        urlArray.push(repo.html_url);

        htmlRepoList += 
`<li class="col"><a href="${repo.html_url}">${repo.name}</a></li>
`

        nameString += `${repo.name}\n`;
        urlString += `${repo.html_url}\n`;
        numRepos++;
      }

      console.log(htmlRepoList);

      const gitHubURL = `https://github.com/${username}`
      // ${name}
      // ${location}
      // ${bio}
      // ${linkedIn}

      const htmlHead =
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
            integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
            crossorigin="anonymous"
          />
          <title>Professional Portfolio</title>
        </head>
        `


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
