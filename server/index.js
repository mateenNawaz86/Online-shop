const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const bodyParser = require("body-parser");
const connectedToMongo = require("./util/database");

const port = process.env.PORT || 7000;
const app = express();
app.use(cors());

// Routes imports
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

// function calling for connect to MONGODB
connectedToMongo();

// Middleware used for parsing a request body
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/api", adminRoute);
app.use(shopRoute);

app.listen(port, () => {
  console.log(`App is listening on the port ${port}`);
});
