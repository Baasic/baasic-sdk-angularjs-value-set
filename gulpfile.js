var docgen = require('baasic-javascript-docgen');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var injectVersion = require('gulp-inject-version');

var paths = {
  scripts: ['src/**/*.js']
};

gulp.task('scripts', function() {
  return gulp.src(paths.scripts)
    .pipe(plugins.order(["*.moduleDefinition.js", "*.js"]))
	.pipe(plugins.concat('baasic-angular-value-set.js'))
	.pipe(plugins.header('/*\n Baasic AngularJS Value Set %%GULP_INJECT_VERSION%%\n (c) 2014-2016 Mono http://baasic.com\n License: MIT\n*/\n(function (angular, undefined) {\n'))  
	.pipe(plugins.footer('\n})(angular);'))
    .pipe(injectVersion())
	.pipe(plugins.beautify())
	.pipe(gulp.dest('dist'))
	.pipe(plugins.uglify({output: {comments: /^!|License: MIT/i}}))
	.pipe(plugins.rename('baasic-angular-value-set.min.js'))
	.pipe(gulp.dest('dist'));
});



gulp.task('docs', function() {
  docgen.generateBaasicDocs('src', 'wiki', 'Baasic Value Set Navigation', ['config.js'], ['home.md']);
});

gulp.task('default', ['scripts', 'docs']);
