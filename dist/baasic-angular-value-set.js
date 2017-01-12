/*
 Baasic AngularJS Value Set v1.0.0
 (c) 2014-2017 Mono http://baasic.com
 License: MIT
*/
(function (angular, undefined) {
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.valueSet` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @module baasic.valueSet
     * @example
     (function (Main) {
     'use strict';
     var dependencies = [
     'baasic.api',
     'baasic.membership',
     'baasic.security',
     'baasic.appSettings',
     'baasic.article',
     'baasic.dynamicResource',
     'baasic.keyValue',
     'baasic.valueSet'
     ];
     Main.module = angular.module('myApp.Main', dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.valueSet", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicValueSetRouteService
     * @description Baasic Value Set Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Value Set Route Service to obtain needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find value set route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string value used to identify value set resources using the phrase search.
                 * - `page` - A value used to set the page number, i.e. to retrieve certain value set subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the value set property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example 
                 baasicValueSetRouteService.find.expand(
                 {searchQuery: '<search-phrase>'}
                 );
                 **/
                find: uriTemplateService.parse("value-sets/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get value set route which must be expanded with the name of the previously created value set resource in the system.
                 * @method        
                 * @example 
                 baasicValueSetRouteService.get.expand(
                 {setName: '<value-set-name>'}
                 );
                 **/
                get: uriTemplateService.parse("value-sets/{setName}/{?embed,fields}"),
                /**
                 * Parses create value set route; this URI template does not expose any additional options.
                 * @method        
                 * @example baasicValueSetRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("value-sets"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example 
                 baasicValueSetRouteService.parse(
                 '<route>/{?embed,fields,options}'
                 ).expand(
                 {embed: '<embedded-resource>'}
                 );
                 **/
                parse: uriTemplateService.parse,
                items: {
                    /**
                     * Parses find value set items route which can be expanded with additional options. Supported items are:
                     * - `setName` - Value set name.
                     * - `searchQuery` - A string value used to identify value set items using the phrase search.
                     * - `page` - A value used to set the page number, i.e. to retrieve certain value set item subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the value set item property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method items.find       
                     * @example 
                     baasicValueSetRouteService.find.expand(
                     {searchQuery: '<search-phrase>'}
                     );
                     **/
                    find: uriTemplateService.parse("value-sets/{setName}/items/{?searchQuery,page,rpp,sort,embed,fields}"),
                    /**
                     * Parses get route which must be expanded with the following items:
                     * - `setName` - Value set name.
                     * - `id` - Value set item id.
                     * @method        
                     * @example 
                     baasicValueSetRouteService.get.expand({
                     setName: '<value-set-name>', 
                     id: '<value-set-item-id>'
                     });
                     **/
                    get: uriTemplateService.parse("value-sets/{setName}/items/{id}/{?embed,fields}"),
                    /**
                     * Parses create value set item route; the URI template should be expanded with the value set name.
                     * @method        
                     * @example baasicValueSetRouteService.create.expand({});              
                     **/
                    create: uriTemplateService.parse("value-sets/{setName}/items/"),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                     * @method
                     * @example 
                     baasicValueSetRouteService.parse(
                     '<route>/{?embed,fields,options}'
                     ).expand(
                     {embed: '<embedded-resource>'}
                     );
                     **/
                    parse: uriTemplateService.parse
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
     - All end-point objects are transformed by the associated route service.
     */

    /**
     * @module baasicValueSetService
     * @description Baasic Value Set Service provides an easy way to consume Baasic Value Set REST end-points. In order to obtain needed routes `baasicValueSetService` uses `baasicValueSetRouteService`.
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources matching given criteria.
                 * @method        
                 * @example 
                 baasicValueSetService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : '<field>',
                 orderDirection : '<asc|desc>',
                 search : '<search-phrase>'
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                find: function (options) {
                    return baasicApiHttp.get(valueSetRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set resource.
                 * @method        
                 * @example 
                 baasicValueSetService.get('<value-set-name>')
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (setName, options) {
                    return baasicApiHttp.get(valueSetRouteService.get.expand(baasicApiService.getParams(setName, options, 'setName')));
                },
                /**
                 * Returns a promise that is resolved once the create value set action has been performed; this action creates a new value set resource.
                 * @method        
                 * @example 
                 baasicValueSetService.create({
                 name: '<value-set-name>',
                 description: '<description>',
                 values: [{value: '<value>'}]
                 })
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                create: function (data) {
                    return baasicApiHttp.post(valueSetRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update value set action has been performed; this action updates a value set resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(valueSet);
                 var uri = params['model'].links('put').href;
                 ```
                 * @method        
                 * @example 
                 // valueSet is a resource previously fetched using get action.
                 valueSet.name = '<new-name>';
                 baasicValueSetService.update(valueSet)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set resource if the action is completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                 ```
                 var params = baasicApiService.removeParams(valueSet);
                 var uri = params['model'].links('delete').href;
                 ```
                 * @method        
                 * @example 
                 // valueSet is a resource previously fetched using get action.
                 baasicValueSetService.remove(valueSet)
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                /**
                 * Provides direct access to `baasicValueSetRouteService`.
                 * @method        
                 * @example baasicValueSetService.routeService.get.expand(expandObject);
                 **/
                routeService: valueSetRouteService,
                items: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set item resources matching given criteria.
                     * @method items.find       
                     * @example 
                     baasicValueSetService.items.find({
                     setName: '<value-set-name>',
                     pageNumber : 1,
                     pageSize : 10,
                     orderBy : '<field>',
                     orderDirection : '<asc|desc>',
                     search : '<search-phrase>'
                     })
                     .success(function (collection) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    find: function (options) {
                        return baasicApiHttp.get(valueSetRouteService.items.find.expand(baasicApiService.findParams(options)));
                    },
                    /**
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the specified value set item resource.
                     * @method items.get       
                     * @example 
                     baasicValueSetService.items.get('<value-set-name>', '<set-item-id>')
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    get: function (setName, id, options) {
                        var params = angular.extend({}, options);
                        params.setName = setName;
                        return baasicApiHttp.get(valueSetRouteService.items.get.expand(baasicApiService.getParams(id, params)));
                    },
                    /**
                     * Returns a promise that is resolved once the create value set item action has been performed; this action creates a new value set item resource.
                     * @method items.create       
                     * @example 
                     baasicValueSetService.items.create({
                     setId: '<value-set-id>',
                     value: '<value>'
                     })
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    create: function (data) {
                        return baasicApiHttp.post(valueSetRouteService.items.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the update value set item action has been performed; this action updates a value set item resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(valueSetItem);
                     var uri = params['model'].links('put').href;
                     ```
                     * @method items.update       
                     * @example 
                     // valueSetItem is a resource previously fetched using get action.
                     valueSetItem.value = '<new-value>';
                     baasicValueSetService.items.update(valueSetItem)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    update: function (data) {
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    },
                    /**
                     * Returns a promise that is resolved once the remove action has been performed. This action will delete a value set item if the action is completed successfully. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicValueSetService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
                     ```
                     var params = baasicApiService.removeParams(valueSetItem);
                     var uri = params['model'].links('delete').href;
                     ```
                     * @method items.remove       
                     * @example 
                     // valueSetItem is a resource previously fetched using get action.
                     baasicValueSetService.items.remove(valueSetItem)
                     .success(function (data) {
                     // perform success action here
                     })
                     .error(function (response, status, headers, config) {
                     // perform error handling here
                     });
                     **/
                    remove: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                    }
                }
            };
        }]);
    }(angular, module));
    /**
     * @copyright (c) 2017 Mono Ltd
     * @license MIT
     * @author Mono Ltd
     * @overview 
     ***Notes:**
     - Refer to the [Baasic REST API](http://dev.baasic.com/api/reference/home) for detailed information about available Baasic REST API end-points.
     - All end-point objects are transformed by the associated route service.
     */
})(angular);