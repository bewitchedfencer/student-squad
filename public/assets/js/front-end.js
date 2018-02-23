//If teacher> send request to get teacher view
// Modal triggers
//Signup modal
$("#signupButton").on("click", function(event){
    event.preventDefault();
    $("#signupModal").addClass("is-active");
});

//Login modal
$("#loginButton").on("click", function(event){
    event.preventDefault();
    $("#loginModal").addClass("is-active");
});
// Message modal
$("#messageButton").on("click", function(event){
    event.preventDefault();
    $("#messageModal").addClass("is-active");
});
//View ALl Messages modal -- Will need additional JS to render all messages, unless we want it hidden in the background
$("#allMessages").on("click", function(event){
    event.preventDefault();
    $("#allMessageModal").addClass("is-active");
});
//Closes modals in all pages, with the .modal-background being built into Bulma
//and the id #modalClose attached to each individual modal delete button
$(".modal-background").on("click", function(){
    $(".modal").removeClass("is-active");
})
$("#modalClose").on("click", function(){
    $(".modal").removeClass("is-active");
})

//


//HOMEPAGE - Lisa Notes below this line--------------------------

    //When user enters data and clicks Register (Following is currently handled by a form)
        //Confirm required fields are inputted
        //Checks that password is more than 6 characters 

        //Sends post request to /newuser with userData object


//TUTOR HOME PAGE

//When tutor clicks Add Student:
    //Capture text input and save as studentCode
    //Patch request to /addstudent, studentCode (will reload page once added)

//When tutor clicks view profile:
    //Capture data value of clicked student (this is the student's Id)
    //get request: studentProfile/studentId
//--------------------------------------------------------Lisa Notes end


//Alexa Teacher FE functions
//---------------------------------------------------------
//GET all the classes for a teacher, to be displayed in the partials
function getClassrooms(){
    //how do we grab the user's id from their table???
    var teacher = $this.teacherId;    
    var newSelector = {
        teacher:teacher
    };
    $.ajax("/classes", {
        type:"GET",
        data:newSelector
    }).then(function(){
        console.log("Classes loaded in nav bar");
        location.reload();
    });
};

//this is for posting to an entire class or multiple classes
function postNewClassMessage(){
    var classChoices=[];
    //add the classes checked off to the above array. 
    //how do we get this to the backend? Add it to the object? Yes
    //add the code for adding the classes to the array
    var author = $this.TeacherId;
    var authorType = "Teacher";
    var text = "FillerText"//jeff, add the box where the text is grabbed;
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
        type:"POST",
        data:newClassPost
    }).then(function(){
        console.log("New class message sent");
        location.reload();
    });
};

//function for grabbing the students in a class
function getAllStudents(){
    var classID = 1; //add the button that is clicked
    $.ajax(`/classes/${classID}`, {
        type:'GET'
    }).then(function(){
        console.log("All students added to the class dropdown");
    });
};

//grabs the student profile. Page is rendered in handlebars
function getAStudent(){
    var student = 12; //add the button to get the id when clicked
    $.ajax(`/studentProfile/${student}`, {
        type:'GET'
    }).then(function(){
        console.log(`Navigating to student profile of student id ${student}.`);
    });
};
//function for adding a class using the class code
function addAClass(){
    var classCode = "study50"; //add the code for grabbing the text from the box
    $.ajax("/addClass", {
        type:'PATCH',
        data:classroomCode
    }).then(function(){
        console.log("Class added!");
    });
};

//function for adding the most recent tutor messages
function mostRecentTutorMs(){
    
}