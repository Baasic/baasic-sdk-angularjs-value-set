(function (angular, undefined) {
    var module = angular.module("baasic.valueSet", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetItemRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valuesetitems/set/{setName}/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valuesetitems/set/{setName}/item/{itemKey}/{?embed,fields}"),
                create: uriTemplateService.parse("valuesetitems"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetItemService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetItemRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetItemRouteService) {
            return {
                routeService: valueSetItemRouteService,
                find: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetItemRouteService.get.expand(baasicApiService.getParams(data)));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetItemRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("valueset/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("valueset/{setName}/{?embed,fields}"),
                create: uriTemplateService.parse("valueset"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicValueSetService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicValueSetRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, valueSetRouteService) {
            return {
                routeService: valueSetRouteService,
                find: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(valueSetRouteService.get.expand(baasicApiService.getParams(data, 'setName')));
                },
                create: function (data) {
                    return baasicApiHttp.post(valueSetRouteService.create.expand({}), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
})(angular);