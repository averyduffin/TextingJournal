'use strict';

var directiveExamples = angular.module('directiveExamples', []);

directiveExamples.directive('directiveExample', function() {
    return{
        restrict: 'E',
        replace: true,
        scope: {
            text: '=',
        },
        templateUrl: 'app/shared/directiveExample/directiveExample.html',
        link: function(scope, element, attr, basectrl){

        },
        controller: 'directiveExampleController',
    }
});

/**
 * This is the widget controller for directive Example
 */
directiveExamples.controller('directiveExampleController', ['$scope', function($scope){
	
}]);
