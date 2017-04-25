var myApp = angular.module('myApp',[]);

myApp.controller('matchesCtrl', ['$scope', function($scope) {
  $scope.users = [1,2,3,4,5,6];
  $scope.friends = [1,2,3,4,5,6];
}]);
