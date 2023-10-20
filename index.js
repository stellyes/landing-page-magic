const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "Enter your first name",
      name: "firstName",
    },
    {
      type: "input",
      message: "Enter your last name",
      name: "lastName",
    },
    {
      type: "input",
      message: "Enter your location",
      name: "location",
    },
    {
      type: "input",
      message: "Enter your bio",
      name: "bio",
    },
    {
      type: "input",
      message: "Enter your GitHub username",
      name: "username",
    },
    {
      type: "input",
      message: "Enter your LinkedIn URL",
      name: "linkedIn",
    },
  ])
  .then(function ({ firstName, lastName, location, bio, username, linkedIn }) {
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
      <li class="col row justify-content-center"><a href="${repo.html_url}">${repo.name}</a></li>`

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
        const htmlStyle = 
`  <style>
html {
  width: 100%;
  height: 100%;
}

body {
  background: linear-gradient(#777, 30%, #999, 60%, #ccc);
  margin-top: 10%;
}

.custom-box {
  border: 2px solid #000;
  border-radius: 20px;
  background-color: #eee;
  box-shadow: 3px 3px 3px #111;
}
</style>
`
        const htmlBody =
`<body class="container align-bottoms">
  <div class="custom-box col align-items-center justify-content-center">
    <h1 class="row justify-content-center my-3">Hi! My name is ${firstName}</h1>
    <h2 class="row justify-content-center font-italic">

      Currently located in ${location}
    </h2>
    <p class="row justify-content-center py-5 text-center">${bio}</p>
    <ul id="repositories" style="list-style: none">${htmlRepoList}
    </ul>
    <div id="links" class="row justify-content-center">
      <p>${firstName} ${lastName} - <a href="${linkedIn}">LinkedIn</a>, <a href="${gitHubURL}">GitHub</a></p>
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
      const htmlString = htmlHead + htmlStyle + htmlBody;


      fs.writeFile("./output/index.html", htmlString, (err) => {
        err
          ? console.error(err)
          : console.log(`File created successfully!\n${numRepos} saved!`);
      });
    });
  });
