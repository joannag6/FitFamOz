var myApp = angular.module("myApp");

myApp.controller("MatchesCtrl", ["$scope", "User", function($scope, User) {
  // $scope.users = [1,2,3,4,5,6];
  $scope.users = User.query();
  // .then(
  //   function(data) {
  //     $scope.users = data;
  //     console.log(data);
  //   }, function(err) {
  //     console.log(err);
  // });

  $scope.friends = [1,2,3,4,5,6];
}]);
