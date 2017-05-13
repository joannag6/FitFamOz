/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var myApp = angular.module("myApp");

myApp.controller("MessagesCtrl", ["$scope", "User", "Chat", function($scope, User, Chat) {

    var id1 = "1653969884630637";
    var id2 = "10154890417537415";
    // Load the FB SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    $scope.statusChangeCallback = function(response) {
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        $scope.getCurrUser(response.authResponse.userID);
      } else {
        // The person is not logged into your app or we are unable to tell.
        // Redirects user to login page.
        window.location.href = '/';
      }
    };

    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1249707755145859',
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      FB.getLoginStatus(function(response) {
        $scope.statusChangeCallback(response);
        $scope.$apply();
      });
    };

    /* Function to get current user's ID. */
    $scope.getCurrUser = function(userID) {
      User.showOne({ id: "10212775626446865" }, function(data) {
        $scope.currUser = data;
        $scope.currUserID = $scope.currUser._id;
        $scope.friends = $scope.currUser.friends;
      }, function(err) {
        console.log(err);
      });
    };

    // $scope.curUser = function() {
    //     User.showOne({id: id1}, function(data) {
    //         $scope.curUser = data;
    //         $scope.friends = $scope.curUser.friends;
    //     }, function (err) {
    //         console.log(err);
    //     });
    // };

    $scope.lastMessages = [];
    $scope.curMessages = [];

    $scope.fetchChatList = function () {
        var messages;
        if ($scope.friends){
            $scope.friends.forEach(function (friend) {
                messages = function () {
                    Conversation.showChat({user1: id1, user2: friend.userID}, function(data) {
                        messages = data.convo;
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
