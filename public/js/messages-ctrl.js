/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var myApp = angular.module("myApp");

myApp.controller("MessagesCtrl", ["$scope", "Conversation", "User", function($scope, User, Conversation) {

    var id1 = "1653969884630637";
    var id2 = "10154890417537415";

    $scope.curUser = function() {
        User.showOne({id: id1}, function(data) {
            $scope.curUser = data;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.friends = $scope.curUser.friends;

    $scope.lastMessages = [];
    $scope.curMessages = [];

    $scope.fetchChatList = function () {
        var messages;
        if ($scope.friends){
            $scope.friends.forEach(function (friend) {
                messages = function () {
                    Conversation.showChat({user1: id1, user2: friend}, function(data) {
                        messages = data;
                    }, function (err) {
                        console.log(err);
                    });
                };
                messages.reverse();
                $scope.lastMessages.push(messages[0]);
            });
            $scope.lastMessages.reverse();
        }
    };

    $scope.fetchChatWindow = function () {
        var chat = function () {
            Conversation.showChat({user1: id1, user2: id2}, function (data) {
                chat = data;
            }, function (err) {
                console.log(err);
            });
        };
        $scope.curMessages = chat.convo;
    };

    $scope.updateChat = function (new_msg) {
        $scope.curMessages.push(new_msg);
        Conversation.update({user1: id1, user2: id2}, $scope.curMessages);
    }
}]);
