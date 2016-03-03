/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page1Controllers = angular.module('page1Controllers', []);

page1Controllers.controller('page1Controller', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Users', function($scope, $rootScope, $location, AuthenticationService, $routeParams, Users){
	console.log($routeParams.id);
	//console.log($rootScope.globals);
	
	$scope.user = new Users();
	$scope.user.$get({id: $rootScope.globals.currentUser.id}, function(data){
		console.log(data);
	},
	function(err){
		console.error(err);
	});
	$scope.title = "Example Page";
	$scope.paragraph = "Try to create your own page";
	
	$scope.signOut = function(){
		AuthenticationService.ClearCredentials();
		$location.path( "/" );
	}
}]);