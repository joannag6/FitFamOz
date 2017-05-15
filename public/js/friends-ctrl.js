var myApp = angular.module("myApp");

myApp.controller("FriendsCtrl", ["$scope", "User", function($scope, User) {
  // This is called with the results from from FB.getLoginStatus().
  $scope.statusChangeCallback = function(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      console.log(response);
      $scope.currAuth = response.authResponse;
      $scope.getCurrUser();
    } else {
      // The person is not logged into your app or we are unable to tell.
      console.log('Please log into this app.');
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

  $scope.getCurrUser = function() {
    User.showOne({ id: $scope.currAuth.userID }, function(data) {
      $scope.currUser = data;
      if ($scope.currUser.friends.length > 0) {
        User.showMatches(
          { id: $scope.currUser._id },
          { idList: $scope.currUser.friends },
          function(data) {
            $scope.friends = data;
            $scope.friends.forEach(function(f) {
              f.fullName = f.firstName + f.lastName;
            })
            $scope.filteredFriends = angular.copy($scope.friends); // deep copy

            $scope.totalPages = Math.ceil($scope.friends.length/$scope.pageSize);
            $scope.pagedData = $scope.friends;
          }, function(err) {
            console.log(err);
          });
      }
    }, function(err) {
      console.log(err);
    });
  };

  $scope.removeFriend = function(user) {
    if (!window.confirm("Are you sure you want to remove "+ user.firstName + " as a friend?")) {
      return;
    }
    var friends = $scope.friends;
    for (var i=0; i<friends.length; i++) {
      if (friends[i]._id == user._id) {
        friends.splice(i, 1);
        friends.filter(a => a._id);
        $scope.currUser.friends = friends;

        User.update(
          { id: $scope.currUser._id },
          $scope.currUser,
          function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
            window.alert("Error removing friend");
        });
      }
    }
  };

  //Client-side pagination example
  $scope.currentPage = 0;
  $scope.pageSize = 3;
  $scope.totalPages = 0;
  $scope.pagedData = [];

  $scope.pageButtonDisabled = function(dir) {
    if (dir == -1) {
      return $scope.currentPage == 0;
    }
    return $scope.currentPage >=
           $scope.filteredFriends.length/$scope.pageSize - 1;
  };

  $scope.paginate = function(nextPrevMultiplier) {
    $scope.currentPage += (nextPrevMultiplier * 1);
    $scope.pagedData = $scope.filteredFriends
      .slice($scope.currentPage*$scope.pageSize,
             $scope.currentPage*$scope.pageSize + $scope.pageSize);
  };

  $scope.activityFilters = [ {name: '', level: ''} ];

  $scope.addActivityFilterName = function(i, name) {
    $scope.activityFilters[i].name = name;
    $scope.filterActivities();
  };

  $scope.addActivityFilterLevel = function(i, level) {
    $scope.activityFilters[i].level = level;
    $scope.filterActivities();
  };

  $scope.addActivityFilter = function() {
    $scope.activityFilters.push({name: '', level: '' });
  };

  $scope.delActivityFilter = function(i) {
    if ($scope.activityFilters.length == 1) {
      $scope.activityFilters[0] = {name: '', level: '' };
    } else {
      $scope.activityFilters.splice(i, 1);
    }
    $scope.filterActivities();
  };

  $scope.filterActivities = function() {
    var index = 0;
    $scope.filteredFriends = angular.copy($scope.friends); // deep copy
    $scope.friends.forEach(function (friend) {
        // for each activity filter, if not in there, remove from out
        var found = false;
        $scope.activityFilters.forEach(function(filter) {
          found = false;
          if (!filter.name) {
            // ignore this filter
            return;
          }
          friend.activities.forEach(function(activity) {
            if (activity.name.toLowerCase()
                .includes(filter.name.toLowerCase())) {
              if (!filter.level || activity.level === filter.level) {
                found = true;
                return;
              }
            }
          });
          // at least one filter was not found.
          if (!found) {
            $scope.filteredFriends.splice(index, 1);
            return;
          }
        });
        if (found) {
          index += 1; // increase index
        }
    });
    // Refresh pagination
    $scope.paginate(0);
  };
}]);
