# xerver 
## Express server core for simple xerver app framework
This package includes the Express server code and other packages for the 
simple xerver app framework.

## Standalone use
The core xerver package can be used standalone for demo purposes.  The do so the user must supply several types of configuration information.

### Certificate for HTTPS SSL/TLS
The standalone demo module `xerver.js` looks for the key and certificate information in two files in a folder in the project that is not stored in the GitHub repo:
```
./cert/key.pem
./cert/certificate.pem
```
More information about creating these credentials can be found here:
```
https://nodejs.org/api/https.html
https://nodejs.org/api/tls.html
```

### Environment variables
The demo app which returns the node version uses Basic Authentication.  The environment variables that the app in the the xerver package uses can be set up with a BASH shell file, e.g. `default_env.sh` that includes the following commands
```
#!/bin/sh
#
export XERVER_ID=<id_string>
export XERVER_TOKEN=<token_string>
#
export PORT=3000
```
This file would be run as:
```
$ source ./default_env.sh
```

### Starting the server standalone
The Express server in the core xerver package can be started with the command
```
$ node xerver.js
```

### HTTP Tests
The basic server and test API to get the Node.js server version can be tested using the following cURL commands:
```
# public static endpoint test
curl -i -k -X GET http://localhost:3000 -H "Content-Type: application/json" \
     -u <id_string>:<token_string>

# trigger for default route
curl -i -k -X GET http://localhost:3000/x -H "Content-Type: application/json" \
     -u <id_string>:<token_string>

# nodeversion endpoint test
curl -i -k -X GET http://localhost:3000/xerver-app/nodeversion -H "Content-Type: application/json" \
     -u <id_string>:<token_string>
```

## Use as a dependency
The xerver core package can also be used as a dependency inside a test package provides an `api.js` module. 

### Including in a test package
The handler `function()` in the Express `app.use()` and `route.use()` methods described here:
```
http://expressjs.com/4x/api.html#app.use
http://expressjs.com/4x/api.html#router.use
```
can be included in the test package or a separate package.  As a dependency, the package can be `require`'d as
```
var start = require('xerver').start;
```

### Starting the server as a dependency
The server can be started as a dependency in test package or an application package as
```
var app = start(optionsApp,  function(err) {
   ...
}
```
See the `xerver.js` module for an example.

## Notes
Unit testing and end-to-end testing support can be added to this later.

