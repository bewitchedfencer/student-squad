var express = require("express");
var router = express.Router();
var db = require("../models/");

// Dummy routes for  for testing tutor login

//Homepage
router.get("/", function(req, res) {
    res.render("index");
});

//Logged in Tutor
// router.get("/dashboard", isLoggedIn, function(req, res) {
//     console.log(req.body);
//     res.render("dashboard");
// });
// // tutor view test route
// router.get("/tutorview", function(req,res){
//     console.log(req.body);
//     res.render("tutorview");
// })
//student profile test route
router.get("/studentprofile", function(req,res){
    console.log(req.body);
    res.render("studentprofile");
})
//Logout (Currently manual)
router.get("/logout", function(req, res) {
    req.session.destroy(function(err) {
        res.redirect("/")
    });

});



module.exports = router;