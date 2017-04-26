var myApp = angular.module('myApp', []);
myApp.controller('ViewCtrl', function($scope) {
  $scope.showMe = false;
  $scope.viewProfile = function () {
    $scope.showMe = !$scope.showMe;
  }
}
