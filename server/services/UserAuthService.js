
/**
 * User Authentication Service.
 */

var mongoose = require('mongoose'), 
    User = mongoose.model('User');


/*
 * Send default template. 
 */
exports.getBaseTemplate = function (req, res) {
  res.render('default', {
    isAuthenticated: req.isAuthenticated()
  })
}

/*
 * Logout User.
 */
exports.logoutUser = function (req, res) {
  req.logout();
  res.redirect('/home');
}

/*
 * Create new user.
 */
exports.createNewUser = function (req, res) {
  //user object created with username and email field
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err, result) {
    if (err) {
      res.send(err); 
    }
    else {
      // Function exposed by passport on req to establish a login session.
      // When the login operation completes, user will be assigned to req.user
      req.login(user, function(err) { 
        if (err) return next(err);
        return res.redirect('/dashboard');
      });
    }
  });
}

/*
 * Once logged in, redirect to original request page if any. 
 * req.session.returnTo is set in the middleware (authorization.js).
 */
exports.session = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/dashboard';
  delete req.session.returnTo;
  //res.redirect only sends a response with a 302 status code and 
  //a Location header with the URL. Hence handle route view change with Angular.
  //However this problem doesn't seem to exist with the middleware?
  res.send({ 'location': redirectTo});
}

