// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const passport = require('passport'); //authentication
const session = require('express-session'); //make authentication persistent
const bcrypt = require("bcrypt"); //hash and salts passwords

//Sets up Express App
// =============================================================

var PORT = process.env.PORT || 3000;

//requiring our models to sync
const db = require('./models');




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// For Passport Authentication 
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));

//For handlebars
var exphbs = require("express-handlebars"); //handlebars - templating engine

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Routes
// =============================================================

var tutor_routes = require("./controllers/tutor-routes.js");
// var teacher_routes= require("./controllers/teacher-routes.js");
var html_routes = require("./controllers/html-routes.js")

app.use(tutor_routes);
// app.use(teacher_routes);
app.use(html_routes);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  }).catch(function(err) {
    console.log(err, "Issue connecting to database");
  });
