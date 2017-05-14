/**
 * Created by Nam Nguyen on 1/05/2017.
 */

var myApp = angular.module("myApp");

myApp.controller("MessagesCtrl", ["$scope", "User", "Chat", function($scope, User, Chat) {

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
      User.showOne({ id: userID }, function(data) {
        $scope.currUser = data;
        $scope.currUserID = $scope.currUser._id;
        $scope.friends = $scope.currUser.friends;
      }, function(err) {
        console.log(err);
      });
    };

    $scope.lastMessages = [];
    $scope.curMessages = [];

    $scope.fetchChatList = function () {
        var messages;
        if ($scope.friends){
            $scope.friends.forEach(function (friend) {
                messages = function () {
                    Chat.showChat({user1: $scope.currUserID, user2: friend._id}, function(data) {
                        if(data){
                            messages = data.convo;
                        }
                        else{
                            $scope.firstTimeChat = true;
                        }
                    }, function (err) {
                        console.log(err);
                    });
                };
                if(!$scope.firstTimeChat){
                    messages.reverse();
                    $scope.lastMessages.push(messages[0]);
                }
            });
        }
    };

    $scope.lastMessages= [
        {
            created: "02/04/2017",
            text: "Hello there. My name is ..."
        },
        {
            created: "02/04/2017",
            text: "Hello there2. My name is ..."
        },
        {
            created: "02/04/2017",
            text: "Hello there3. My name is ..."
        },
        {
            created: "02/04/2017",
            text: "Hello there4. My name is ..."
        }
    ]

    $scope.openChat = 0;
    $scope.firstTimeChat = false;

    $scope.fetchChatWindow = function (friendID) {
        var chat = function () {
            Chat.showChat({user1: $scope.currUserID, user2: friendID}, function (data) {
                chat = data;
            }, function (err) {
                console.log(err);
            });
        };
        if (chat){
            $scope.curMessages = chat.convo;
        }
        else{
            $scope.firstTimeChat = true;
        }
    };

    $scope.toggleOpenChat = function (index) {
        $scope.openChat = index;
        $scope.friendID = $scope.friends[$scope.openChat]._id;
        console.log("fetching chat history!");
        $scope.fetchChatWindow($scope.friendID);
        $scope.updateChat();
    }

    $scope.isAuthorMe = function (data){
        if (data.author == "me"){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.text = 'type something';

    $scope.clearText = function () {
        $scope.text = '';
    }

    $scope.textSubmit = function () {
        if ($scope.text) {
            var newChat = {
                author: "me",
                created: Date.now(),
                text: $scope.text
            };
            $scope.curMessages.push(newChat);
            $scope.clearText();
            console.log("text entered!");
        }
    }

    $scope.updateChat = function () {
        var updated_convo = {
            user1: $scope.currUserID,
            user2: $scope.friendID,
            convo: $scope.curMessages
        }
        if (!$scope.firstTimeChat){
            console.log("updating chat");
            Chat.update({user1: $scope.currUserID, user2: $scope.friendID}, updated_convo);
        }
        else{
            console.log("creating chat");
            Chat.create(updated_convo);
        }

        $scope.curMessages = [];
    }
}]);
