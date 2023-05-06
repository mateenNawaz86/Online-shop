const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const connectedToMongo = require("./util/database");
const User = require("./models/User");

const port = process.env.PORT || 7000;
const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Routes imports
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

// Package for access an env variables
const dotenv = require("dotenv");
dotenv.config();

// function calling for connect to MONGODB
connectedToMongo();

// Middleware used for parsing a request body
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for serve static files to UI
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6455ecc0f396556bc4d8ab18")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

// Routes
app.use("/api", adminRoute);
app.use(shopRoute);

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
