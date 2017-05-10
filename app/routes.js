var User = require('./models/User');
var Conversation = require('./models/Conversation');

var controller = require('../controllers/controller');
var chat_ctlr = require('../controllers/chat_controller');

module.exports = function(app) {

    // server routes ===========================================================
    // handle things like api calls
    // authentication routes

    //api routes
    app.get('/api', controller.findAllUsers);

    app.get('/api/chat', chat_ctlr.findAllChats);

    app.get('/api/chat/:user1&:user2', chat_ctlr.findChat);

    app.post('/api', controller.createUser);

    app.post('/api/chat', chat_ctlr.createConversation);

    app.put('/api/chat/:user1&:user2', chat_ctlr.updateChat);

    app.delete('/api/chat/:id', function (req, res) {
        var ChatInx = req.params.id;
        Conversation.findByIdAndRemove(ChatInx, function (err, chat) {
            if (!err) {
                res.json({message: 'Successfully deleted', id: chat._id});
            } else {
                res.sendStatus(404);
            }
        })

    });

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

    // messages page
    app.get('/messages', function(req, res) {
        res.render('./pages/messages');
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
    app.get('/', controller.loadIndex);

};
