var express = require("express");
var router = express.Router();
var db = require("../models/");

// Dummy routes for  for testing tutor login

//Homepage
router.get("/", function(req, res) {
    res.render("index");
});

//Logout (Currently manual)
router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/")
    });

});

module.exports = router;