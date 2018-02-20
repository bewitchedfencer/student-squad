var express = require("express");
var router = express.Router();
var db = require("../models/");

// Dummy routes for  for testing 

router.get("/", function(req, res) {
    var homeData = {
        first: "lisa",
        last: "vinson"
    };
    res.render("index", homeData);
});

router.get("/dashboard", function(req, res) {
    res.render("dashboard");
});


module.exports = router;