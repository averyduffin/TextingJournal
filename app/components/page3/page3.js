/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page3Controllers = angular.module('page3Controllers', []);

page3Controllers.controller('page3Controller', ['$scope', 'exampleService', function($scope, exampleService){
	$scope.title = "Services Examples";
	$scope.paragraph = "This is a demo page for how to create and use services";
	
	$scope.directiveText = ['Directive 1','Directive 2', 'Directive 3', 'Directive 4']
	
	var serve = exampleService.query();
	serve.$promise.then(function(data){
		console.log(data);
        $scope.data = data;
    });
}]);