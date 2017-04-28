var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    // userID : String,
    firstName : String,
    lastName : String,
    email: { type: String, index: { unique: true } },
    password : String,
    dob : Date,
    location : String,
    activities : [String],
    friends : [String]
});

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);
