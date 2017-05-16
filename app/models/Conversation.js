/**
 * Created by NamNguyen1 on 15/4/17.
 */
var mongoose = require('mongoose');

var Conversation = mongoose.Schema({
    chatID : {
      type: String,
      index: {
        unique: true,
        required: true
      }
    },
    convo : [{
        author: String,
        text: String,
        created: Date
    }]
});

// define our user model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Conversation', Conversation);
