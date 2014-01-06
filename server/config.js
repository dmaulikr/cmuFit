/**
 * App configuration data
 * Referenced directly only in server.js
 */


var path = require('path');

module.exports = {
  // __dirname is the directory of this file 
	root: path.normalize(__dirname + '/..'),
  db: 'mongodb://localhost:27017/cmufit',
  server: {
    listenPort: 3000,   
    securePort: 8433,
    sessionSecret: 'cmufitnesstracker',
    /* destination folder of all the application files built using Grunt */             
    distFolder: path.resolve(__dirname, '../dist'),
  }

};