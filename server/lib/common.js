;(function() {
	var util = require('util')
	  , basicAuth = require('basic-auth')
	  , scmp = require('scmp')
	  , crypto = require('crypto');
	var isSSL = /^https/
	  , outPath = /^\/[^\/]+/;
	
	var common = {};
	
	common.formatReq = function(req) {
		console.log('vvvvvvvv');
		console.log(Object.keys(req));
		console.log('v^v^v^v^');
		console.log(req);
		console.log('^^^^^^^^');
	};

	common.setupOutReq = function(outReq, options, req, body) {
		outReq.headers = {};

		// First pull host and port from the request object if it exists
		if(typeof req !== 'undefined' || typeof req !== 'null' || typeof req !== 'string') {
			var hostport = req.headers.host.split(":");
			outReq.hostname = hostport[0];
			if(typeof hostport[1] !== 'undefined')
				outReq.port = hostport[1];
			
			outReq.method = req.method;
			outReq.path = req.url.replace(outPath, '');

			Object.keys(req.headers).forEach( function(e) {
				if( ['host', 'hostname', 'port', 'authorization'].indexOf(e) < 0 )
					outReq.headers[e] = req.headers[e];					
			});
		}
		
		['host', 'hostname', 'pfx', 'key', 'cert', 'ca', 'ciphers', 'secureProtocol', 
		 'localAddress', 'method', 'path', 'auth', 'port'].forEach( function(e) {
			 if(options.req[e])
				 outReq[e] = options.req[e];			
		});

		outReq.port = outReq.port || (isSSL.test(options.protocol) ? 443 : 80);
		
		if(options.headers)
			util._extend(outReq.headers, options.headers);

		if(typeof body !== 'undefined')
			outReq.headers['content-length'] = Buffer.byteLength(body);
		
		return outReq;
	};
	
	// Basic authenticator middleware factory function
	// Needed because basic-auth-connect used in Express 3.0 has been deprecated
	common.auth = function(user, pass) {
		return function( req, res, next ) {
			function unauthorized(res) {
			    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
			    return res.status(401).send('');
			};

			var _user = basicAuth(req);

			if (!_user || !_user.name || !_user.pass)
				return unauthorized(res);

			if (_user.name === user && _user.pass === pass)
			    return next();
			else
			    return unauthorized(res);
		};
	};
	
	common.digest_signature = function(token, url, params) {
		var prms = url;
		
		Object.keys(params).sort().forEach(function(key, i) {
			prms = prms + key + params[key];
		});
		
		var sign = crypto
			.createHmac('sha1', token)
			.update(prms)
			.digest('base64');
		
		return sign;
	};
	
	// Digest authenticator middleware factory function
	common.digest = function(user, pass, authkey) {
		return function( req, res, next ) {
			function unauthorized(res) {
			    res.set('WWW-Authenticate', 'Digest realm=Authorization Required');
			    return res.status(401).send('');
			};
			
			// This needs to be elaborated
//			var url = req.protocol + '://' + req.hostname + req.originalUrl;
			var url = 'https' + '://' + req.hostname + req.originalUrl;
			var sign = common.digest_signature(pass, url, req.body);
console.log('==== digest ====');
console.log('-- pass --');
console.log(pass);
console.log('-- url --');
console.log(url);
console.log('-- req.body --');
console.log(req.body);
console.log('-- sign --');
console.log(sign);
console.log('-- req.headers[authkey] --');
console.log(req.headers[authkey]);
			if (scmp(req.headers[authkey], sign))
			    return next();
			else
			    return unauthorized(res);
		};
	};

	
	module.exports = common;
	
}).call(this);