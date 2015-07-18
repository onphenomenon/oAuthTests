var passport = require('passport')
  , IntuitStrategy = require('passport-intuit-oauth').Strategy;
var keys = require('../../config.js');

var INTUIT_CONSUMER_KEY = keys.INTUIT_CONSUMER_KEY
var INTUIT_CONSUMER_SECRET = keys.INTUIT_CONSUMER_SECRET;
var QuickBooks = require('../node_modules/node-quickbooks/index.js');

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Intuit profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  // console.log("Passport Serialize: ", user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // console.log("Passport Deserialize: ", user);
  done(null, user);
});

// Use the IntuitStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Intuit profile), and
//   invoke a callback with a user object.
passport.use(new IntuitStrategy({
    consumerKey: INTUIT_CONSUMER_KEY,
    consumerSecret: INTUIT_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/intuit/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // console.log("profile in Controller", profile);

      var qbo = new QuickBooks(INTUIT_CONSUMER_KEY,
                           INTUIT_CONSUMER_SECRET,
                           token,
                           tokenSecret,
                           profile.realmId,
                           true, // use the Sandbox
                           true);

      profile.qbo = qbo;
      // To keep the example simple, the user's Intuit profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Intuit account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    console.log("Checking isAuthenticated");
    console.log("req.session ", req.session);
    console.log("req.session.passport.user", req.session.passport.user);
    if (req.isAuthenticated()) { console.log("Passport middleware, isAuthenticated");  return next(); }

    res.redirect('/login')
  }
}
