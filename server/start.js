/**
 * Module that actually starts the web server
 */
;(function(){

	var path = require('path')
	  , createApp = require(path.resolve(__dirname, './app.js'))
	  , http = require('http')
	  , https = require('https');
	
	var start = function(options, callback) {
		var app = createApp(options);
		
		var protocol, port;
		if( typeof options.server !== 'undefined' ) {
			protocol = ( typeof options.server.protocol === 'string' ? options.server.protocol : 'http' );			
			port = ( typeof options.server.port !== 'undefined' ? options.server.port :
						( protocol === 'https' ? 443 : 80 ) );
		}
		else {
			protocol = 'http';
			port = 80;
		};
	
		if(protocol === 'https') {
			https.createServer(options.server.tls, app).listen(port, callback);
		}
		else {
//			app.listen(port, callback);
			http.createServer(app).listen(port, callback);
		};
	};
	
	module.exports = start;

}).call(this);