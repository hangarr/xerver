/**
 * Module to configure the application
 */
;(function() {	
	var common = require('./server/lib/common.js')
	  , start = require('./server/start.js')
	  , api = require('./server/api.js');

	module.exports = {
		start: start,
		lib: {
			common: common
		}
	};
}).call(this);
