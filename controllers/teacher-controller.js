var db = require("../models/");
var Sequelize = require('sequelize');
var exports = module.exports = {};

exports.teacherHome = function (req, res) {
    console.log("teacherHome!")
    console.log(req.user);
    var teacher = req.user
//gets class data for the teacher user
    db.Classroom.findAll({
        where: {
            teacherId:TeacherId
        }
    }).then(function (results) {
        //creating an array to store all of the classes
        var classesForTeacher = [];
        (results).forEach(function(classroom){
            classesForTeacher.push(classroom.id);
        });
        console.log("classes", classesForTeacher);

       
        //update with correct handlebars page
        res.render("teacherView", {classroom:results});
    });


//how are we doing this? How is this getting rendered in handlebars?
exports.getStudentsInClass = function (req, res) {
    db.Classroom.findAll({
        where: {
            teacherId:TeacherId
        }
    }).then(function (results) {
        //creating an array to store all of the classes
        var classesForTeacher = [];
        var allStudents = [];
        (results).forEach(function(classroom){
            classesForTeacher.push(classroom.id);
        });
        console.log("classes", classesForTeacher);
for(var i = 0; i<classesForTeacher.length; i++){
    db.Student.findAll({
        include: [{
            model: Classroom,
            where: {
                classId: classID
            }
        }]
    }).then(function (students) {
    allStudents.push(students[i]);
    });
};
    
        //check file name is correct
        res.render("teacherNavbar", {student:students, classroom:results});
    });

exports.postToClasses = function (req, res) {
    //make sure the object sent from the front end has properties that match
    // the message model
    var newMessage = req.body;
    db.Message.create({
        newMessage
    }).then(function (errors) {
        if (errors) throw errors;
        res.send("A new message has been sent to the students in your class!")
    });
};



    exports.getStudent = function (req, res) {
        var studentID = req.params.student;
        db.Student.findOne({
            where: {
                id: studentID
            }
        }).then(function (results) {
            var hdbsObj = {
                student: results
            }
            //check file name is correct
            res.render("studentProfile", hdbsObj)
        });

    };

    exports.addClass = function (req, res) {
        var classroomCode = req.body.classroomCode;
        classroomCode = classroomCode.toLowerCase.trim();
        var teacherCode = req.body.teacherCode; //determine how to save the id for this user

        db.Classroom.update({
            teacher_id: teacherCode
        }, {
            where: {
                classroom_code: classroomCode
            }
        }).then(function () {
            res.send("Class added to teacher user.");
        });
    };

    exports.getTutorMessages = function (req, res) {
        var studentID = req.params.student;
        db.Message.findAll({
                limit: 5,
                where: {
                    StudentId: studentID,
                    authorType: "Tutor"
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(function (results) {
                var hdbsObj = {
                    Messages: results
                };
                //put the correct handlebars file
                //what is the correct file here?
                res.render("tutorRecentMessages", hdbsObj)
            });
    };

    exports.getTeacherMessages = function (req, res) {
        var studentID = req.params.student;
        db.Message.findAll({
                limit: 5,
                where: {
                    StudentId: studentID,
                    authorType: "Teacher"
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            .then(function (results) {
                var hdbsObj = {
                    Messages: results
                };
                //put the correct handlebars file
                //What is the correct file here?
                res.render("teacherRecentMessages", hdbsObj)
            });
    };

    exports.allMessages = function (req, res) {
        var studentId = req.params.student
        db.Message.findAll({
            where: {
                StudentId: studentId
            }
        }).then(function (results) {
            //update with correct handlebars template
            //What is the correct file here?
            res.render("index", results);
        });
    };

    exports.editMessage = function (req, res) {
        var messageID = req.params.messageId;
        db.Message.update({
            text: req.body.text,
            where: {
                id: messageID
            }
        }).then(function (err) {
            if (err) throw err;
            redirect.reload();
        });
    };


exports.teacherRead = function (req, res) {
    var messageID = req.params.messageId;
    db.Message.update({
        teacher_read: true,
        where: {
            messageId: messageID
        }
    }).then(function (err) {
        if (err) throw err;
        redirect.reload();
    });
};

    exports.postToStudent = function (req, res) {
        var student = req.params.student;
        //make sure the object sent from the front end has properties that match
        // the message model
        var newMessage = req.body;
        db.Message.create({
            newMessage, where:{StudentId:student}
        }).then(function (errors) {
            if (errors) throw errors;
            res.send("A new message has been sent to this student in your class!");
            redirect.reload();
        });
    };
};
};