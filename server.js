var express = require("express");
var bodyParser = require("body-parser");
// var mysql = require('mysql');
var path = require("path");
var htmlRoutes = require("./routes/htmlRoutes");
var apiRoutes = require("./routes/apiRoutes");

var app = express();

app.use(express.static('public'));
app.use("/", apiRoutes);
app.use("/", htmlRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening on http://localhost:" + PORT);
});
