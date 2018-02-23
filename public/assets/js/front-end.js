


//HOMEPAGE

    //When user enters data and clicks Register
        //Confirm required fields are inputted
        //Checks that password is more than 6 characters 
        //If usertype is tutor:
            //post new Tutor

        // If usertype is teacher:
            //post new Teacher


        //Sends post request to /newuser with userData object
            //then:
                //Check if usertype of response is tutor or teacher.
                    //If tutor> send request to get tutorView


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
