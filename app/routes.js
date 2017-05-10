var User = require('./models/User');
var Conversation = require('./models/Conversation');

var userController = require('../controllers/user_controller.js');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    //api routes
    app.get('/api', userController.findAllUsers);

    app.get('/api/:id', userController.findOneUser);

    app.post('/api', userController.createUser);

    app.put('/api/:id', userController.updateUser);

    // app.delete('/api/:id', userController.deleleUser());

    app.delete('/api/:id', function(req,res) {
        var UserInx = req.params.id;
        User.findByIdAndRemove(UserInx, function (err, user) {
            if (!err) {
                res.json({message: 'Successfully deleted', id: user.userID});
            } else {
                res.sendStatus(404);
            }
        })
    });

    // frontend routes =========================================================

    // use res.render to load up an ejs view file

    // about page
    app.get('/about', function(req, res) {
        res.render('./pages/about');
    });

    // matches page
    app.get('/matches', function(req, res) {
        res.render('./pages/matches');
    });

    // friends page
    app.get('/friends', function(req, res) {
        res.render('./pages/friends');
    });

    // my-profile page
    app.get('/myprofile', function(req, res) {
        res.render('./pages/my-profile');
    });

    // user page
    app.get('/user', function(req, res) {
        res.render('./pages/user-profile');
    });

    // route to handle all angular requests
    app.get('/', userController.loadIndex);

};
