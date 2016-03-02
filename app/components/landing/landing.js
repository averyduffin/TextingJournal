'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', '$uibModal', '$log', 'AuthenticationService', 'Users', function($scope,$interval,$uibModal, $log, AuthenticationService, Users){
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

LandingPageControllers.controller('signInController' , ['$scope', '$uibModalInstance', '$location', '$rootScope', 'AuthenticationService', function($scope, $uibModalInstance,$location, $rootScope, AuthenticationService, data){
	// reset login status
	AuthenticationService.ClearCredentials();
	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
		//$uibModalInstance.close("TEST");
	};

	$scope.ok = function () {
		$scope.dataLoading = true;
		console.log($scope.data);
		AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
			if(response.success) {
				AuthenticationService.SetCredentials($scope.username, $scope.password);
				$uibModalInstance.close();
				$location.path('/journal/45');
				
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		});
	};
	
	
}]);

LandingPageControllers.controller('signUpController', ['$scope', '$uibModalInstance','$location', '$rootScope', 'AuthenticationService', 'Base64', 'Authenticate',  function($scope, $uibModalInstance,$location, $rootScope, AuthenticationService, Base64, Authenticate,data){
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
		$scope.user.username = $scope.user.phone;
		if($scope.user.checkbox.daily) $scope.user.questionFrequency = "daily";
		else if($scope.user.checkbox.weekly) $scope.user.questionFrequency = "weekly";
		else if($scope.user.checkbox.monthly) $scope.user.questionFrequency = "monthly";
		else $scope.user.questionFrequency = "daily";
		$scope.user.password = Base64.encode($scope.user.username + ':' + $scope.user.prepassword);
		$scope.user.timezone = new Date().toLocaleString();
		
		
		var auth = new Authenticate();
		auth.password = $scope.user.password;
		auth.username = $scope.user.username;
		auth.$save(function(data){
			if(data.lenght > 0){
				console.log("Length was right");
				$scope.user.$save(function(data){
						AuthenticationService.Login($scope.data.username, $scope.data.password, function(response) {
							console.log(response)
							if(response.success) {
								AuthenticationService.SetCredentials($scope.username, $scope.password);
								$uibModalInstance.close();
								//$location.path('/journal/45');
								
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