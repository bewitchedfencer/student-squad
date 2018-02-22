var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");

//REGISTER NEW TUTOR

//Request received to register a new tutor
router.post("/newUser", passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
}));

router.get("/userLogin", passport.authenticate('local-signin', {
    successRedirect: '/dashboard',
    failureRedirect: '/'
})
);
module.exports = router;