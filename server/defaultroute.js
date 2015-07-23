;(function() {
	var express = require('express')
	  , path = require('path');
	
	var defaultroute = function(app) {

		app.get('/*', function(req, res) {
			res.status(200).sendFile(path.resolve(__dirname, '../public/default.html'));
		});
	};
	
	module.exports = defaultroute;

}).call(this);