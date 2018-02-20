var express = require("express");
var router = express.Router();
var db = require("../models/");

// Dummy routes for  for testing tutor login

//Homepage
router.get("/", function(req, res) {
    res.render("index");
});

//Logged in Tutor
router.get("/dashboard", isLoggedIn, function(req, res) {
    res.render("dashboard");
});

//Logout (Currently manual)
router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/")
    })

});

//If user has been logged out, redirects to the home page instead of hasboard
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
};



module.exports = router;