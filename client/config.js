/* cmufit is the name of our ng-app as in index.html */
/* cmufit.templates is the module name as declared in the grunt file */
angular.module('cmufit', ['cmufit.templates', 'cmufit.auth'])
  .config(function($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/home', {templateUrl: '../client/templates/home.html'}).
      when('/dashboard', {templateUrl: '../client/templates/dashboard.html'}).
      when('/login', {controller:'AuthController', templateUrl: '../client/templates/login.html'}).
      when('/signup', {controller: 'AuthController', templateUrl: '../client/templates/signup.html'}). //dashboard page
      otherwise({redirectTo: '/home'});
  })
});