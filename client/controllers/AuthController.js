angular.module('cmufit.auth', [])
.controller('AuthController', function ($scope, $http, $location) {
    $scope.user = { 'username': '', 'password': '', 'email': ''};

    /* login with given username and password, indicates error if
       bad username or password */
    $scope.login = function (user) {
      $http.post('/users/session', user).success(function(data) {
        if (data.error === 'username') {
          window.console.log("bad username");
        }
        else if (data.error === 'password') {
          window.console.log("bad password");
        }
        else {
          $location.path('/dashboard');
          $scope.clearForm_();
        }
        }).error(function(data) {
        window.console.log(data);
      });
    };

    /* change to actually logging out please <<<<< */
    $scope.logout = function () {
      $http.post('/api/logout', user).success(function(data) {
        $scope.go('/home');
        }).error(function(data) {
          window.console.log("error on logout");
      });
    };

    $scope.signup = function (user) {
      $http.post('/api/users', user).success(function(data) {
        window.console.log("registered");
        window.console.log(data);
        $scope.clearForm_();
        }).error(function(data) {
          window.console.log("duplicate key error?");
          window.console.log(data);
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


