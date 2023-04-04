const express = require("express");
const path = require("path");

const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectedToMongo = require("./util/database");

const port = process.env.PORT || 7000;
const app = express();

// View Engine
app.set("view engine", "ejs");
app.set("views", "views");

// Routes imports
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

dotenv.config();
connectedToMongo();

// Middleware used for parsing a request body
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for serve static files to UI
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api", adminRoute);
app.use(shopRoute);

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
