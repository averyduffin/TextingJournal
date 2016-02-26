'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
    'LandingPageControllers',
  'page1Controllers',
  'page2Controllers',
  'page3Controllers',
  'directiveExamples',
  'exampleServices',
  'directives',
  'ngAnimate',
  'scroll-animate-directive',
  'ui.bootstrap'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/landing', {
        templateUrl: 'app/components/landing/landing.html',
        controller: 'landingPageController'
      }).
      when('/journal', {
        templateUrl: 'app/components/journalPage/journalPage.html',
        controller: 'page1Controller'
      }).
	  when('/page2', {
		  templateUrl: 'app/components/page2/page2.html',
        controller: 'page2Controller'
	  }).
	  when('/page3', {
		  templateUrl: 'app/components/page3/page3.html',
        controller: 'page3Controller'
	  }).
      otherwise({redirectTo: '/landing'});
}])
.run(function($animate) {
  $animate.enabled(true);
});
