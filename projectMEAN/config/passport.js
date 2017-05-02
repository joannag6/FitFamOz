var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
  },
  function(username, password, done){
    User.findOne({email: username}, function(err,user){
      if (err) { return done(err);}

      // Return if user not found in db
      if (!user) {
        return done(null,false, {
          message: 'User not found'
        });
      }
      
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password invalid'
        });
      }

      // Return user object when credentials are correct
      return done(null, user);
    });
  }
));
