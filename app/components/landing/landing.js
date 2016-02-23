'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope', function($scope){
	$scope.displayForm = false;
	
	$scope.start = function(){
		$scope.displayForm = true;
	}
}]);