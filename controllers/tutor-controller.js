var db = require("../models/");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var exports = module.exports = {};

exports.tutorHome = function (req, res) {
    console.log("tutorHome!")
    console.log(req.user);
    var tutor = req.user

    //Get all students assigned to this tutor
    db.Student.findAll({
        where: {
            TutorId: tutor.id
        }
    }).then(function (results) {

            var studentIds = [];
            
            (results).forEach(function (student) {
                studentIds.push(student.id);
            });
            console.log(studentIds);

            db.Message.findAll({ //Retreive all messages from the tutor's assigned students that are unread
                where: {
                    StudentId: {
                        [Op.or]: studentIds
                    },
                    tutor_read: false
                }
            }).then(function (messages) {

                res.render('tutorView', {students: results, unreadMsg: messages});
            })
        // }
    });
};

//add a student to this tutor
exports.addStudent = function (req, res) {
    var studentCode = req.params.studentId;
    console.log(studentCode);
    var tutor = req.user;
    console.log(tutor);

    db.Student.update({
        TutorId: tutor.id
    }, {
        where: {
            unique_id: studentCode
        }
    }).then(function (result) {
        if (result.changedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
};

//Get "this" student's profile and render
exports.studentProfile = function (req, res) {
    var studentId = req.params.studentId;
    var tutor = req.user
    db.Student.findOne({
        where: {
            id: studentId
        }
    }).then(function (student) {

        db.Message.findAll({
            where: {
                student_id: student.id,
            },
            order: [
                ['createdAt', 'DESC']
            ]
        }).then(function (tutorMessages) {
            db.Message.findAll({
                where: {
                    student_id: student.id,
                    authorType: "teacher"
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            }).then(function (teacherMessages) {

                // var messageObj = {
                //     tutorMessages,
                //     teacherMessages
                // };
                res.render("studentProfile", {studentObj: student, tutorMsgObj: tutorMessages, teacherMsgObj: teacherMessages});

            })
        })
    })
}

//Add a message to the database for this student

exports.addMessage = function (req, res) {
    var studentId = req.params.studentId;
    var tutor = req.user
    var authorName = ` ${tutor.first_name} ${tutor.last_name}`;

    db.Message.create({
        author: authorName,
        authorType: tutor.userType,
        text: req.body,
        tutor_read: true,
        teacher_read: false,
        StudentId: studentId
    }).then(function (message) {
        if (err) throw err;
        console.log("New message added for this student");
        res.redirect("studentProfile/" + message.StudentId); //Reload this student's profile 
    })
}

//Tutor read a Message
exports.tutorRead = function (req, res) {
    var messageID = req.params.messageId;
    db.Message.update({
        tutor_read: true,
        where: {
            messageId: messageID
        }
    }).then(function (err) {
        if (err) throw err;
        redirect.reload();
    });
};


//Edit a message
exports.editMessage = function (req, res) {
    var messageId = req.params.messageId;
    db.Message.update({
        text: req.body.text,
        where: {
            id: messageId
        }
    }).then(function (err) {
        if (err) throw err;
        redirect.reload();
    });
};

