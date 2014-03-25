var FacebookStrategy, MongoStore, app, express, http, mongoStore, mongoconfig, mongoose, passport, path, routes, server, settings;

express = require("express");

http = require("http");

path = require("path");

routes = require("./routes");

passport = require("passport");

FacebookStrategy = require("passport-facebook").Strategy;

mongoose = require('mongoose');

MongoStore = require('connect-mongo')(express);

settings = require('./configuration.json');

mongoconfig = require("./utils/mongoconfig")(settings);

app = express();

server = http.createServer(app);

mongoStore = new MongoStore({
  db: settings.db
});

app.configure(function() {
  app.set('port', process.env.PORT || settings.port);
  app.set('views', "" + __dirname + "/views");
  app.set('view engine', 'ejs');
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.favicon('public/favicon.ico'));
  app.use(express.methodOverride());
  app.use(express.cookieParser(settings.cookie));
  app.use(express.session({
    secret: settings.cookie,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30 * 12
    },
    store: mongoStore
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express["static"](path.join(__dirname, "public")));
  return app.use(app.router);
});

app.get("/", routes.index);

app.get("/logout", routes.logout);

app.get("/settings/delete/account", routes.removeAccount);

app.get("/login/success", routes.loginSuccess);

app.get("/login/fail", routes.loginFail);

app.get("/auth/facebook", passport.authenticate("facebook", {
  scope: ['email', 'user_birthday']
}));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/login/success",
  failureRedirect: "/login/fail"
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  var Users;
  Users = mongoose.model('users');
  return Users.findOne({
    id: id
  }).exec(function(err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user.id);
    }
  });
});

passport.use(new FacebookStrategy(settings.facebook, function(accessToken, refreshToken, profile, done) {
  var Users;
  Users = mongoose.model('users');
  return Users.findOne({
    id: profile.id
  }).exec(function(err, data) {
    var user, _ref, _ref1;
    if (err) {
      return done(err);
    } else if (data) {
      done(null, data);
      return Users.update({
        id: data.id
      }, {
        $set: {
          hidden: true
        }
      });
    } else {
      user = new Users({
        id: profile.id,
        name: profile.displayName,
        username: profile.username,
        url: profile.profileUrl,
        gender: profile.gender,
        location: location.name,
        education: (_ref = profile._json.education) != null ? _ref[0].school.name : void 0,
        quotes: profile._json.quotes,
        bio: profile._json.bio,
        occupation: (_ref1 = profile._json.work) != null ? _ref1[0].position.name : void 0,
        email: profile._json.email,
        birthday: profile._json.birthday
      });
      return user.save(function(err) {
        if (err) {
          return done(err);
        } else {
          return done(null, user);
        }
      });
    }
  });
}));

/*
cluster = require("cluster")
numCPUs = require("os").cpus().length
if cluster.isMaster
  
  # Fork workers.
  i = 0
  while i < numCPUs
    cluster.fork()
    i++

  # Revive dead worker
  cluster.on "exit", (worker, code, signal) ->
    console.log "worker " + worker.process.pid + " died"
    cluster.fork()

else
*/


server.listen(app.get("port"), function() {
  return console.log("Express server listening on port " + app.get("port"));
});
