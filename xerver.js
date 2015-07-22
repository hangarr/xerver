/**
 * Module to configure the application
 */
;(function() {
	var fs = require('fs')
	  , path = require('path')
	  , common = require('./server/lib/common.js')
	  , start = require('./server/start.js')
	  , api = require('./server/api.js');

	// API
	var port = process.env.PORT || '3000';
	var host = process.env.HOST || 'localhost';
	var protocol = process.env.PROTOCOL || 'http';
	
	var key = fs.readFileSync(path.resolve(__dirname, './cert/key.pem'), 'utf8');
	var cert = fs.readFileSync(path.resolve(__dirname, './cert/certificate.pem'), 'utf8');
	
	var optionsApp = {
		server: {
			port: port,
			host: host,
			protocol: protocol,
			tls: {
				key: key,
				cert: cert
			}
		},
		api: {
			load: api
		}
	};

	var app;

	app = start(optionsApp,  function(err) {
		if(!err)
		    console.log('Express app started on port ' + port);
		else
		    console.log(err, null);
	});

}).call(this);

