var oAuthController = require('./oAuthController.js');
var passport = require('passport');
var QuickBooks = require('../node_modules/node-quickbooks/index.js');
var Q = require('q');
var Promise = require("bluebird");


module.exports = function(app, express) {

  var QuickBooks = require('../node_modules/node-quickbooks/index.js')

  app.get('/', function(req, res){
    console.log("index req.session ", req.session);
    console.log("index req.user ", req.user);
    console.log("index req.session.passport.user", req.session.passport.user)

    res.render('index', { user: req.user });
  });

  app.get('/login', function(req, res){
    console.log("login req.session ", req.session);

    console.log("login req.session.passport.user", req.session.passport.user)
    res.render('login', { user: req.user });
  });
  //front end $http request
  app.get('/auth/intuit', passport.authenticate('intuit'),
    function(req, res) {
      console.log("login req.session ", req.session);
      console.log("login req.session.passport.user", req.session.passport.user)


  } );


  app.get('/auth/intuit/callback',
    passport.authenticate('intuit', { failureRedirect: '/login' }),
     function(req, res) {
        console.log("Successful LOGIN YAY!");
        res.redirect('/');
    }
  );


  app.get('/redirect-linkedin', function(req, res) {
    res.redirect('/#/google');
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });



}
