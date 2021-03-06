const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
// adding dotenv-json to hide SQL password
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();
// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// the app.set is middleware
app.set("view engine", "handlebars");

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// require our routes here:
require("./routes/html-routes.js")(app);
require("./routes/post-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);

db.sequelize.sync().then(function () {
  app.listen(PORT, () =>
    console.log(`...drift into the dreamstream... http://localhost:${PORT}`)
  );
});
