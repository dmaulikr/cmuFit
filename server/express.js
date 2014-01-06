/**
 * Load express middleware.
 * Please note that the order is important, since they are loaded sequentially. 
 */

var express = require('express'),
    path = require('path'),
    flash = require('connect-flash'),
    mongoStore = require('connect-mongo')(express);


module.exports = function (app, config, passport) {
  
  app.set('port', process.env.PORT || config.server.listenPort);

  // should be placed before express.static (?)
  app.use(express.compress({
    filter: function (req, res) {
      return /json|text|javascript|css/.test(res.getHeader('Content-Type'))
    },
    level: 9
  })) 

  app.use(express.favicon());
  app.use(express.logger('dev')); //Log requests to the console during development
  app.use(express.json());  //Allow json on request and reponses
  app.use(express.urlencoded()); //Allow Url encoding

  //directory where static files are located, must be placed before app.router
  app.use(express.static(config.root + '/dist'));
  app.use(express.static(config.root + '/client/css'));
  app.use(express.static(config.root + '/public/images'));

  app.set('showStackError', true);

  //set views path to access jade templates
  app.set('views', config.root + '/views');
  app.set('view engine', 'jade');

  app.configure(function () {

    /* example middleware to use variables passed from server 
     * into jade templates 

    app.use(function(req, res, next) {
      res.locals.auth = {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
      };
      next();
    }); */

    // cookieParser should be above session
    app.use(express.cookieParser());

    // bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // express/mongo session storage
    app.use(express.session({
      secret: config.server.sessionSecret,
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }));

    // use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // connect flash for flash messages should be declared after sessions
    // needed for passport.
    app.use(flash());

    // routes should be at the end
    app.use(app.router);

  })


}
