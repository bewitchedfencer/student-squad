

=======
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

//Closes modals
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
