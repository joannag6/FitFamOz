var myApp = angular.module("myApp");

myApp.factory("User", ["$resource", "$http", function($resource, $http) {
  return $resource("/api/:id", { id: "@_id" },
    {
      'create':  { method: 'POST' },
      'index':   { method: 'GET', isArray: true },
      'show':    { method: 'GET', isArray: false },
      'update':  { method: 'PUT' },
      'destroy': { method: 'DELETE' }
    }
  );
}]);
