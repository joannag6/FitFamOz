var myApp = angular.module("myApp",[]);

myApp.controller("MyProfileCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.editMode = false;

  $scope.myActivities = ["Swimming", "Dog Walking", "Jogging", "Weight Lifting"];

  $scope.toggleEditMode = function() {
    $scope.editMode = !$scope.editMode;
  }
}]);
