var myApp = angular.module("myApp");

myApp.controller("IndexCtrl", ["$scope", "User", function($scope, User) {

  $scope.newUser = {};

  // This is called with the results from from FB.getLoginStatus().
  $scope.statusChangeCallback = function(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log(response);
      $scope.newUser.authResp = response.authResponse;
      $scope.testAPI();
    } else {
      // The person is not logged into your app or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      $scope.statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '1249707755145859',
    cookie     : true,  // enable cookies to allow the server to access
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.8' // use graph api version 2.8
  });

  FB.getLoginStatus(function(response) {
    $scope.statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  $scope.testAPI = function() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', {fields: ['first_name', 'last_name', 'birthday']},
        function(response) {
      console.log('Successful login for: ' + response.first_name);
      console.log(response);
      $scope.newUser.first_name = response.first_name;
      $scope.newUser.last_name = response.last_name;
      $scope.newUser.birthday = response.birthday;

      FB.api("/" + response.id + "/picture?height=520&width=520",
        function (response) {
          if (response && !response.error) {
            console.log(response);
            $scope.newUser.picUrl = response.data.url;
            console.log($scope.newUser.picUrl);
          }
        }
      );
    });
  }

  $scope.currPage = "index";

  $scope.activities = [
    "Dog Walking",
    "Gym Workouts",
    "Ultimate Frisbee",
    "Swimming",
    "Walking",
    "Jogging",
    "Golf",
    "Surfing",
    "Football",
    "Soccer"
  ];

  $scope.chosenActivities = [];

  $scope.chooseActivity = function(activity) {
    var index = $scope.chosenActivities.indexOf(activity);
    if (index > -1) {
      $scope.chosenActivities.splice(index, 1);
    } else {
      $scope.chosenActivities.push(activity);
    }
  };

  $scope.gotPic = function() {
    return $scope.newUser.picFile || $scope.newUser.picUrl;
  }

  $scope.signUp = function() {
    $scope.newUser.activities = $scope.chosenActivities;
    $scope.newUser.friends = [];

    console.log("SIGNING UP");
    console.log($scope.newUser);
    User.create($scope.newUser, function(data) {
      // console.log(data);
      window.location.href = '/matches';
    }, function(error) {
      window.alert("Error signing up.");
      console.log(error);
    });
  };

  $scope.isIndex = function() {
    return $scope.currPage == "index";
  };

  $scope.isSignUp1 = function() {
    return $scope.currPage == "signup1";
  };

  $scope.isSignUp2 = function() {
    return $scope.currPage == "signup2";
  };

  $scope.isProfilePic = function() {
    return $scope.currPage == "profilepic";
  };

  $scope.isLogIn = function() {
    return $scope.currPage == "login";
  };

  $scope.isAbout = function() {
    return $scope.currPage == "about";
  };

  $scope.nextPage = function() {
    if ($scope.currPage == "index") {
      $scope.currPage = "signup1";
    } else if ($scope.currPage == "signup1") {
      $scope.currPage = "signup2";
    } else if ($scope.currPage == "signup2") {
      $scope.currPage = "profilepic";
    }
  };

  $scope.prevPage = function() {
    if ($scope.currPage == "signup1") {
      $scope.currPage = "index";
    } else if ($scope.currPage == "signup2") {
      $scope.currPage = "signup1";
    } else if ($scope.currPage == "profilepic") {
      $scope.currPage = "signup2";
    } else {
      $scope.currPage = "index";
    }
  };

  $scope.loginPage = function() {
    $scope.currPage = "login";
  };

  $scope.aboutPage = function() {
    $scope.currPage = "about";
  }

  $scope.indexPage = function() {
    $scope.currPage = "index";
  }

}]);
