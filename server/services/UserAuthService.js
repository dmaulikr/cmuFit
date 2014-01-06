
/**
 * User Authentication Service.
 */

var mongoose = require('mongoose'), 
    User = mongoose.model('User')



exports.session = function (req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
  delete req.session.returnTo
  res.redirect(redirectTo)
}

/**
 * Auth callback
 *

exports.authCallback = login */


exports.dashboard = function (req, res) {
  res.render('default')
}

/**
 * Show login form
 */

exports.login = function (req, res) {
  res.render('default')
}

/**
 * Show sign up form
 */

exports.signup = function (req, res) {
  res.render('default')
}

/**
 * Show home page
 */
exports.home = function (req, res) {
  res.render('default', {
    isAuthenticated: req.isAuthenticated()
  })
}


/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.redirect('/login')
}

/**
 * Create new user
 */

exports.createNewUser = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local'
  user.save(function (err, result) {
    if (err) {
      response.send(err); /*** how to detect kind of error? not important now */
    }
    else {
      response.send(result);
    }

    // manually login the user once successfully signed up
    req.logIn(user, function(err) { ///** req.logIn??
      if (err) return next(err)
      return res.redirect('/')
    })
  })
}



/**
 * Find user by id
 */

exports.findUserById = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}
