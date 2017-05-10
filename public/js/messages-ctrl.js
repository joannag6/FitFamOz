/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var myApp = angular.module("myApp");

myApp.controller("MessagesCtrl", ["$scope", "Conversation", "User", function($scope, User, Conversation) {

    var id1 = "5902c90d6b6f414d6e9afb00";
    var id2 = "5902d085330bf04eadf38562";

    $scope.curUser = User.showOne({id: id1});
    $scope.friends = $scope.curUser.friends;

    $scope.lastMessages = [];
    $scope.curMessages = [];

    $scope.fetchChatList = function () {
        var messages;
        $scope.friends.forEach(function (friend) {
            messages = Conversation.showChat({user1: id1, user2: friend});
            messages.reverse();
            $scope.lastMessages.push(messages[0]);
        });
        $scope.lastMessages.reverse();
    };

    $scope.fetchChatWindow = function () {
        var chat = Conversation.showChat({user1: id1, user2: id2});
        $scope.curMessages = chat.convo;
    };

    $scope.updateChat = function (new_msg) {
        $scope.curMessages.push(new_msg);
        Conversation.update({user1: id1, user2: id2}, $scope.curMessages);
    }
}]);