'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', function($scope,$interval){
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
	
	//presentation
	$scope.bubbleText1 = false;
	$scope.bubbleText2 = false;
	var stop;
	$scope.startPresenting = function(){
		if ( angular.isDefined(stop) ) return;
		stop = $interval($scope.present, 1000, 1);
	}
	$scope.present = function(){
		$scope.bubbleText1 = true;
		 $interval(function(){
			 $scope.bubbleText2 = true;
		 }, 3000, 1);
	}
	$scope.stopPresenting = function(){
		if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            stop = undefined;
          }
	}
	$scope.startPresenting();
}]);