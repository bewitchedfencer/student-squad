var express = require("express");
var router = express.Router();
var db = require("../models/");

router.get("/", function(req, res) {
    var homeData = {
        first: "lisa",
        last: "vinson"
    };
    res.render("index", homeData);
});

module.exports = router;