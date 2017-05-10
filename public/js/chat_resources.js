/**
 * Created by Nam Nguyen on 2/05/2017.
 */
var myApp = angular.module("myApp");

myApp.factory("Conversation", ["$resource", "$http", function($resource, $http) {
    return $resource("/api/chat/:user1&:user2", { user1: "@user1", user2: "@user2" },
        {
            'create': { method: 'POST' },
            'showChat': { method: 'GET', isArray: false },
            'update': { method: 'PUT' }
        }
    );
}]);