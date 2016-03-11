'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', '$uibModal', '$log', 'AuthenticationService', 'Users',  '$anchorScroll', '$location', function($scope,$interval,$uibModal, $log, AuthenticationService, Users, $anchorScroll, $location){
	$scope.data = {};
	AuthenticationService.ClearCredentials();
	$scope.user = new Users();
	$scope.signinPress = function (size) {

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'app/components/popups/signIn.html',
		  controller: 'signInController',
		  size: size,
		  resolve: {
			data: function () {
			  return $scope.data;
			}
		  
		  }
		});
		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
	};
	
	
	$scope.gotoAbout = function(){
		$location.hash('about');
		$anchorScroll();
	}
	
	$scope.start = function (size) {
		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'app/components/popups/signUp.html',
		  controller: 'signUpController',
		  scope: $scope,
		  size: size,
		  resolve: {
			data: function () {
			  return $scope.data;
			}
		  
		  }
		});
		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.user.checkbox = {}
	
}]);

LandingPageControllers.controller('signInController' , ['$scope', '$uibModalInstance', '$location', '$rootScope', 'AuthenticationService','Base64' , function($scope, $uibModalInstance,$location, $rootScope, AuthenticationService,Base64, data){
	// reset login status
	AuthenticationService.ClearCredentials();
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		//$uibModalInstance.close("TEST");
	};

	$scope.ok = function () {
		$scope.dataLoading = true;
		$scope.username = "+1" + $scope.data.username;
		var encryptedPassword = Base64.encode($scope.username + ':' + $scope.data.password);
		AuthenticationService.Login($scope.username, encryptedPassword, function(response) {
			if(response.success) {
				AuthenticationService.SetCredentials($scope.username, $scope.data.password, response.id, response.backgroundpic, response.profilepic, response.fullname, response.about);
				$uibModalInstance.close();
				$location.path('/journal/' + response.id);
				
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		});
	};
	
	
}]);

LandingPageControllers.controller('signUpController', ['$scope', '$uibModalInstance','$location', '$rootScope', 'AuthenticationService', 'Base64', 'Authenticate', 'CheckPhone',  function($scope, $uibModalInstance,$location, $rootScope, AuthenticationService, Base64, Authenticate,CheckPhone,data){
		$scope.user.repassword = "";
	  $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	  };
	  
	  $scope.matchPasswords = function(){
		  //This handles the case when we first enter the form The error text wont appear
		  if($scope.user.repassword == "")
		  {
			  return;
		  }
		  if($scope.user.prepassword != $scope.user.repassword){
			  $scope.hasError = true;
			  $scope.signUp.repassword.$setValidity("pwmatch", false);
		  }
		  else{
			  $scope.signUp.repassword.$setValidity("pwmatch", true);
		  }
	  }
	$scope.completeSignUp = function(){
		$scope.user.username = "+1" + $scope.user.phone;
		if($scope.user.checkbox.daily) $scope.user.questionFrequency = "daily";
		else if($scope.user.checkbox.weekly) $scope.user.questionFrequency = "weekly";
		else if($scope.user.checkbox.monthly) $scope.user.questionFrequency = "monthly";
		else $scope.user.questionFrequency = "daily";
		$scope.user.password = Base64.encode($scope.user.username + ':' + $scope.user.prepassword);
		$scope.user.timezone = new Date().toLocaleString();
		
		
		var checkPhone = new CheckPhone();
		checkPhone.phonenumber = $scope.user.phone;
		checkPhone.$save(function(data){
			if(data.count == 0){
				var username = $scope.user.username;
				var encryptedpassword = $scope.user.password;
				var password = $scope.user.prepassword;
				$scope.user.$save(function(data){
						AuthenticationService.Login(username, encryptedpassword, function(response) {
							console.log(response);
							if(response.success) {
								AuthenticationService.SetCredentials(username, password, response.id, response.backgroundpic, response.profilepic, response.fullname, response.about);
								$uibModalInstance.close();
								$location.path('/journal/' + response.id);
							} else {
								$scope.error = response.message;
								$scope.dataLoading = false;
							}
						});
					}, function(err){
						console.error(err);
					});
				  }
			else{
				console.log("Already someone with that phone number in system");
			}
		});
	}
		
		
}]);