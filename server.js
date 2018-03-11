// Dependencies 
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Connecting to models
var News = require("./models/news.js");
var Notes = require("./models/notes.js");

var PORT = process.env.PORT || 8080;

//initializing Express
var app = express();

//allowing our app to use body parser and logger
app.use(bodyParser.urlencoded({
	entended: false
}));
app.use(logger("dev"));

// for static content
app.use(express.static("public"));

//Setting up Handlebars
var handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//connecting to Mongoose DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
  // useMongoClient: true
});

//routes
var routes = require("./controllers/controller.js");
app.use("/", routes);

// Listen on port 8080
app.listen(PORT, function() {
  console.log("App running on PORT " + PORT);
});