'use strict';

/* Controllers */

var LandingPageControllers = angular.module('LandingPageControllers', []);

LandingPageControllers.controller('landingPageController', ['$scope',  '$interval', '$uibModal', '$log', function($scope,$interval,$uibModal, $log){
	
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
	
	$scope.start = function (size) {

		var modalInstance = $uibModal.open({
		  animation: true,
		  templateUrl: 'app/components/popups/signUp.html',
		  controller: 'signUpController',
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
	
}]);

LandingPageControllers.controller('signInController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance, phone){
	$scope.phone = phone;
	 $scope.ok = function () {
		$uibModalInstance.close("TEST");
	  };

	  $scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
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