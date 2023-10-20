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
`
      <li class="col"><a href="${repo.html_url}">${repo.name}</a></li>`

        nameString += `${repo.name}\n`;
        urlString += `${repo.html_url}\n`;
        numRepos++;
      }

      console.log(htmlRepoList);

      const gitHubURL = `https://github.com/${username}`
      
      
      
      

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
        const htmlBody =
`<body class="container align-middle">
  <div class="col align-items-center">
    <h1 class="row justify-content-center my-5">Hi! My name is Ryan</h1>
    <h2 class="row justify-content-center font-italic">
      Currently located in ${location}
    </h2>
    <p class="row justify-content-center py-5 text-center">${bio}</p>
    <ul id="repositories" style="list-style: none">${htmlRepoList}
    </ul>
    <div id="links" class="row justify-content-center">
      <p>${name} - <a href="${linkedIn}">LinkedIn</a>, <a href="${gitHubURL}">GitHub</a></p>
    </div>
  </div>

  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js"
    integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
    crossorigin="anonymous"
  ></script>
</body>
</html>
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
