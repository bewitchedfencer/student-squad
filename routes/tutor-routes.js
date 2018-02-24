var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");
var tutorController = require("../controllers/tutor-controller.js");

//REGISTER NEW TUTOR

//GET: Display tutor's home page
router.get("/tutorView", isLoggedIn, tutorController.tutorHome)

//PATCH: Updates the tutor_id field for student with code entered
router.patch("/addStudent/:studentId", isLoggedIn, tutorController.addStudent);


//GET: View the student profile that was clicked - will send student data to handlebars page
router.get("/studentProfile/:studentId", isLoggedIn, tutorController.studentProfile);

router.post("/addMessage/:studentId", isLoggedIn, tutorController.addMessage);

//GET: Go to Notes page: Get route using handlebars
router.patch("/readMessage/:messageId", isLoggedIn, tutorController.tutorRead)
;

//PATCH - Update/edit a message from the messages table



//Get: list of students in each class - w hen user clicks on class, generate dropdown with list
function isLoggedIn(req, res, next) {

    
    if (req.isAuthenticated()) {
        console.log("logged in!");
        // console.log(res);
        return next();
    }
    console.log("Not authenticated!")
    res.redirect('/');
};

module.exports = router;