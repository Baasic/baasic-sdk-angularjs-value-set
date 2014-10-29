(function (angular, module, undefined) {
    "use strict";
    module.service("baasicValueSetRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("value-sets/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("value-sets/{setName}/{?embed,fields}"),
                create: uriTemplateService.parse("value-sets"),
                parse: uriTemplateService.parse,
                items: {
                    find: uriTemplateService.parse("value-sets/{setName}/items/{?searchQuery,page,rpp,sort,embed,fields}"),
                    get: uriTemplateService.parse("value-sets/{setName}/items/{id}/{?embed,fields}"),
                    create: uriTemplateService.parse("value-sets/{setName}/items/"),
                    parse: uriTemplateService.parse
                }
            };
        }]);
}(angular, module));