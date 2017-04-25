var myApp = angular.module("myApp",[]);

myApp.controller("IndexCtrl", ["$scope", "$http", function($scope, $http) {
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

  $scope.newUser = {};

  $scope.signUp = function() {
    $http.post('/api', $scope.newUser)
                .then(function(data) {
                    $scope.formData = {};
                    console.log(data);
                    window.location.href = '/matches';
                }, function(error) {
                    console.log('Error: ' + error);
                });
  }

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
