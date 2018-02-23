var db = require("../models/");

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
        var studentObj = {
            students: results
        };

        var studentIds = [];
        (studentObj.students).forEach(function (student) {
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
            var unreadMsg = {
                messages
            };

            console.log(unreadMsg.messages.text)
        })
        //find all messages from the message table that have a student Id = one 
        //of the studentObj.students.id and status is tutorUnread, false
    });

    res.render('tutorView', studentObj, unreadMsg);
};



//add a student to this tutor

//Get all students assigned to this tutor

//Get "this" student's profile

//Add a message to the database

//Retrieve all messages that are unread