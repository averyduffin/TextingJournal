'use strict';

var directives = angular.module('directives', []);

directives.directive('textBubble', function() {
    return{
        restrict: 'E',
        replace: true,
        scope: {
            text: '=',
			source: '='
        },
        templateUrl: 'app/shared/directives/textBubbles.html',
        link: function(scope, element, attr, basectrl){

        },
        controller: 'directiveExampleController',
    }
});

/**
 * This is the widget controller for directive Example
 */
directives.controller('textBubbleController', ['$scope', function($scope){
	
}]);
