var myApp = angular.module("myApp");

myApp.controller("MyProfileCtrl", ["$scope", "User", function($scope, User) {

  // This is called with the results from from FB.getLoginStatus().
  $scope.statusChangeCallback = function(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log(response);
      $scope.currAuth = response.authResponse;
      $scope.getCurrUser();
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log('Please log into this app.');
    }
  }

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
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $scope.getCurrUser = function() {
    User.showOne({ id: $scope.currAuth.userID }, function(data) {
      $scope.currUser = data;
      console.log($scope.currUser);
    }, function(err) {
      console.log(err);
    });
  }

  $scope.editMode = false;

  $scope.activityLevels = ["High", "Low", "Medium"];

  $scope.myActivities = [
    {"name": "Swimming", "level": "High"},
    {"name": "Dog Walking", "level": "Low"},
    {"name": "Jogging", "level": "High"},
    {"name": "Weight Lifting", "level": "Medium"}
  ];

  // $scope.currUser = {"firstName": "John", "lastName": "Smith", "aboutMe": "Hi, I'm looking for a cool gym partner."};

  $scope.toggleEditMode = function() {
    $scope.editMode = !$scope.editMode;
  };

  $scope.saveChanges = function() {
    $scope.toggleEditMode();
    // figure out how to put in ID
  //   User.update($scope.currUser, function(data) {
  //     // console.log(data);
  //     $scope.editMode = !$scope.editMode;
  //   }, function(error) {
  //     console.log(error);
  //   })
  };
}]);