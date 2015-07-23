/**
 * Route specifiers for app
 */
;(function() {
	
	var express = require('express')
	  , util = require('util')
	  , path = require('path')
	  , bodyParser = require('body-parser')
	  , debug = require('debug')('api')
	  , common = require('./lib/common.js');

	var api = function(app, options) {
		
		var routes = express.Router();

		var nodeversion = function( req, res ) {		
			res.status( 200 ).send(process.versions);
		};
		
		routes.use('/nodeversion', nodeversion);
		
		// hang the subrouter on the app.
		// It seems this could improve route matching performance for the different sub-apis
		var wsAuth = common.auth( process.env.XERVER_ID, process.env.XERVER_TOKEN );
		app.use('/xerver-app', wsAuth, routes);
	};
	
	module.exports = api;

}).call(this);