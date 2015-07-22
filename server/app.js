/**
 * Module to compose the middleware and routes of the app
 */
;(function() {
	var express = require('express')
	  , util = require('util')	
	  , path = require('path')  
	  , middleware = require(path.resolve(__dirname, './middleware.js'))
//	  , api = require('./api.js')
	  , defaultroute = require(path.resolve(__dirname, './defaultroute.js'));
	
	var createApp = function(options) {
		var _options = util._extend({}, options);
		var app = express();

		middleware(app);
//		api(app, _options.api);
		_options.api.load(app, _options.api);
		defaultroute(app);
		
		return app;
	};
	
	module.exports = createApp;	
}).call(this);