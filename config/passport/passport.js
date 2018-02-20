//Passport Strategies

var bCrypt = require('bcrypt');

module.exports = function (passport, tutor) {
    var Tutor = tutor; //reference to tutor model
    var LocalStrategy = require('passport-local').Strategy;

    //serialize user
    passport.serializeUser(function(tutor, done) {
        done(null, tutor.id);
    });


// used to deserialize the user
passport.deserializeUser(function(id, done) {
    Tutor.findById(id).then(function(tutor) {
      if(tutor){
        done(null, tutor.get());
      }
      else{
        done(tutor.errors,null);
      }
    });

});


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
            }).then(function (tutor) {
                if (tutor) {
                    return done(null, false, {
                        message: "That email is already in use. Please log in."
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
}