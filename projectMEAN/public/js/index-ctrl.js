var myApp = angular.module("myApp");

myApp.controller("IndexCtrl", ["$scope", "User", function($scope, User) {
  $scope.currPage = "index";

  $scope.activities = [
    "Dog Walking",
    "Gym Workouts",
    "Ultimate Frisbee",
    "Swimming",
    "Walking",
    "Jogging",
    "Golf",
    "Surfing",
    "Football",
    "Soccer"
  ];

  $scope.bindFile = function(elem) {
    $scope.picFile = elem.files[0];
    console.log($scope.picFile);
  };

  $scope.chosenActivities = [];

  $scope.chooseActivity = function(activity) {
    var index = $scope.chosenActivities.indexOf(activity);
    if (index > -1) {
      $scope.chosenActivities.splice(index, 1);
    } else {
      $scope.chosenActivities.push(activity);
    }
  };

  $scope.newUser = {};

  $scope.signUp = function() {
    $scope.newUser.activities = $scope.chosenActivities;
    User.create($scope.newUser, function(data) {
      // console.log(data);
      window.location.href = '/matches';
    }, function(error) {
      window.alert("Error signing up.");
      console.log(error);
    });
  };

  $scope.isIndex = function() {
    return $scope.currPage == "index";
  };

  $scope.isSignUp1 = function() {
    return $scope.currPage == "signup1";
  };

  $scope.isSignUp2 = function() {
    return $scope.currPage == "signup2";
  };

  $scope.isProfilePic = function() {
    return $scope.currPage == "profilepic";
  };

  $scope.isLogIn = function() {
    return $scope.currPage == "login";
  };

  $scope.isAbout = function() {
    return $scope.currPage == "about";
  };

  $scope.nextPage = function() {
    if ($scope.currPage == "index") {
      $scope.currPage = "signup1";
    } else if ($scope.currPage == "signup1") {
      $scope.currPage = "signup2";
    } else if ($scope.currPage == "signup2") {
      $scope.currPage = "profilepic";
    }
  };

  $scope.prevPage = function() {
    if ($scope.currPage == "signup1") {
      $scope.currPage = "index";
    } else if ($scope.currPage == "signup2") {
      $scope.currPage = "signup1";
    } else if ($scope.currPage == "profilepic") {
      $scope.currPage = "signup2";
    } else {
      $scope.currPage = "index";
    }
  };

  $scope.loginPage = function() {
    $scope.currPage = "login";
  };

  $scope.aboutPage = function() {
    $scope.currPage = "about";
  }

  $scope.indexPage = function() {
    $scope.currPage = "index";
  }

}]);
