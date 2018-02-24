//If teacher> send request to get teacher view
// Modal triggers
//Signup modal
$("#signupButton").on("click", function (event) {
    event.preventDefault();
    $("#signupModal").addClass("is-active");
});

//Login modal
$("#loginButton").on("click", function (event) {
    event.preventDefault();
    $("#loginModal").addClass("is-active");
});
// Message modal
$("#messageButton").on("click", function (event) {
    event.preventDefault();
    $("#messageModal").addClass("is-active");
});
//View ALl Messages modal -- Will need additional JS to render all messages, unless we want it hidden in the background
$("#allMessages").on("click", function (event) {
    event.preventDefault();
    $("#allMessageModal").addClass("is-active");
});
$("#addStudentBtn").on("click", function (event) {
    event.preventDefault();
    $("#newStudent").addClass("is-active");
});
//Closes modals in all pages, with the .modal-background being built into Bulma
//and the id #modalClose attached to each individual modal delete button
$(".modal-background").on("click", function () {
    $(".modal").removeClass("is-active");
})
$("#modalClose").on("click", function () {
    $(".modal").removeClass("is-active");
})


//HomePage
    //Needs on click event for sign up form to:
        //Clear the input forms on the click
        //confirm data was entered, passwords match, are atleast 6 characters long, before sending
        //post request to newUser (front end validation). Once added, remove automatic post event from form and add inside of onclick event.
        

//When tutor clicks Add Student with code entered, :
$("#addStudent").on("click", function () {
    var studentCode = $("#studentCode").val().trim().lowercase();
    $.ajax("/addStudent/" + studentCode, {
        type: "PATCH"
    }).then(function (response) {
        location.reload();
    })
});

//When student button clicked, get that student's profile
$(".studentBtn").on("click", function (event) {
    event.preventDefault();
    var studentId = $(this).data("id");
    $.ajax("/studentProfile" + studentId, {
        type: "GET"
    }).then(function(response) {
        console.log(`Profile for ${response.first_name} retrieved!`);

    })
});

//To add a new message on student's profile:

$("#messageButton").on("click", function(event) {
    event.preventDefault(); 
    var studentId = $(this).data("id");
    var newMessage = $(".tutorMessage").val().trim();   
    
    $.ajax("/addMessage" + studentId, {
        type: "POST",
        data: newMessage
    })
});


//
//--------------------------------------------------------Lisa Notes end


//Alexa Teacher FE functions
//---------------------------------------------------------
//GET all the classes for a teacher, to be displayed in the partials
function getClassrooms() {
    //how do we grab the user's id from their table???
    var teacher = $this.teacherId;
    var newSelector = {
        teacher: teacher
    };
    $.ajax("/classes", {
        type: "GET",
        data: newSelector
    }).then(function () {
        console.log("Classes loaded in nav bar");
        location.reload();
    });
};

//this is for posting to an entire class or multiple classes
function postNewClassMessage() {
    var classChoices = [];
    //Definitely took this from stackoverflow
    $("#input:checkbox").each(function(){
        var $this = $(this);
        if ($this.is(":checked")){
            classChoices.push($this.attr("id"))
        }
    });
    var author = $this.TeacherId;
    var authorType = "Teacher";
    var text = $("#classMessage") 
    var tutor_read = false;
    var teacher_read = true;
    var newClassPost = {
        author,
        authorType,
        text,
        tutor_read,
        teacher_read
    };
    $.ajax("/classMessage", {
        type: "POST",
        data: newClassPost
    }).then(function () {
        console.log("New class message sent");
        location.reload();
    });
};

//function for grabbing the students in a class
function getAllStudents() {
    var classID = 1; //add the button that is clicked
    $.ajax(`/classes/${classID}`, {
        type: 'GET'
    }).then(function () {
        console.log("All students added to the class dropdown");
    });
};

//grabs the student profile. Page is rendered in handlebars
function getAStudent() {
    var student = 12; //add the button to get the id when clicked
    $.ajax(`/studentProfile/${student}`, {
        type: 'GET'
    }).then(function () {
        console.log(`Navigating to student profile of student id ${student}.`);
    });
};
//function for adding a class using the class code
function addAClass() {
    var classCode = "study50"; //add the code for grabbing the text from the box
    $.ajax("/addClass", {
        type: 'PATCH',
        data: classroomCode
    }).then(function () {
        console.log("Class added!");
    });
};

//function for adding the most recent tutor and teacher messages
function mostRecentMessages(){
    var studentID = 3; //put in code for actual studentID in table
    $.ajax(`/recentTutor/${studentID}`, {
        type:'GET',
    }).then(function(){
        console.log("Most recent tutor messages are being displayed.");
        $.ajax(`/recentTeacher/${studentID}`, {
            type:'GET',
        }).then(function(){
            console.log("Most recent tutor messages are being displayed.");
        });
    });
};

//function for displaying all messages relating to a student
function allTheMessages(){
    var studentID = 3; //put in code for actual studentID
    $.ajax(`/api/messages/${studentID}`, {
        type:'GET',
    }).then(function(){
        console.log("All messages are displayed for this student");
    });
};

//editing a message relating to a student
function editAMessage(){
    var authorID = "Me" //add code to capture the author of the message
    var messageID = 4; //add code to capture the messsage ID
    var userForeignKey = "Me" //add code to find the user's name
    var text = "changed text" //the text is all they can change
    if(authorID===userForeignKey){
        $.ajax(`/editMessage/${messageID}`, {
            type:'PATCH',
            data:text
        });
    }
    else{
        console.log("You cannot edit this post.");
    }
};

//read a message
function readMessage(){
    var messageID = 4; //add code for selected message
    $.ajax(`/tutorRead/${messageID}`, {
        type:'PATCH',
    }).then(function(){
        console.log(`Message with id ${messageID} has been marked read.`);
    });
};

//send a message to a student only

function postNewClassMessage(){
    var studentID = 4 //add correct code for the student ID
    var author = $this.TeacherId;
    var authorType = "Teacher";
    var text = "FillerText"//jeff, add the box where the text is grabbed;
    var tutor_read = false;
    var teacher_read = true;
    var newStudentPost = {
        author,
        authorType,
        text,
        tutor_read,
        teacher_read
    };
    $.ajax(`/studentMessage/${studentID}`, {
        type:"POST",
        data:newStudentPost
    }).then(function(){
        console.log("New message sent to this student");
        location.reload();
    });
};

