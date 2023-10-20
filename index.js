const inquirer = require("inquirer");
const fs = require("fs");

inquirer.prompt([
  {
    message: "Please enter your full name: ",
    name: "name",
  },
  {
    message: "",
  },
]);
