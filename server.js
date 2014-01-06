
/**
 * Main file for entry into the cmufit application.
 * Load Config file and other module dependencies.
 */

var express = require('express'),
    mongoose = require('mongoose'),
    http = require('http'),
    fs = require('fs'), //file system
    passport = require('passport'),
    config = require('./server/config');


/* ===========================
    Initialize 
   =========================== */

// Create an express application and the server.
var app = express(), 
    server = http.createServer(app);

// Connect to database
mongoose.connect('mongodb://localhost:27017/cmufit');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// Bootstrap models
var models_path = __dirname + '/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// Bootstrap passport 
require('./server/passport')(passport, config)

// Express settings
require('./server/express')(app, config, passport)

// Bootstrap routes
require('./server/routes')(app, passport)


// Standard Error Handler that returns a well formmated 500 error
if (app.get('env') == 'development') {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

var port = app.get('port') //port is set in express.js

/* app returned by express is a JavaScript function designed to be passed
 * to node's http or https servers as a callback to handle requests */
app.listen(port);

console.log('Express app started on port ' + port);

