/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page1Controllers = angular.module('page1Controllers', []);

page1Controllers.controller('page1Controller', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Entries', function($scope, $rootScope, $location, AuthenticationService, $routeParams, Entries){
	console.log($rootScope.globals);
	
	/*$scope.user = new Users();
	$scope.user.$get({id: $rootScope.globals.currentUser.id}, function(data){
		console.log(data);
	},
	function(err){
		console.error(err);
	});*/
	$scope.fullName = $rootScope.globals.currentUser.fullname;
	if($rootScope.globals.currentUser.backgroundURL == null){
		$scope.backgroundURL = "https://placeholdit.imgix.net/~text?txtsize=55&txt=1160%C3%97500&w=1160&h=500";
	}
	else{
		$scope.backgroundURL = $rootScope.globals.currentUser.backgroundURL;
	}
	if($rootScope.globals.currentUser.profPicURL == null){
		$scope.profURL = 'https://placeholdit.imgix.net/~text?txtsize=22&txt=150%C3%97150&w=150&h=150'
	}
	else{
		$scope.profURL = $rootScope.globals.currentUser.profPicURL;
	}
	
	$scope.entries = new Entries();
	$scope.entries.beforeDate = new Date().toLocaleString();
	$scope.entries.afterDate = new Date().toLocaleString(); //This still needs to be implimented
	$scope.entries.$get({id: $rootScope.globals.currentUser.id}, function(data){
		console.log(data);
	},
	function(err){
		console.error(err);
	});
	
	$scope.signOut = function(){
		AuthenticationService.ClearCredentials();
		$location.path( "/" );
	}
}]);