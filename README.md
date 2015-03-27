# Baasic Value-Set AngularJS SDK

Baasic AngularJS Value-Set library provides access to value-set resource Baasic Service [REST API](https://api.baasic.com/vX).

## Dependencies

Baasic AngularJS Value-Set library has the following dependencies:

* [Baasic Core AngularJS SDK](../../../baasic-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Value-Set library to your project.

### Adding the Library to your Project

Please add the _Baasic Value-Set_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-value-set-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.valueSet_) dependency to your AngularJS module.

```javascript
angular.module('my-module', ["baasic.api", "baasic.valueSet"])
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](../../../baasic-sdk-angularjs-value-set/pulls)
* Please [report](../../../baasic-sdk-angularjs-value-set/issues) any issues you might have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
