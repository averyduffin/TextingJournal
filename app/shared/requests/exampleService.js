/**
 * Created by DuffinAM on 9/23/2015.
 */
'use strict';

var exampleServices = angular.module('exampleServices', ['ngResource']);
/**
 * Request used to RESTfully interact with cctv_config
 */
exampleServices.factory('exampleService', ['$resource',
    function($resource){
        return $resource('https://api.github.com/users/mralexgray/repos', {}, {
            query: {method:'GET', isArray:true},
        });
    }]);