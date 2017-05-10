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
      console.log('User needs to log in.');
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
    });
  };

  /* Function to get current user's ID. */
  $scope.getCurrUser = function(userID) {
    User.showOne({ id: userID }, function(data) {
      $scope.currUserID = data._id;
    }, function(err) {
      console.log(err);
    });
  };

  User.showAll(function(data) {
      $scope.users = data;
    }, function(err) {
      console.log(err);
  });
}]);
