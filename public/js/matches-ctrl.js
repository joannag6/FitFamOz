var myApp = angular.module("myApp");

myApp.controller("MatchesCtrl", ["$scope", "User", function($scope, User) {

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
      $scope.getMatches();
    }, function(err) {
      console.log(err);
    });
  };

  $scope.matchLocation = true;
  $scope.otherQuery = "";

  $scope.toggleMatch = function() {
    $scope.matchLocation = !$scope.matchLocation;
    $scope.getMatches();
    $scope.otherQuery = "";
  }

  $scope.getMatches = function() {
    var query = {};
    if ($scope.matchLocation) {
      query = {location: $scope.currUser.location};
    } else {
      query = {activities: $scope.currUser.activities};
    }
    User.showMatches({ id: $scope.currUserID }, query, function(data) {
        $scope.users = data;
        if ($scope.users.length == 0) {
          // No matches found
          $scope.otherQuery = $scope.matchLocation ? "activities" : "location";
        }
      }, function(err) {
        console.log(err);
    });
  };

  $scope.isFriend = function(user) {
    if (!$scope.friends)
      return false;
    for (var i=0; i<$scope.friends.length; i++) {
      if ($scope.friends[i]._id == user._id) {
        return true;
      }
    }
    return false;
  };

  $scope.addFriend = function(user) {
    var newFriends = $scope.friends.push(user);
    User.update(
      { id: $scope.currUserID },
      $scope.currUser,
      function(data) {
        console.log(data);
      }, function(err) {
        console.log(err);
        window.alert("Error adding friend");
    });
  };

  $scope.removeFriend = function(user) {
    var friends = $scope.friends;
    for (var i=0; i<friends.length; i++) {
      if (friends[i]._id == user._id) {
        friends.splice(i, 1);
        $scope.currUser.friends = friends;

        User.update(
          { id: $scope.currUserID },
          $scope.currUser,
          function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
            window.alert("Error removing friend");
        });
      }
    }
  };
}]);
