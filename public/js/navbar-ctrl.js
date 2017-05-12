var myApp = angular.module("myApp");

myApp.controller("NavbarCtrl", ["$scope", "User", function($scope, User) {

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
      $scope.newUser = {};
      $scope.newUser.authResp = response.authResponse;
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

  /* Function to get current user as an object. */
  $scope.getUser = function() {
    User.showOne({ id: $scope.newUser.authResp.userID }, function(data) {
      if (window.location.href.endsWith("3000/") || window.location.href.endsWith(".com/"))
        window.location.href = '/matches';
      $scope.currUser = data;
    }, function(err) {
      $scope.errorMsg = "No account found, please sign up.";
      // include <a>
    });
  };

// for clicking on login page
  $scope.loginUser = function() {
    if ($scope.newUser.authResp) {
      $scope.getUser();
    } else {
      FB.login(function(response){
        $scope.checkLoginState();
      });
    }
  };

  $scope.logOut = function() {
    FB.logout(function(response) {
      console.log(response);
      window.location.href = '/';
    });
  };
}]);
