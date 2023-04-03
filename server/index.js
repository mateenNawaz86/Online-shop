const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectedToMongo = require("./util/database");

// Routes imports
const shopRoute = require("./routes/shop");

const port = process.env.PORT || 7000;
const app = express();

dotenv.config();
connectedToMongo();

// Middleware used for parsing a request body
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(shopRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
