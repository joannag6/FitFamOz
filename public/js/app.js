var myApp = angular.module("myApp", ["ngResource", "ngStorage", "ui.toggle"]);

// Google Login
function onLoadFunction(){
  gapi.client.setApiKey('AIzaSyBzISd-U2gq5UlNqfI6Jf4Y42YK2lC-c3E');
  gapi.client.load('plus', 'v1', function(){});
}
