/**
 * Middleware used in routes.js
 */


/*
 *  Middleware for routing.
 */
exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next()
  if (req.method == 'GET') req.session.returnTo = req.originalUrl //*** fix?
  res.redirect('/login')
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