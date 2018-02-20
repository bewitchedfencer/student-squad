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

    //GET - All tutor notes from the messages table

    //GET - All teacher notes from the messages table

    //PATCH - Update/edit a message from the messages table

    //PATCH messages - Change to read (tutor)

    //GET - Notes / Landing Page (HTML Routes)

        //Get Pages: Student profile, landing page (HTML Routes)

    //Messages
    //POST - Create a new teacher message (student name, date, length of session, message, next topics to cover);
