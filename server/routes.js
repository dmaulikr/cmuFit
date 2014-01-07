/**
 * Set up and expose routes
 */

var UserAuthService = require('./services/UserAuthService'),
    auth = require('./middlewares/authorization')


module.exports = function (app, passport) {

  // user routes
  app.get('/home', UserAuthService.getBaseTemplate)
  app.get('/login', UserAuthService.getBaseTemplate)
  app.get('/signup', UserAuthService.getBaseTemplate)
  app.get('/dashboard', auth.requiresLogin, UserAuthService.getBaseTemplate)
  app.get('/mytracker', auth.requiresLogin, UserAuthService.getBaseTemplate)
  app.post('/logout', UserAuthService.logoutUser)

  //login and sign up routes
  app.post('/api/users', UserAuthService.createNewUser)
  //passport.authenticate middleware invokes req.login()
  app.post('/api/users/session',
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true
    }), UserAuthService.session)

}
