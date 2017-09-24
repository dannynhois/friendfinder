const routes = require("express").Router();
var path = require("path");

routes.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/survey.html"));
});

// catch all route
routes.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

module.exports = routes;
