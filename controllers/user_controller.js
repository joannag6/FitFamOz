var mongoose = require('mongoose');
var User = mongoose.model('User');

var loadIndex = function (req, res) {
    res.render('./pages/index');
}

var createUser = function(req,res){
    var user = new User({
        "_id":req.body.authResp.userID,
        "firstName":req.body.first_name,
        "lastName":req.body.last_name,
        // "email":req.body.email,
        // "password":req.body.password,
        "dob":req.body.birthday,
        "location":req.body.location,
        "picUrl":req.body.picUrl,
        "activities":req.body.activities,
        "friends":req.body.friends
    });
    user.save(function(err,newUser){
        if(err){
          console.log(err.errmsg);
          res.status(400).send(err.errmsg);
        }else{
          res.send(newUser);
        }
    });
};

var findAllUsers = function(req,res){
    User.find(function(err,users){
        if(!err){
            res.send(users);
        }else{
            res.sendStatus(404);
        }
    });
};

var findOneUser = function(req,res){
  console.log(req.params);
  console.log(req.params.id.userID);
    var UserInx = req.params.id;
    User.findById(UserInx,function(err,user){
        if(!err){
            console.log(user);
            res.send(user);
        }else{
            res.sendStatus(404);
        }
    });
};

// var deleteUser = function(req,res){
//     var UserInx = req.params.id;
//     User.findByIdAndRemove(UserInx,function(err,user){
//         if(!err){
//             res.json({ message: 'Successfully deleted', id: user.userID});
//         }else{
//             res.sendStatus(404);
//         }
//     });
//
// };

module.exports.createUser = createUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.loadIndex = loadIndex;
// module.exports.deleleUser = deleteUser;

/*module.exports.profileRead = function(req, res) {

  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};*/
