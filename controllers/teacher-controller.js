var exports = module.exports = {};

exports.getClassrooms = function(req, res){
    var teacher = $this.teacherId;
    db.Classroom.findAll({where: {teacherId:teacher}}).then(function(results){
        var hdbsObj = {
            classes:results
        };
        console.log(hdbsObj);
        //update with correct handlebars page
        res.render("index", hdbsObj)
    });
};

exports.postToClasses = function(req, res){
    //make sure the object sent from the front end has properties that match
    // the message model
    var newMessage = req.body;
    db.Message.create({
        newMessage
    }).then(function(errors){
        if(errors) throw errors;
        res.send("A new message has been sent to the students in your class!")
    });
};

exports.getStudentsInClass = function(req, res){
    var classID = req.params.classId;
    db.Student.findAll({include:[{model:Classroom, where:{classId:classID}}]}).then(function(results){
        var hdbsObj = {
            students:results
        }
        //check file name is correct
        res.render("studentDropdown", hdbsObj);
    });

exports.getStudent = function(req, res){
    var studentID = req.params.student;
    db.Student.findOne({where:{id:studentID}}).then(function(results){
        var hdbsObj = {
            student:results
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
        res.json("/");
    });
}