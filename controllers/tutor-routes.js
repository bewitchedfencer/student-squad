var express = require("express");

var router = express.Router();
// edit burger model to match sequelize
var db = require("../models/");

//New Tutor:

router.post("/newTutor", function(req, res) {

    var tutor = req.body;

    db.Tutor.create({
        tutor_first_name: tutor.firstName,
        tutor_last_name: tutor.lastName,
        tutor_agency: tutor.agency,
        email: tutor.email,
        password: tutor.password
    }).then(function(newUser) {
        console.log("New tutor signed up!")
    })

});

router.get("/tutorLogin", function(req, res) {

    db.Tutor.findOne({
        where: {email: req.body.email}
    }).then(
        function(tutor) {
            if (tutor.password === req.body.password) {
                console.log("successfully authenticated")
            }
            else {
                console.log("No tutors matching those credentials")
            }
        }
    )
})

//TUTOR HOME PAGE

//GET ROUTE - Displays students assigned to logged in tutor on navigation bar

// app.GET("/", function (req, res) {
var displayStudents = function (req, res) {
    db.Student.findAll({
        where: {
            tutor_id: req.body.userId //Determine how to store logged in tutor's id
        }
    }).then(function (students) {
        res.json(students)
    })
};

//PATCH ROUTES - Updates the tutor_id field for student with code entered

// app.PATCH("/newStudent", function (req, res) {
var assignTutor = function (req, res) {
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
};

//Google Calendar API - Client Side Only

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

var tutorRoutes = {
    displayStudents, assignTutor
};

module.exports = tutorRoutes;