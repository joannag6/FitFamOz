var User = require('./models/User');
var Conversation = require('./models/Conversation');

var chatController = require('../controllers/chat_controller');
var userController = require('../controllers/user_controller.js');

module.exports = function(app) {

    // server routes ===========================================================

    //api routes

    //routes for User model
    app.post('/api', userController.createUser);
    app.get('/api', userController.findAllUsers);
    app.get('/api/:id', userController.findOneUser);
    app.post('/api/:id', userController.findMatches);
    app.put('/api/:id', userController.updateUser);
    app.delete('/api/:id', userController.deleteUser);

    //routes for Conversation model
    app.get('/api/chat', chatController.findAllChats);
    app.get('/api/chat/:user1&:user2', chatController.findChat);
    app.post('/api/chat', chatController.createConversation);
    app.put('/api/chat/:user1&:user2', chatController.updateChat);
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
    app.get('/', userController.loadIndex);

};
