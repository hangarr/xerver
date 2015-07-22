/**
 * Middleware to implement server functionality before app routes
 */
;(function() {
	
	var express = require('express')
	  , cors = require('cors')
	  , favicon	= require('serve-favicon')
	  , bodyParser = require('body-parser')
	  , debug = require('debug')('middleware')
	  , path = require('path');

	var middleware = function(app) {
				
		// enable cors for all routes and pre-flighting
		// see 'Configuration Options' on CORS module for more
		app.use(cors());
		app.options('*', cors());
		
//		app.use(bodyParser.json());
		
		app.use('/*', function(req, res, next) {
			debug('==== middleware() - request caught ====');
			
			debug('---- req.originalUrl ----');
			debug(req.originalUrl);
			
			debug('---- req.headers ----');
			debug(req.headers);
			
			debug('---- req.body ----');
			debug(req.body);

			next();
		});

		// static requests would get handled here
//		app.use('/', express['static'](path.resolve(process.env.PROJECT_DIR, './public'),
//				{'redirect': true}));
		
//		app.use(favicon(path.resolve(process.env.PROJECT_DIR, './public/favicon.ico')));
		
		app.use('/', express['static'](path.resolve(__dirname, '../public'), {'redirect': true}));
		
		app.use(favicon(path.resolve(__dirname, '../public/favicon.ico')));
		
	};
	
	module.exports = middleware;
	
}).call(this);