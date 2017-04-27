var myApp = angular.module("myApp");

myApp.controller("MyProfileCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.editMode = false;

  $scope.activityLevels = ["High", "Low", "Medium"];

  $scope.myActivities = [
    {"name": "Swimming", "level": "High"},
    {"name": "Dog Walking", "level": "Low"},
    {"name": "Jogging", "level": "High"},
    {"name": "Weight Lifting", "level": "Medium"}
  ];

  $scope.toggleEditMode = function() {
    $scope.editMode = !$scope.editMode;
  }
}]);
