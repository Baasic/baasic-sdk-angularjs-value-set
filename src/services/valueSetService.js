/**
 * @module baasicValueSetService
 * @description Baasic Value-Set Service provides an easy way to consume Baasic Value-Set REST routes.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
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