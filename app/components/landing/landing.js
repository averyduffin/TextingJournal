'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', '$uibModal', '$log', 'AuthenticationService', function($scope,$interval,$uibModal, $log, AuthenticationService){
	$scope.data = {};
	AuthenticationService.ClearCredentials();
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
				$uibModalInstance.close();
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		});
	};
}]);

LandingPageControllers.controller('signUpController', ['$scope', '$uibModalInstance','$location', '$rootScope', 'AuthenticationService',  function($scope, $uibModalInstance,$location, $rootScope, AuthenticationService, data){
	 $scope.ok = function () {
		 console.log($scope.name)
		 console.log($scope.phone)
		 console.log($scope.email);
		 console.log($scope.password);
		 console.log($scope.checkbox.daily);
		//$uibModalInstance.close();
		
		
	  };

	  $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	  };
}]);