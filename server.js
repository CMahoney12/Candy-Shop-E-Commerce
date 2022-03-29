// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express");
const path = require("path")
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require("express-handlebars");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Requiring passport as we've configured it
// var passport = require("./config/passport");

// Compress
// var compression = require('compression')

// session
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

// compress all responses
// app.use(compression())

// Requiring our models for syncing
// var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sess));

// Static directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

// app.use(passport.initialize());
// app.use(passport.session());

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT));
});
