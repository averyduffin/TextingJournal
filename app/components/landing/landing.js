'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', '$uibModal', '$log', 'AuthenticationService', function($scope,$interval,$uibModal, $log, AuthenticationService){
	
	$scope.signinPress = function (size) {

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'app/components/popups/signIn.html',
		  controller: 'signInController',
		  size: size,
		  resolve: {
			phone: function () {
			  return $scope.phone;
			}
		  }
		});
		modalInstance.result.then(function (selectedItem) {
		  $scope.selected = selectedItem;
		}, function () {
		  $log.info('Modal dismissed at: ' + new Date());
		});
	};
	$scope.data = {};
	$scope.start = function (size) {

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'app/components/popups/signUp.html',
		  controller: 'signUpController',
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
	$scope.data = data;
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
				$location.path('/journal');
				$uibModalInstance.close();
			} else {
				$scope.error = response.message;
				$scope.dataLoading = false;
			}
		});
	};
}]);

LandingPageControllers.controller('signUpController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance, phone){
	$scope.phone = phone;
	 $scope.ok = function () {
		$uibModalInstance.close("TEST");
	  };

	  $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	  };
}]);