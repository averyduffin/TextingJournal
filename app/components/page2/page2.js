/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page2Controllers = angular.module('page2Controllers', []);

page2Controllers.controller('page2Controller', ['$scope', function($scope){
	$scope.title = "Directive Examples";
	$scope.paragraph = "This is a demo page for how to create and use directives";
	
	$scope.directiveText = ['Directive 1','Directive 2', 'Directive 3', 'Directive 4']
}]);