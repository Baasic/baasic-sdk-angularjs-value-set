# Baasic Value-Set AngularJS SDK

Baasic AngularJS Value-Set library provides access to value-set resource Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS Value-Set library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Value-Set library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic Value-Set_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-value-set-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.valueSet_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.valueSet"])
```

## Value-Set Module

Baasic AngularJS Value-Set services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### valueSetService

Baasic Value-Set Service provides an easy way to consume Baasic Value-Set REST routes.

* `get` - Gets a single value-set set by Id
* `find` - Finds value-set sets by given criteria
* `create` - Creates a new value-set set
* `update` - Updates a value-set set
* `remove` - Deletes a value-set set
* `routeService` - Provides direct access to `valueSetRouteService`
* `item.*` - Contains value-set item functions:
 * `get` - Gets a single value-set item by Id
 * `find` - Finds value-set items by given criteria
 * `create` - Creates a new value-set item
 * `update` - Updates a value-set item
 * `remove` - Deletes a value-set item

Here are a few examples on how to use the `valueSetService`:

```javascript
var id = "73a22b5d-e5ef-44f2-9c81-a3fb01063f86";
baasicValueSetService.get(id)
    .success(function(data) {
        // data variable contains a single value-set "set" object that match the key/id
    });
```

```javascript
var options = { searchQuery: "myQuery", page: 4, rpp: 3 };
baasicValueSetService.find(options)
    .success(function(data) {
        // data variable contains a collection of value-set "set" objects that match the filtering parameters
    });
```

For functions such as `update` and `remove` that don't use `valueSetRouteService` for obtaining route templates, routes can be obtained from value-set (HAL enabled) objects like this:

```javascript
var params = baasicApiService.removeParams(valueSetObject);
var uri = params["model"].links('delete').href;
// i.e. if the valueSetObject had the following id: "73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
// the uri would yield "/value-sets/73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
```

##### valueSetRouteService

Baasic Value-Set Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. `valueSetService` uses `valueSetRouteService` to obtain a part of needed routes while the other part is obtained through HAL. `valueSetRouteService` by convention uses the same function names as `valueSetService`.

Here is a list of all the `valueSetRouteService` functions:

* `get`, `find`, `create`
* `item.*` - `get`, `find`, `create`
* `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
baasicValueSetRouteService.find.expand(params); // this will yield "/value-sets/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
