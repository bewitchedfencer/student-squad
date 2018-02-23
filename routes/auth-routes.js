var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");
var authController = require('../controllers/auth_controller.js');

//REGISTER NEW USER

router.post("/newUser", passport.authenticate('local-signup', {
    failureRedirect: '/'
}), function (req, res) {

    if (req.user.user_type == 'tutor') {
        res.redirect("/tutorView");

    } else if (req.user.user_type == 'teacher') {
        res.redirect("/teacherview")
    }
});

//LOGIN A USER
router.post("/userLogin", passport.authenticate('local-signin', {
    failureRedirect: '/'
}), function (req, res) {

    if (req.user.user_type == 'tutor') {
        res.redirect("/tutorView");

    } else if (req.user.user_type == 'teacher') {
        res.redirect("/teacherview")
    }

});

module.exports = router;