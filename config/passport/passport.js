//Passport Statregy

var bCrypt = require('bcrypt'); //encrypts password before storing in db
var db = require("../../models/");

module.exports = function (passport, user) {
    var User = user; //reference to User model
    var LocalStrategy = require('passport-local').Strategy;

    //serialize user
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });

    });

    //local strategy for registering new user
    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        //function to store user's info; email, pw, and a cb function to run once new user is added
        function (req, email, password, done) {
            // console.log(req.body);

            //function to hash password
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            //Check if user with same email address already exists in User table
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (userMatch) {
                if (userMatch) {
                    console.log("that email is already in use!");
                    return done(null, false, {
                        message: "That email is already in use. Please log in." //confirm where this message is visible
                    })

                } else {
                    console.log("That is a unique email");
                    var userPassword = generateHash(password);

                    var userData = {
                        email: email,
                        password: userPassword,
                        user_type: req.body.userType
                    };

                    User.create(userData).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            if (req.body.userType == "tutor") {

                                var tutorData = {
                                    tutor_first_name: req.body.firstName,
                                    tutor_last_name: req.body.lastName,
                                    tutor_agency: req.body.agency,
                                    UserId: newUser.id
                                };

                                db.Tutor.create(tutorData).then(function (newTutor) {
                                    console.log(newTutor.tutor_first_name);
                                    return done(null, newUser);
                                });

                            };



                        }
                    })
                }
            })
        }
    ));

    passport.use("local-signin", new LocalStrategy(

        { // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {

            var User = user;
            console.log(User);
            //Compares "unhashed" db password to user input
            var checkPass = function (userPass, password) {
                return bCrypt.compareSync(password, userPass);
            };

            //Check user table, locate user with matching email
            User.findOne({
                where: {
                    email: email
                }
            }).then(function (user) {

                //If no tutor with the same email is found:
                if (!user) {
                    return done(null, false, {
                        message: "Invalid username"
                    })
                }
                //If email matches, check if password input matches password in database:
                if (!checkPass(user.password, password)) {
                    return done(null, false, {
                        message: "Invalid email or password. Please try again."
                    })
                }

                //email and password match
                var userInfo = user.get();
                console.log("password confirmed")
                return done(null, userInfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: "Error logging in. Please try again later"
                })
            })


        }
    ))
}