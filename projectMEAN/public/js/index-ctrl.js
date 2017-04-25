var myApp = angular.module('myApp',[]);

myApp.controller('indexCtrl', ['$scope', function($scope) {
  $scope.currPage = 'index';

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

  $scope.isIndex = function() {
    return $scope.currPage == 'index';
  };

  $scope.isSignUp1 = function() {
    return $scope.currPage == 'signup1';
  };

  $scope.isSignUp2 = function() {
    return $scope.currPage == 'signup2';
  };

  $scope.isLogIn = function() {
    return $scope.currPage == 'login';
  };

  $scope.isAbout = function() {
    return $scope.currPage == 'about';
  };

  $scope.nextPage = function() {
    if ($scope.currPage == 'index') {
      $scope.currPage = 'signup1';
    } else if ($scope.currPage == 'signup1') {
      $scope.currPage = 'signup2';
    }
  };

  $scope.prevPage = function() {
    if ($scope.currPage == 'signup1') {
      $scope.currPage = 'index';
    } else if ($scope.currPage == 'signup2') {
      $scope.currPage = 'signup1';
    } else {
      $scope.currPage = 'index';
    }
  };

  $scope.loginPage = function() {
    $scope.currPage = 'login';
  };

  $scope.aboutPage = function() {
    $scope.currPage = 'about';
  }

  $scope.indexPage = function() {
    $scope.currPage = 'index';
  }

}]);
