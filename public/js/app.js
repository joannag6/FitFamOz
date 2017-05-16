var myApp = angular.module("myApp", ["ngResource", "ngStorage", "ui.toggle"]);

// Google Login
function onLoadFunction(){
  gapi.client.setApiKey('AIzaSyBzISd-U2gq5UlNqfI6Jf4Y42YK2lC-c3E');
  gapi.client.load('plus', 'v1', function(){});
}

function start(){
  gapi.load('auth2', function(){
    auth2 = gapi.auth2.init({
      client_id: '1003741852857-k6metff6h6978bmjked4od77cdc577bc.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.profile'
    })
  })
}

$('#GoogleLogin').click(function(){
  auth2.grantOfflieAccess().then(signInCallback);
})

function signInCallback(authResult){
  if (authResult['code']){
    $('#GoogleLogin').attr('style', 'display: none');

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/storeauthcode',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      contentType: 'application/octet-stream; charset=utf-8',
      success: function(result){

      },
      processData: false,
      data: authResult['code']
    });
  } else{

  }
}

function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  //console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
