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

var updateUser = function(req,res){
  User.update({_id: req.params.id}, {
    "firstName":req.body.firstName,
    "lastName":req.body.lastName,
    "location":req.body.location,
    "activities":req.body.activities,
    "aboutMe":req.body.aboutMe,
    "friends":req.body.friends
  }, function(err, affected, resp) {
    if(err){
      console.log(err.errmsg);
      res.status(400).send(err.errmsg);
    }else{
      res.send(resp);
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
  var UserInx = req.params.id;
  User.findById(UserInx,function(err,user){
    if(!err){
      console.log(user);
      res.send(user);
    }else{
      console.log("fk");
      console.log(err);
      res.sendStatus(404);
    }
  });
};

var findMatches = function(req,res){
  var userID = req.params.id;
  var userLocation = req.body.location;
  var idList = req.body.idList;

  if (userLocation) {
    // Find location regardless of case
    User.find({location: {'$regex': userLocation,$options:'i'}})
        .where("_id").ne(userID)
        .exec(function(err,users){
          if(!err){
            res.send(users);
          }else{
            console.log(err);
            res.sendStatus(400);
          }
        });
  } else if (idList) {
    User.find()
        .where('_id')
        .in(idList)
        .exec(function(err,users){
          if(!err){
            res.send(users);
          }else{
            console.log(err);
            res.sendStatus(400);
          }
        });
  } else {
    var userActivities = [];
    req.body.activities.forEach(act => userActivities.push(act.name));

    // Find any user that has at least one activity match with you
    User.find()
        .where('activities.name')
        .in(userActivities)
        .where("_id").ne(userID)
        .exec(function(err,users){
          if(!err){
            res.send(users);
          }else{
            console.log(err);
            res.sendStatus(400);
          }
        });
  }
};


module.exports.createUser = createUser;
module.exports.updateUser = updateUser;
module.exports.findAllUsers = findAllUsers;
module.exports.findOneUser = findOneUser;
module.exports.findMatches = findMatches;
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
