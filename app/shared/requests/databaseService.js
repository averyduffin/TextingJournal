/**
 * Created by DuffinAM on 9/23/2015.
 */
'use strict';

var databaseServices = angular.module('databaseServices', ['ngResource']);
/**
 * Request used to RESTfully interact with cctv_config
 */
 /*post*/
databaseServices.factory('SendText', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/send', {}, {
            query: {method:'GET', isArray:true},
        });
    }]);

/*
GET
GET:id
POST
*/
databaseServices.factory('Users', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/users/:id', { id: '@id'}, {
            query: {method:'GET', isArray:true},
        });
    }]);

/*
GET
GET:Id
POST
*/
databaseServices.factory('Entries', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/entries/:id', { id: '@id'}, {
            query: {method:'GET', isArray:true},
        });
    }]);

/*
GET
*/
databaseServices.factory('Questions', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/questions', {}, {
            query: {method:'GET', isArray:true},
        });
    }]);

/*
POST
*/
databaseServices.factory('Authenticate', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/authenticate', {}, {
            query: {method:'GET', isArray:true},
        });
    }]);

/*
POST
*/
databaseServices.factory('CheckPhone', ['$resource',
    function($resource){
        return $resource('http://www.textingjournal.com/api/index.php/checknumber', {}, {
            query: {method:'GET', isArray:true},
        });
    }]);	
	