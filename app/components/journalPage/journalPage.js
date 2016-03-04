/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page1Controllers = angular.module('page1Controllers', []);

page1Controllers.controller('page1Controller', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Entries', function($scope, $rootScope, $location, AuthenticationService, $routeParams, Entries){
	//console.log($rootScope.globals);
	$scope.hasNoEntries = true;
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
	var currdate = new Date()
	var pastdate = new Date();
	pastdate.setDate(new Date().getDate()- 10)

	$scope.entries.beforeDate = String(currdate.getFullYear()) + String(("0" + (currdate.getMonth() + 1)).slice(-2)) + String(("0" + currdate.getDate()).slice(-2));
	$scope.entries.afterDate = String(pastdate.getFullYear()) + String(("0" + (pastdate.getMonth() + 1)).slice(-2)) + String(("0" + pastdate.getDate()).slice(-2));

	$scope.entries.$post({id:$rootScope.globals.currentUser.id}, function(data){
		if(data.entries.length == 0){
			$scope.hasNoEntries = true;
		}else{
			$scope.hasNoEntries = false;
			$scope.entries = data.entries;
			
		}
		
	},
	function(err){
		console.error(err);
	});
	
	$scope.signOut = function(){
		AuthenticationService.ClearCredentials();
		$location.path( "/" );
	}
}]);