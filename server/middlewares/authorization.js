/**
 * Middleware used in routes.js
 */


/*
 *  Middleware for routing. Store original url requested 
 *  so that user can be redirected after authentication.
 */
exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl; 
  res.redirect('/login');
}

/*
 *  User authorization 
 */
exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/' + req.profile.id)
    }
    next()
  }
}