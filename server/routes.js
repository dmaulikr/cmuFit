/**
 * Set up and expose routes
 */

var users = require('./services/UserAuthService'),
    auth = require('./middlewares/authorization')


module.exports = function (app, passport) {

  // user routes
  app.get('/home', users.home)
  app.get('/login', users.login)
  app.get('/signup', users.signup)
  app.get('/logout', users.logout)
  app.get('/dashboard', auth.requiresLogin, users.dashboard)

  // login and sign up routes
  app.post('/api/users', users.createNewUser)
  app.post('/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: 'Invalid email or password.'
    }), users.session)

}
