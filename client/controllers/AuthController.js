angular.module('cmufit.auth', [])
.controller('AuthController', function ($scope, $http, $location, $window) {
    $scope.user = { 'username': '', 'password': '', 'email': ''};

    // login with given username and password
    $scope.login = function (user) {
      $http.post('/api/users/session', user).success(function(data) {
          $scope.clearForm_();
          $window.location.href = data.location;
        }).error(function(data) {
          window.console.log("error login", data);
      });
    };

    //Logout User (see header.jade)
    $scope.logout = function () {
      $http.post('/logout', {}).success(function(data) {
          $window.location.href = '/home';
        });
    };

    //On success log the user in.
    $scope.signup = function (user) {
      $http.post('/api/users', user).success(function(data) {
          $scope.clearForm_();
          $window.location.href = '/dashboard';
        }).error(function(data) {
          window.console.log("duplicate key error?", data);
      });
    };

    $scope.clearForm_ = function() {
      $scope.user.username = '';
      $scope.user.password = '';
      $scope.user.email = '';
    };

    $scope.go = function (newPath) {
      $location.path(newPath);
    };

});


