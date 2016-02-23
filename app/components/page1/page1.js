/**
 * Created by DuffinAM on 10/7/2015.
 */
'use strict';

/* Controllers */

var page1Controllers = angular.module('page1Controllers', []);

page1Controllers.controller('page1Controller', ['$scope', function($scope){
	$scope.title = "Example Page";
	$scope.paragraph = "Try to create your own page";
}]);