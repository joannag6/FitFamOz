var myApp = angular.module("myApp");

myApp.controller("MatchesCtrl", function($scope, $localStorage, User) {

  // Load the FB SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $scope.statusChangeCallback = function(response) {
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $scope.getCurrUser(response.authResponse.userID);
    } else {
      // The person is not logged into your app or we are unable to tell.
      // Redirects user to login page.
      window.location.href = '/';
    }
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
      $scope.$apply();
    });
  };

  /* Function to get current user's ID. */
  $scope.getCurrUser = function(userID) {
    User.showOne({ id: userID }, function(data) {
      $scope.currUser = data;
      $scope.currUserID = $scope.currUser._id;
      $scope.friends = $scope.currUser.friends;
      $scope.getMatches();
    }, function(err) {
      console.log(err);
    });
  };

  $scope.$storage = $localStorage.$default({
    matchType: true // default to location
  });

  $scope.otherQuery = "";

  $scope.toggleMatchButton = function() {
    $scope.getMatches();
    $scope.otherQuery = "";
  }

  $scope.toggleMatch = function() {
    $scope.$storage.matchType = !$scope.$storage.matchType;
    $scope.toggleMatchButton();
  }

  $scope.getMatches = function() {
    var query = {};
    if ($scope.$storage.matchType) {
      query = {location: $scope.currUser.location};
    } else {
      query = {activities: $scope.currUser.activities};
    }
    User.showMatches({ id: $scope.currUserID }, query, function(data) {
        $scope.users = data;
        $scope.matches = angular.copy($scope.users); // deep copy

        $scope.totalPages = Math.ceil($scope.matches.length/$scope.pageSize);
        $scope.pagedData = $scope.matches;
        if ($scope.users.length == 0) {
          // No matches found
          $scope.otherQuery = $scope.$storage.matchType ? "activities" : "location";
        }

        $scope.filteredUsers = angular.copy($scope.users); // deep copy
      }, function(err) {
        console.log(err);
    });
  };

  $scope.isFriend = function(user) {
    if (!$scope.friends)
      return false;
    for (var i=0; i<$scope.friends.length; i++) {
      if ($scope.friends[i] == user._id) {
        return true;
      }
    }
    return false;
  };

  $scope.addFriend = function(user) {
    var newFriends = $scope.friends.push(user._id);
    User.update(
      { id: $scope.currUserID },
      $scope.currUser,
      function(data) {
        console.log(data);
      }, function(err) {
        console.log(err);
        window.alert("Error adding friend");
    });
  };

  $scope.removeFriend = function(user) {
    var friends = $scope.friends;
    for (var i=0; i<friends.length; i++) {
      if (friends[i] == user._id) {
        friends.splice(i, 1);
        $scope.currUser.friends = friends;

        User.update(
          { id: $scope.currUserID },
          $scope.currUser,
          function(data) {
            console.log(data);
          }, function(err) {
            console.log(err);
            window.alert("Error removing friend");
        });
        break;
      }
    }
  };

<<<<<<< HEAD
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
    $scope.filteredUsers = angular.copy($scope.users); // deep copy
    console.log($scope.filteredUsers);
    $scope.users.forEach(function (user) {
        // for each activity filter, if not in there, remove from out
        var found = false;
        $scope.activityFilters.forEach(function(filter) {
          found = false;
          if (!filter.name) {
            // ignore this filter
            return;
          }
          user.activities.forEach(function(activity) {
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
            $scope.filteredUsers.splice(index, 1);
            return;
          }
        });
        if (found) {
          index += 1; // increase index
        }
    });
    console.log($scope.filteredUsers);
  };
=======
  //Client-side pagination example
  $scope.currentPage = 0;
  $scope.pageSize = 6;
  $scope.totalPages = 0;
  $scope.pagedData = [];

  $scope.pageButtonDisabled = function(dir) {
    if (dir == -1) {
      return $scope.currentPage == 0;
    }
    return $scope.currentPage >=
           $scope.matches.length/$scope.pageSize - 1;
  };

  $scope.paginate = function(nextPrevMultiplier) {
    $scope.currentPage += (nextPrevMultiplier * 1);
    $scope.pagedData = $scope.matches
      .slice($scope.currentPage*$scope.pageSize,
             $scope.currentPage*$scope.pageSize + $scope.pageSize);
  };

>>>>>>> Friends
});
