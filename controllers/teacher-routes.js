var express = require("express");

var router = express.Router();
var db = require("../models/");

    //TEACHER LANDING PAGE

        //POST: Send message to entire class/classes
    router.post("/newTeacher", function(req, res){
        var teacher = req.body;
        db.Teacher.create({
            first_name:teacher.firstName,
            last_name:teacher.lastName,
            email:teacher.email,
            password:teacher.password
        }).then(function(newUser){
            console.log("New teacher added!");
        });
    });

        //GET: Get list of classses 
        router.get("/classes", function(req, res){
            var teacher = $this.teacherId;
            db.Class.findAll({where: {teacherId:teacher}}).then(function(results){
                var hdbsObj = {
                    classes:results
                };
                console.log(hdbsObj);
                //update with correct handlebars page
                res.render("index", hdbsObj)
            });
        });

        //Get: list of students in each class - when user clicks on class, generate dropdown with list
        router.get("/:classId?/", function(req, res){
            var classId = req.classId;
            //not sure how to query this one to return the 
            // db.Roster.findAll({attributes:[''], where:{classId=classId}})
        });

        //STUDENT PROFILE (Tutor View and Teacher View)
    //GET - Most recent 5 tutor messages/notes from the messages table


    //GET - Most recent 5 teacher messages/notes from the messages table

    //GET - All notes from the messages table
    router.get("/api/messages/:student?", function(req, res){
        var studentId = req.student
        db.Message.findAll({where:{studentId:studentId}}).then(function(results){
            //update with correct handlebars template
            res.render("index", results);
        });
    });
    //PATCH - Update/edit a message from the messages table
    router.patch("/:messageId?", function(req,res){
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

    //GET - Notes / Landing Page (HTML Routes)

        //Get Pages: Student profile, landing page (HTML Routes)

    //Messages
    //POST - Create a new teacher message (student name, date, length of session, message, next topics to cover);
