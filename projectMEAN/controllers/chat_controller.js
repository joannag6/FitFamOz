/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var mongoose = require('mongoose');
var Conversation = mongoose.model('Conversation');

var createConversation = function(req,res){
    var conversation = new Conversation({
        "user1" : req.body.user1,
        "user2" : req.body.user2,
        "convo" : req.body.convo
    });
    conversation.save(function(err,newConvo){
        if(err){
            console.log(err.errmsg);
            res.status(400).send(err.errmsg);
        }else{
            res.send(newConvo);
        }
    });
};

var findAllChats = function(req,res){
    var u1 = req.params.user1;
    var u2 = req.params.user2;

    var query = {
        user1 : u1,
        user2 : u2
    };

    Conversation.findOne(query,function(err,conversation){
        if(!err){
            res.send(conversation);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createConversation = createConversation;
module.exports.findAllChats = findAllChats;
