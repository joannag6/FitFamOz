/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var mongoose = require('mongoose');
var Conversation = mongoose.model('Conversation');

var createConversation = function(req,res){
    var conversation = new Conversation({
        "chatID": req.body.chatID,
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
    Conversation.find({}, function(err,conversations){
        if(!err){
            res.send(conversations);
        }else{
            res.sendStatus(404);
        }
    });
};

var updateChat = function(req, res) {

    Conversation.findOne({chatID : req.params.chatID},function(err,conversation){
        if(!err){
            conversation.convo = req.body.convo;
            conversation.save(function (err) {
                if (err){
                    res.send(err);
                }
                else{
                    res.json({message: "Chat Updated!"});
                }
            });
        }else{
            res.sendStatus(404);
        }
    });
}

var findChat = function(req,res){

    Conversation.findOne({chatID : req.params.chatID},function(err,conversation){
        if(!err){
            res.send(conversation);
        }else{
            res.sendStatus(404);
        }
    });
};

module.exports.createConversation = createConversation;
module.exports.findAllChats = findAllChats;
module.exports.findChat = findChat;
module.exports.updateChat = updateChat;
