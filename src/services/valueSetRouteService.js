/**
 * @module baasicValueSetRouteService
 * @description Baasic Value Set Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Value Set Route Service to obtain a needed routes while some routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {		
                /**
                * Parses find value set route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                * - `page` - A value used to set the page offset, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicValueSetRouteService.find.expand({searchQuery: '<search-phrase>'});               
                **/ 			
                find: uriTemplateService.parse("value-sets/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                * Parses get value set route which must be expanded with the name of the previously created value set resource in the system.
                * @method        
                * @example baasicValueSetRouteService.get.expand({setName: '<value-set-name>'});               
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
                * @example baasicValueSetRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                **/ 					
                parse: uriTemplateService.parse,
                items: {
					/**
					* Parses find value set items route which can be expanded with additional options. Supported items are:
					* - `setName` - Value set name.
					* - `searchQuery` - A string referencing resource properties using the phrase or query search.
					* - `page` - A value used to set the page offset, i.e. to retrieve certain resource subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the role property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method items.find       
					* @example baasicValueSetRouteService.find.expand({searchQuery: '<search-phrase>'});               
					**/ 				
                    find: uriTemplateService.parse("value-sets/{setName}/items/{?searchQuery,page,rpp,sort,embed,fields}"),
					/**
					* Parses get route which must be expanded with the following items:
					* - `setName` - Value set name.
					* - `id` - Value set item id.
					* @method        
					* @example baasicValueSetRouteService.get.expand({setName: '<value-set-name>', id: '<value-set-item-id>'});               
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
					* @example baasicValueSetRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
					**/ 						
                    parse: uriTemplateService.parse
                }
            };
        }]);
}(angular, module));
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/
