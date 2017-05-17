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
              $scope.fetchChatList();
              $scope.friendID = $scope.friends[0]._id;
            }, function(err) {
              console.log(err);
            });
        }
      }, function(err) {
        console.log(err);
      });
    };

    $scope.lastMessages = [];
    $scope.allConvos = [];
    $scope.curMessages = [];
    $scope.openChat = 0;

    $scope.fetchChatList = function () {
        var messages;
        if ($scope.friends){
            $scope.friends.forEach(function (friend) {
                $scope.getChatID(friend._id);
                Chat.showChat({chatID: $scope.chatID}, function(data) {
                    if(data.convo){
                        $scope.lastMessages.push(data.convo.reverse()[0]);
                        data.convo.reverse();
                    }
                    else{
                        $scope.createNewConvo(friend._id);
                        console.log("created new convo");
                    }
                }, function (err) {
                    $scope.createNewConvo(friend._id);
                    console.log("making new convo here")
                    console.log(err);
                });
            });
        }
    };

    $scope.createNewConvo = function (fid) {
        $scope.getChatID(fid);
        var new_convo = {
            chatID: $scope.chatID,
            convo: []
        };
        Chat.create(new_convo);
        $scope.curMessages = [];
    }

    $scope.fetchChatWindow = function () {
        if ($scope.friendID){
            $scope.getChatID($scope.friendID);
            console.log($scope.chatID);

            Chat.showChat({chatID: $scope.chatID}, function(data) {
                if(data){
                    $scope.curMessages = data.convo;
                }
                else{
                    //do nothing
                }
            }, function (err) {
                console.log(err);
            });
        }
    };

    $scope.toggleOpenChat = function (index) {
        $scope.openChat = index;
        $scope.friendID = $scope.friends[$scope.openChat]._id;
        $scope.fetchChatWindow();
    }

    $scope.isAuthorMe = function (data){
        if (data.author == $scope.currUserID){
            return true;
        }
        else{
            return false;
        }
    }

    $scope.text = '';

    $scope.clearText = function () {
        $scope.text = '';
    }

    $scope.textSubmit = function () {
        if ($scope.text) {
            console.log($scope.text);
            var newChat = {
                author: $scope.currUserID,
                created: Date.now(),
                text: $scope.text
            };
            if ($scope.curMessages){
                $scope.curMessages.push(newChat);
            }
            else{
                $scope.curMessages = [newChat];
            }

            $scope.updateChat();
            $scope.clearText();
            console.log("text entered!");
        }
    }

    $scope.getChatID = function (fid) {
        if (fid){
            var f4ID = fid.slice(-4);
            var u4ID = $scope.currUserID.slice(-4);
            var cID = f4ID * u4ID;
            $scope.chatID = cID.toString();
        }
    }

    $scope.updateChat = function () {
        $scope.getChatID($scope.friendID);
        console.log($scope.chatID);

        var updated_convo = {
            chatID: $scope.chatID,
            convo: $scope.curMessages
        };

        Chat.update({chatID: $scope.chatID}, updated_convo);
    }
}]);
