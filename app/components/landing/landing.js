'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope', function($scope){
	$scope.displayForm = false;
	
	$scope.start = function(){
		$scope.displayForm = true;
	}
	$scope.close = function(){
		$scope.displayForm = false;
		$scope.displaySignIn = false;
	}
	
	$scope.displaySignIn = false;
	$scope.signinPress = function(){
		console.log("WORKED")
		$scope.displaySignIn = true;
	}
}]);