/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page1Controllers = angular.module('page1Controllers', []);

page1Controllers.controller('page1Controller', ['$scope', '$location', function($scope, $location){
	$scope.title = "Example Page";
	$scope.paragraph = "Try to create your own page";
	
	$scope.signOut = function(){
		$location.path( "/" );
	}
	
}]);