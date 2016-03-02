'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'LandingPageControllers',
  'page1Controllers',
  'page2Controllers',
  'page3Controllers',
  'directiveExamples',
  'directives',
  'ngAnimate',
  'scroll-animate-directive',
  'ui.bootstrap',
  'authenticationServices',
  'ngCookies',
  'phonefilters',
  'formRequiredDirectives',
  'databaseServices'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
        templateUrl: 'app/components/landing/landing.html',
        controller: 'landingPageController'
      }).
      when('/journal/:id', {
        templateUrl: 'app/components/journalPage/journalPage.html',
        controller: 'page1Controller'
      }).
      otherwise({redirectTo: '/landing'});
}])
.run(['$rootScope', '$location', '$cookieStore', '$http', '$animate', function ($rootScope, $location, $cookieStore, $http, $animate) {
  $animate.enabled(true);
  
  // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/landing' && !$rootScope.globals.currentUser) {
                $location.path('/landing');
            }
        });
}]);
