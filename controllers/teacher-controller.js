var exports = module.exports = {};

//gets class data for the teacher user
exports.getClassrooms = function (req, res) {
    db.Classroom.findAll({
        where: {
            teacherId: req.teacher
        }
    }).then(function (results) {
        //creating an object to send to handlebars
        var hdbsObj = {
            classes: results
        };
        console.log(hdbsObj);
        //update with correct handlebars page
        res.render("index", hdbsObj)
    });
};

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

exports.getStudentsInClass = function (req, res) {
    var classID = req.params.classId;
    db.Student.findAll({
        include: [{
            model: Classroom,
            where: {
                classId: classID
            }
        }]
    }).then(function (results) {
        var hdbsObj = {
            students: results
        }
        //check file name is correct
        res.render("studentDropdown", hdbsObj);
    });

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
}