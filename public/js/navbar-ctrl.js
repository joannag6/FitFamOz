var myApp = angular.module("myApp");

myApp.controller("NavbarCtrl", ["$scope", "User", function($scope, User) {
  /********************** HANDLE LOGIN VIA FB **********************/

  (function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
  }(document));

  // This is called with the results from from FB.getLoginStatus().
  $scope.statusChangeCallback = function(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log(response);
      $scope.currAuth = response.authResponse;
      $scope.getUser();
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log("not logged in");
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      $scope.statusChangeCallback(response);
    });
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

  $scope.loginUser = function() {
    FB.login(function(response){
      $scope.checkLoginState();
    });
  };

  /* Function to get current user as an object. */
  $scope.getUser = function() {
    User.showOne({ id: $scope.currAuth.userID }, function(data) {
      if (!window.location.href.endsWith("/matches"))
        window.location.href = '/matches';
      $scope.currUser = data;
    }, function(err) {
      $scope.errorMsg = "No account found, please sign up.";
      // include <a>
    });
  };

  $scope.logOut = function() {
    FB.logout(function(response) {
      console.log(response);
      window.location.href = '/';
    });
  };
}]);
