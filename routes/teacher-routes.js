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
    router.get("/api/messages/:student", function(req, res){
        var studentId = req.student
        db.Message.findAll({where:{studentId:studentId}}).then(function(results){
            //update with correct handlebars template
            res.render("index", results);
        });
    });
    //PATCH - Update/edit a message from the messages table
    router.patch("/:messageId", function(req,res){
        var messageID = req.messageId;
        db.Message.update({text:req.text, where:{id:messageID}}).then(function(results){
            res.json(results);
        })
    });
    //PATCH messages - Change to read (tutor)
    router.patch("/:messageId?", function(req, res){
        var messageID = req.messageId;
        db.Message.update({tutor_read:true, where:{messageId:messageID}}).then(function(results){
            console.log(results);
            redirect.reload();
        });
    });

    //Messages
    //POST - Create a new teacher message (student name, date, length of session, message, next topics to cover);
    //this will be similar to the post above when that is corrected
    