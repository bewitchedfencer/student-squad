var express = require("express");

var router = express.Router();
var db = require("../models/");
var teacherController = require("../controllers/teacher-controller.js")
//TEACHER LANDING PAGE

//POST: Send message to entire class/classes
router.post("/classMessage/", teacherController.postToClasses);

//GET: Get list of classses 
router.get("/classes", teacherController.getClassrooms);

//Get: list of students in each class - when user clicks on class, generate dropdown with list
router.get("/:classId/", teacherController.getStudentsInClass);

//PATCH: add a class to the teacher (AKA, add teacher id to class)
router.patch("/addClass/", teacherController.addClass)
//Get: Go to a student's profile
router.get("/studentProfile/:student", teacherController.getStudent);

//STUDENT PROFILE (Tutor View and Teacher View)
//GET - Most recent 5 tutor messages/notes from the messages table
router.get("/recentTutor/:student", teacherController.getTutorMessages);

//GET - Most recent 5 teacher messages/notes from the messages table
router.get("/recentTeacher/:student", teacherController.getTeacherMessages);

//GET - All notes from the messages table
router.get("/api/messages/:student", teacherController.allMessages);

//PATCH - Update/edit a message from the messages table
router.patch("/:messageId", teacherController.editMessage);

//PATCH messages - Change to read (tutor)
router.patch("/:messageId", teacherController.tutorRead);

//PATCH messages - Change to read (teacher)
router.patch("/:messageId", teacherController.teacherRead);

//Messages
//POST - Create a new teacher message 
router.post("/studentMessage/:student", teacherController.postToStudent);
