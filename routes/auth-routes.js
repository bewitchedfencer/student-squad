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

router.post("/userLogin", passport.authenticate('local-signin', {
    failureRedirect: '/'
}), function (req, res) {

    if (req.user.user_type == 'tutor') {
        res.redirect("/tutorView");

    } else if (req.user.user_type == 'teacher') {
        res.redirect("/teacherview")
    }

});

// router.get('/dashboard', isLoggedIn, authController.dashboard);

//If user has been logged out, redirects to the home page instead of hasboard
// function isLoggedIn(req, res, next) {

//     console.log(req.body);
//     if (req.isAuthenticated()) {
//         console.log("logged in!");
//         return next();
//     }
//     console.log("Not authenticated!")
//     res.redirect('/');
// };

module.exports = router;