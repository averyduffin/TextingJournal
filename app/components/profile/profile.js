/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('profileController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Entries', 'Users', function($scope, $rootScope, $location, AuthenticationService, $routeParams, Entries, Users){
	$scope.signOut = function(){
		AuthenticationService.ClearCredentials();
		$location.path( "/" );
	}
	
	$scope.journal = function(){
		$location.path( "/journal/" + $rootScope.globals.currentUser.id );
	}
	
	$scope.profile = function(){
		$location.path( "/profile" );
	}

	$scope.users = new Users();
	$scope.users.$get({id: $rootScope.globals.currentUser.id}, function(data){
		console.log(data)
		$scope.users=data;
	})
	$scope.model = {
		name: 'Tabs'
	};
	
	
  
}]);