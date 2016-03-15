/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var profileControllers = angular.module('profileControllers', []);

profileControllers.controller('profileController', ['$scope', '$rootScope', '$location', 'AuthenticationService', '$routeParams', 'Entries', 'Users', 'fileUpload', 'Upload', '$timeout', function($scope, $rootScope, $location, AuthenticationService, $routeParams, Entries, Users, fileUpload, Upload, $timeout){
	if($rootScope.globals.currentUser.id == undefined){
		AuthenticationService.ClearCredentials();
		$location.path( "/" );
	}
	
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
			$scope.users.username = "+1" + $scope.users.phonenumber;
			$scope.users.$save({id: $rootScope.globals.currentUser.id},function(data){
					
					$scope.users = data
					AuthenticationService.SetCredentials($scope.users.username, $scope.users.password, $scope.users.id, $scope.users.backgroundpic, $scope.users.profilepic, $scope.users.fullname, $scope.users.about);
					console.log("Completed Upload!")
				});
	}
	
	$scope.uploadPic = function(file) {
		file.upload = Upload.upload({
		  url: 'http://www.textingjournal.com/api/index.php/uploadPhoto',
		  data: {folder: "prof", file: file},
		});

		file.upload.then(function (response) {
		  $timeout(function () {
			  console.log(response.data[0].url);
			  $scope.users.profilepic = response.data[0].url;
			file.result = response.data;
			
		  });
		}, function (response) {
			//console.log(response.data[0].url);
		  if (response.status > 0)
			$scope.errorMsg = response.status + ': ' + response.data;
		}, function (evt) {
		  // Math.min is to fix IE which reports 200% sometimes
		  file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		});
    }
  
}]);