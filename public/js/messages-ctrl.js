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

    // This is called with the results from from FB.getLoginStatus().
    $scope.statusChangeCallback = function(response) {
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        $scope.currAuth = response.authResponse;
        $scope.getCurrUser();
      } else {
        // The person is not logged into your app or we are unable to tell.
        console.log('Please log into this app.');
      }
    };

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    $scope.checkLoginState = function() {
      FB.getLoginStatus(function(response) {
        $scope.statusChangeCallback(response);
      });
    }

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

    $scope.getCurrUser = function() {
      User.showOne({ id: $scope.currAuth.userID }, function(data) {
        $scope.currUser = data;
        $scope.currUserID = $scope.currUser._id;
        if ($scope.currUser.friends.length > 0) {
          User.showMatches(
            { id: $scope.currUser._id },
            { idList: $scope.currUser.friends },
            function(data) {
              $scope.friends = data;
            //   $scope.fetchChatList();
              $scope.friendID = $scope.friends[0]._id;
            }, function(err) {
              console.log(err);
            });
        }
      }, function(err) {
        console.log(err);
      });
    };

    $scope.firstTimeChat = false;
    $scope.lastMessages = [];
    $scope.curMessages = [];

    // $scope.fetchChatList = function () {
    //     var messages;
    //     if ($scope.friends){
    //         $scope.friends.forEach(function (friend) {
    //             messages = function () {
    //                 Chat.showChat({user1: $scope.currUserID, user2: friend._id}, function(data) {
    //                     if(data){
    //                         messages = data.convo;
    //                         messages.reverse();
    //                         $scope.lastMessages.push(messages[0]);
    //                     }
    //                     else{
    //                         $scope.firstTimeChat = true;
    //                     }
    //                 }, function (err) {
    //                     console.log(err);
    //                 });
    //             };
    //         });
    //     }
    // };

    $scope.openChat = 0;

    $scope.fetchChatWindow = function () {
        Chat.showChat({user1: $scope.currUserID, user2: $scope.friendID}, function (data) {
            $scope.activeChat = data;
            $scope.curMessages = $scope.activeChat.convo;
        }, function (err) {
            console.log(err);
        });
    };

    $scope.toggleOpenChat = function (index) {
        $scope.openChat = index;
        $scope.updateChat();
        $scope.friendID = $scope.friends[$scope.openChat]._id;
        $scope.fetchChatWindow();
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
        };
        if ($scope.firstTimeChat){
            Chat.$save(updated_convo);
            $scope.curMessages = [];
            $scope.firstTimeChat = false;
        }
        else{
            Chat.update({user1: $scope.currUserID, user2: $scope.friendID}, updated_convo);
            $scope.curMessages = [];
            $scope.firstTimeChat = false;
        }
    }
}]);
