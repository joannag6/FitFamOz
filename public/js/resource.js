var myApp = angular.module("myApp");

myApp.factory("User", ["$resource", "$http", function($resource, $http) {
  return $resource("/user/:id", { id: "@_id" },
    {
      'create': { method: 'POST' },
      'showAll': { method: 'GET', isArray: true, cache: true },
      'showOne': { method: 'GET', isArray: false },
      'showMatches': { method: 'POST', isArray: true, cache: true },
      'update': { method: 'PUT' },
      'delete': { method: 'DELETE' }
    }
  );
}]);

myApp.factory("Chat", ["$resource", "$http", function($resource, $http) {
    var main_url = "/chat/";
    var params = {};
    return $resource(main_url, params,
        {
            'create': { method: 'POST'},
            'showChat': {
                method: 'GET',
                isArray: false,
                url: "/chat/:user1/:user2",
                params: {
                    user1: "@user1",
                    user2: "@user2"
                }
            },
            'update': {
                method: 'PUT',
                isArray: false,
                url: "/chat/:user1/:user2",
                params: {
                    user1: "@user1",
                    user2: "@user2"
                }
        }
    }
    );
}]);
