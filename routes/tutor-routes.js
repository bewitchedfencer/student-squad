var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");
var tutorController = require("../controllers/tutor-controller.js");

//REGISTER NEW TUTOR

//
router.get("/tutorView", isLoggedIn, tutorController.tutorHome)

function isLoggedIn(req, res, next) {

    
    if (req.isAuthenticated()) {
        console.log("logged in!");
        // console.log(res);
        return next();
    }
    console.log("Not authenticated!")
    res.redirect('/');
};



//PATCH ROUTES - Updates the tutor_id field for student with code entered
router.patch("/addStudent/:studentId", isLoggedIn, tutorController.addStudent);


//GET: View the student profile that was clicked - will send student data to handlebars page
router.get("/studentProfile/:studentId", isLoggedIn, tutorController.getStudent);


//GET: Go to Notes page: Get route using handlebars


//STUDENT PROFILE (Tutor View and Teacher View)
//GET - Most recent 5 tutor messages/notes from the messages table

//GET - Most recent 5 teacher messages/notes from the messages table

//GET - All tutor notes from the messages table

//GET - All teacher notes from the messages table

//PATCH - Update/edit a message from the messages table

//PATCH messages - Change to read (tutor)

//GET - Notes / Landing Page (HTML Routes)

//Messages
//POST - Create a new tutor message (student name, date, length of session, message, next topics to cover);

//Get Pages: Student profile, landing page (HTML Routes)

//TEACHER LANDING PAGE

//POST: Send message to entire class/classes

//GET: Get list of classses 

//Get: list of students in each class - when user clicks on class, generate dropdown with list


module.exports = router;