/**
 * Created by Nam Nguyen on 28/04/2017.
 */
var myApp = angular.module("myApp");

myApp.controller("MessageCtrl", ["$scope", "User", function($scope, User) {
    $scope.editMode = false;

    $scope.activityLevels = ["High", "Low", "Medium"];

    $scope.myActivities = [
        {"name": "Swimming", "level": "High"},
        {"name": "Dog Walking", "level": "Low"},
        {"name": "Jogging", "level": "High"},
        {"name": "Weight Lifting", "level": "Medium"}
    ];

    $scope.thisUser = {"firstName": "John", "lastName": "Smith", "aboutMe": "Hi, I'm looking for a cool gym partner."};

    $scope.toggleEditMode = function() {
        $scope.editMode = !$scope.editMode;
    };

    $scope.saveChanges = function() {
        $scope.toggleEditMode();
        // figure out how to put in ID
        //   User.update($scope.thisUser, function(data) {
        //     // console.log(data);
        //     $scope.editMode = !$scope.editMode;
        //   }, function(error) {
        //     console.log(error);
        //   })
    };
}]);