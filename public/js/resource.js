var myApp = angular.module("myApp");

myApp.factory("User", ["$resource", "$http", function($resource, $http) {
  return $resource("/api/:id", { id: "@_id" },
    {
      'create': { method: 'POST' },
      'showAll': { method: 'GET', isArray: true, cache: true },
      'showOne': { method: 'GET', isArray: false },
      'update': { method: 'PUT' },
      'delete': { method: 'DELETE' }
    }
  );
}]);

myApp.factory("Conversation", ["$resource", "$http", function($resource, $http) {
    return $resource("/api/chat/:user1&:user2", { user1: "@user1", user2: "@user2" },
        {
            'create': { method: 'POST' },
            'showChat': { method: 'GET', isArray: false },
            'update': { method: 'PUT' }
        }
    );
}]);
