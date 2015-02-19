/**
 * @module baasicValueSetRouteService
**/

/** 
 * @overview Value set route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {		
                /**
                * Parses find value set route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicValueSetRouteService.find.expand({searchQuery: "searchTerm"});               
                **/ 			
                find: uriTemplateService.parse("value-sets/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                * Parses get value set route which must be expanded with the name of the previously created value set resource in the system.
                * @method        
                * @example baasicKeyValueRouteService.get.expand({setName: "setName"});               
                **/   				
                get: uriTemplateService.parse("value-sets/{setName}/{?embed,fields}"),
                /**
                * Parses create value set route; this URI template does not expose any additional options.
                * @method        
                * @example baasicKeyValueRouteService.create.expand({});              
                **/  				
                create: uriTemplateService.parse("value-sets"),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
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
					* @example baasicKeyValueRouteService.find.expand({searchQuery: "searchTerm"});               
					**/ 				
                    find: uriTemplateService.parse("value-sets/{setName}/items/{?searchQuery,page,rpp,sort,embed,fields}"),
					/**
					* Parses get route which must be expanded with the following items:
					* - `setName` - Value set name.
					* - `id˙ - Value set item id.
					* @method        
					* @example baasicKeyValueRouteService.get.expand({setName: "setName", id: "itemId"});               
					**/					
                    get: uriTemplateService.parse("value-sets/{setName}/items/{id}/{?embed,fields}"),
					/**
					* Parses create value set item route; the URI template should be expanded with the value set name.
					* @method        
					* @example baasicKeyValueRouteService.create.expand({});              
					**/  					
                    create: uriTemplateService.parse("value-sets/{setName}/items/"),
					/**
					* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
					* @method
					* @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
					**/ 						
                    parse: uriTemplateService.parse
                }
            };
        }]);
}(angular, module));