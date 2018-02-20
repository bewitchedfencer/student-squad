//Passport Statregy

var bCrypt = require('bcrypt'); //encrypts password before storing in db

module.exports = function (passport, tutor) {
    var Tutor = tutor; //reference to tutor model
    var LocalStrategy = require('passport-local').Strategy;

    //serialize user
    passport.serializeUser(function (tutor, done) {
        done(null, tutor.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Tutor.findById(id).then(function (tutor) {
            if (tutor) {
                done(null, tutor.get());
            } else {
                done(tutor.errors, null);
            }
        });

    });

    //local strategy for registering new tutor
    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback

        },
        //function to store user's info; tutor data, email, pw, and a cb function to run once new tutor added
        function (req, email, password, done) {

            //function to hash password
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            //Check if tutor with same email address already exists in Tutor table
            Tutor.findOne({
                where: {
                    email: email
                }
            }).then(function (tutorMatch) {
                if (tutorMatch) {
                    console.log("that email is already in use!");
                    return done(null, false, {
                        message: "That email is already in use. Please log in." //confirm where this message is visible
                    })

                } else {
                    var tutorPassword = generateHash(password);

                    var tutorData = {
                        tutor_first_name: req.body.firstname,
                        tutor_last_name: req.body.lastname,
                        tutor_agency: req.body.agency,
                        email: email,
                        password: tutorPassword,
                    };

                    Tutor.create(tutorData).then(function (newTutor, created) {
                        if (!newTutor) {
                            return done(null, false);
                        }
                        if (newTutor) {
                            return done(null, newTutor)
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

            var Tutor = tutor;
            //Compares "unhashed" db password to tutor input
            var checkPass = function (tutorPass, password) {
                return bCrypt.compareSync(password, tutorPass);
            };

            //Check tutor table, locate tutor with matching email
            Tutor.findOne({
                where: {
                    email: email
                }
            }).then(function (tutor) {

                //If no tutor with the same email is found:
                if (!tutor) {
                    return done(null, false, {
                        message: "Invalid username"
                    })
                }
                //If email matches, check if password input matches password in database:
                if (!checkPass(tutor.password, password)) {
                    return done(null, false, {
                        message: "Please check your password"
                    })
                }

                //email and password match
                var tutorInfo = tutor.get();
                return done(null, tutorInfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: "Error logging in. Please try again later"
                })
            })


        }
    ))
}