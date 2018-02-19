var expect = require("chai").expect;
var tutorRoutes = require("../controllers/api-routes.js");
var db = require(".././models");

var displayStudents = tutorRoutes.displayStudent;
var assignTutor = tutorRoutes.assignTutor;

describe("db.Student.update", function() {
  //It should take in the logged in user's tutor id.
  //It should locate the student with the student code provided in the unique_id field 
  //and update the tutor_id column.
  //It should redirect to the home page
    
})


describe("displayStudents", function() {
    //It should receive the user's id (a tutor)
    //It should locate each student in student table with matching tutor id and return in object
    //It should send all matching students back as response

})

describe("assignTutor", function() {
    //It should receive student code from tutor, and make all lower case
    it("should make student code all lower case", function() {
        expect(assignTutor("STE123D").to.equal("ste123d"))
    });

    //It should do a sequelize search for the student table for a student where uniqueID = code from tutor, and console student name if found

    //It should do a sequelize search for the student table for a student where uniqueID = code from tutor, and return a not found message if not found

    //It should add the logged in user's tutor ID to the corresponding row in student table

    //It should redirect to the home page (which displays all students with this tutor id)





})