var express = require("express");
var router = express.Router();
var db = require("../models/");
var passport = require("passport");

//REGISTER NEW TUTOR

//Request received to register a new tutor
// router.post("/newTutor", passport.authenticate('local-signup', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/'
// }));


//Authenticate User
// router.get("/userLogin", passport.authenticate('local-signin', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/'
// })
// );

//TUTOR HOME PAGE


// Displayed unread messages


//GET ROUTE - Displays students assigned to logged in tutor on navigation bar
// router.get("/", function (req, res) {
//     db.Student.findAll({
//         where: {
//             tutor_id: req.body.userId //Determine how to store logged in tutor's id
//         }
//     }).then(function (students) {
//         res.json(students)
//     })
// });

//PATCH ROUTES - Updates the tutor_id field for student with code entered
router.patch("/newStudent", function (req, res) {
    var studentCode = req.body.studentCode;
    studentCode = studentCode.toLowerCase.trim();
    var tutorCode = req.body.tutorCode; //determine how to save the id for this user

    db.Student.update({
        tutor_id: tutorCode
    }, {
        where: {
            unique_id: studentCode
        }
    }).then(function () {
        res.json("/");
    });
});


//Get 
//GET: View the student profile that was clicked - will send student data to handlebars page



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