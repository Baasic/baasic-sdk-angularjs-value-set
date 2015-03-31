(function (angular, undefined) {
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism. An angular module is a container for the different parts of your app - services, directives etc. In order to use `baasic.valueSet` module functionality it must be added as a dependency to your app.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     * @module baasic.valueSet
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.valueSet", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicValueSetRouteService
     * @description Baasic Value-Set Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `valueSetService` uses `baasicValueSetRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services. 
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find value set route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicValueSetRouteService.find.expand({searchQuery: "<search-phrase>"});               
                 **/
                find: uriTemplateService.parse("value-sets/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get value set route which must be expanded with the name of the previously created value set resource in the system.
                 * @method        
                 * @example baasicValueSetRouteService.get.expand({setName: "<value-set-name>"});               
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
                 * @example baasicValueSetRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
                 **/
                parse: uriTemplateService.parse,
                items: {
                    /**
                     * Parses find value set items route which can be expanded with additional options. Supported items are:
                     * - `setName` - Value set name.
                     * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                     * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the role property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method items.find       
                     * @example baasicValueSetRouteService.find.expand({searchQuery: "<search-phrase>"});               
                     **/
                    find: uriTemplateService.parse("value-sets/{setName}/items/{?searchQuery,page,rpp,sort,embed,fields}"),
                    /**
                     * Parses get route which must be expanded with the following items:
                     * - `setName` - Value set name.
                     * - `id˙ - Value set item id.
                     * @method        
                     * @example baasicValueSetRouteService.get.expand({setName: "<value-set-name>", id: "<value-set-item-id>"});               
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
                     * @example baasicValueSetRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
                     **/
                    parse: uriTemplateService.parse
                }
            };
        }]);
    }(angular, module));
    /**
     * @module baasicValueSetService
     * @description Baasic Value-Set Service provides an easy way to consume Baasic Value-Set REST routes.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                routeService: valueSetRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources.
                 * @method        
                 * @example 
                 baasicValueSetService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "name",
                 orderDirection : "desc",
                 search : "<search-phrase>"
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the value set resource.
                 * @method        
                 * @example 
                 baasicValueSetService.get("<value-set-name>")
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
                 * Returns a promise that is resolved once the create value set action has been performed.
                 * @method        
                 * @example 
                 baasicValueSetService.create({
                 name: "<value-set-name>",
                 description: "<description>",
                 values: [{value: "<value>"}]
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
                 * Returns a promise that is resolved once the update value set action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.name = "<new-name>";
                 baasicValueSetService.update(existingResource)
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
                 * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the value set resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicValueSetService.remove(existingResource)
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
                items: {
                    /**
                     * Returns a promise that is resolved once the find action has been performed. Success response returns a list of value set resources.
                     * @method items.find       
                     * @example 
                     baasicValueSetService.items.find({
                     setName: "<value-set-name>",
                     pageNumber : 1,
                     pageSize : 10,
                     orderBy : "value",
                     orderDirection : "desc",
                     search : "<search-phrase>"
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
                     * Returns a promise that is resolved once the get action has been performed. Success response returns the value set resource.
                     * @method items.get       
                     * @example 
                     baasicValueSetService.items.get("<value-set-name>", "<set-item-id>")
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
                     * Returns a promise that is resolved once the create value set action has been performed.
                     * @method items.create       
                     * @example 
                     baasicValueSetService.items.create({
                     setId: "<value-set-id>",
                     value: "<value>"
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
                     * Returns a promise that is resolved once the update value set action has been performed.
                     * @method items.update       
                     * @example 
                     // Existing resource is a resource previously fetched using get action.
                     existingResource.value = "<new-value>";
                     baasicValueSetService.items.update(existingResource)
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
                     * Returns a promise that is resolved once the remove action has been performed. If the action is successfully completed the value set resource is permanently removed from the system.
                     * @method items.remove       
                     * @example 
                     // Existing resource is a resource previously fetched using get action.
                     baasicValueSetService.items.remove(existingResource)
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
})(angular);