var myApp = angular.module("myApp");

myApp.controller("IndexCtrl", ["$scope", "User", function($scope, User) {

  $scope.newUser = {};

  /********************** HANDLE LOGIN VIA FB **********************/

  (function(d){
  var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
  js = d.createElement('script'); js.id = id; js.async = true;
  js.src = "//connect.facebook.net/en_US/all.js";
  d.getElementsByTagName('head')[0].appendChild(js);
  }(document));

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
      $scope.getData();
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log("not logged in");
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  $scope.checkLoginState = function() {
    FB.getLoginStatus(function(response) {
      $scope.statusChangeCallback(response);
    });
  };

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

  $scope.FBLoginUser = function() {
    FB.login(function(response){
      $scope.checkLoginState();
    });
  };

  $scope.needFBLogIn = function() {
    return angular.equals($scope.newUser, {});
  };

  // Get user data from FB profile. (Only can get publically available info)
  $scope.getData = function() {
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
          $scope.$apply();
        }
      );
    });
  };

  /***********************HANDLE GOOGLE LOGIN***********************/

  // Functions moved to navbar-ctrl.js

  /*****************************************************************/
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

  $scope.levels = ["Low", "Medium", "High"];

  $scope.chosenActivities = [];

  // adds or removes activities from chosenActivities array
  $scope.chooseActivity = function(activity) {
        var index;
        for (index=0; index < $scope.chosenActivities.length; index++) {
          // checks if activity object already exists in array
          if ($scope.chosenActivities[index].name === activity) {
            $scope.chosenActivities.splice(index, 1);
            console.log("REMOVED ACTIVITY");
            return $scope.chosenActivities;
          }
        }
        $scope.chosenActivities.push({name: activity, level: 'Low'});
        console.log("ADDED ACTIVITY");
  };

  // assign level to activity in array of objects
  $scope.assignLevel = function(activity, level) {
    var i;
    for (i=0; i < $scope.chosenActivities.length; i++) {
      if ($scope.chosenActivities[i].name === activity) {
        $scope.chosenActivities[i].level = level;
        console.log("ADDED SKILL LEVEL TO ");
        console.log($scope.chosenActivities[i]);
        return $scope.chosenActivities;
      }
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
      console.log(data);
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
    if ($scope.currPage == "index" || $scope.currPage == "login") {
      $scope.currPage = "signup1";
    } else if ($scope.currPage == "signup1") {
      if ($scope.chosenActivities.length < 1) {
        window.alert("Have to select at least one activity.");
      } else {
        $scope.currPage = "signup2";
      }
    } else if ($scope.currPage == "signup2") {
      if (!signupform.checkValidity()) {
        window.alert("Have to fill up every field with valid inputs.");
      } else {
        $scope.currPage = "profilepic";
      }
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
