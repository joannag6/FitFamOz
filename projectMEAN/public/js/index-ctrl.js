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

  $scope.levels = ["Low", "Medium", "High"];

  $scope.chosenActivities = [];

// adds or removes activities from chosenActivities array
/*  $scope.chooseActivity = function(activity) {
    var index = $scope.chosenActivities.indexOf(activity);
    if (index > -1) { //removes activity
      $scope.chosenActivities.splice(index, 1);
    } else { //adds activity
      $scope.chosenActivities.push(activity);
    }
  };  */

  // adds or removes activities from chosenActivities array
    $scope.chooseActivity = function(activity, skill_level) {
      console.log("CHANGEDSOMETHING");
      var index;
      for (index=0; index < $scope.chosenActivities.length; index++) {
        // checks if activity object already exists in array
        if ($scope.chosenActivities[index].name === activity) {
          $scope.chosenActivities.splice(index, 1);
          return $scope.chosenActivities;
        }
      }
      $scope.chosenActivities.push({name: activity, level: skill_level});
    };

  // creates newUser object for new user
  $scope.newUser = {};

  $scope.signUp = function() {
    $scope.newUser.activities = $scope.chosenActivities;
    User.create($scope.newUser, function(data) {
      // console.log(data);
      window.location.href = '/matches';
    }, function(error) {
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
    }
  };

  $scope.prevPage = function() {
    if ($scope.currPage == "signup1") {
      $scope.currPage = "index";
    } else if ($scope.currPage == "signup2") {
      $scope.currPage = "signup1";
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
