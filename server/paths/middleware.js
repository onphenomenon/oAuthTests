var morgan = require('morgan');
var session = require('express-session');
var methodOverride = require('method-override');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');
var keys = require('../../config.js');

module.exports = function(app, express) {

  var authRouter = express.Router();

  app.use(morgan('dev'));
  app.use(methodOverride('X-HTTP-Method-Override'));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname +'/../../app'));

  sessionOpts = {
    secret: 'kari',
    saveUninitialized: true,
    resave: true,
    cookie: { maxAge: null }
  }
  app.use(cookieParser());
  // app.use(cookieParser(keys.session.secret));

  app.use(session(sessionOpts));

  console.log(session);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(authRouter);

  require('../oAuth/oAuthRoutes.js')(authRouter);


}
