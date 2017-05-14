var myApp = angular.module("myApp");

myApp.controller("MyProfileCtrl", ["$scope", "User", function($scope, User) {

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
      console.log(response);
      $scope.currAuth = response.authResponse;
      $scope.getCurrUser();
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

  /* Function to get current user as an object. */
  $scope.getCurrUser = function() {
    User.showOne({ id: $scope.currAuth.userID }, function(data) {
      $scope.currUser = data;
      console.log($scope.currUser);
    }, function(err) {
      console.log("User not logged in to app");
      window.location.href = '/';
    });
  };

  $scope.editMode = false;

  $scope.activityLevels = ["Low", "Medium", "High"];

  $scope.toggleEditMode = function() {
    $scope.editMode = !$scope.editMode;
  };

  $scope.addActivity = function() {
    var newActivity = {name: '', level: 'Low'};
    $scope.currUser.activities.push(newActivity);
  };

  $scope.deleteActivity = function(index) {
    $scope.currUser.activities.splice(index, 1);
  };

  $scope.saveChanges = function() {
    User.update(
      { id: $scope.currAuth.userID },
      $scope.currUser,
      function(data) {
        console.log(data);
        $scope.toggleEditMode();
      }, function(err) {
        console.log(err);
        window.alert("Error updating profile!");
    });
  };

  $scope.deleteAccount = function() {
    if (window.confirm("Are you sure you want to delete your account? (Cannot be undone)")) {
      User.delete(
        { id: $scope.currAuth.userID },
        function(data) {
          console.log(data);
          FB.logout(function(response) {
            console.log(response);
            window.location.href = '/';
          });
        }, function(err) {
          console.log(err);
          window.alert("Error deleting account.");
      });
    }
  };
}]);
