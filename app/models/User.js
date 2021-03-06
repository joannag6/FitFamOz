var mongoose = require('mongoose');

var activitiesSchema = mongoose.Schema({
    name : String,
    level : String
});
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    _id : {
      type: String,
      index: {
        unique: true,
        required: true
      }
    },
    firstName : String,
    lastName : String,
    dob : Date,
    aboutMe : String,
    location : String,
    picUrl : String,
    activities : [activitiesSchema],
    friends : [String] // Store as array of IDs.
    // hash: String,
    // salt: String
});


/*userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.validPassword = function(password){
  var hash = cryto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash == hash;
}

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");
}*/

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);
