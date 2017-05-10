var myApp = angular.module("myApp");

myApp.controller("MatchesCtrl", ["$scope", "User", function($scope, User) {
  User.showAll(function(data) {
      $scope.users = data;
    }, function(err) {
      console.log(err);
  });
}]);
