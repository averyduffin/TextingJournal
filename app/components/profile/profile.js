/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('profileController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Entries', 'Users', 'fileUpload' , function($scope, $rootScope, $location, AuthenticationService, $routeParams, Entries, Users, fileUpload){
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
		$scope.users=data;
	})
	$scope.model = {
		name: 'Tabs'
	};
	
	$scope.update = function(){
			
			$scope.users.$save({id: $rootScope.globals.currentUser.id},function(data){
					
					$scope.users = data
					AuthenticationService.SetCredentials($scope.users.username, $scope.users.password, $scope.users.id, $scope.users.backgroundpic, $scope.users.profilepic, $scope.users.fullname, $scope.users.about);
					console.log("Completed Upload!")
				});
	}
	
	
	$scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' );
        console.dir(file);
        var uploadUrl = "/fileUpload";
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
  
}]);