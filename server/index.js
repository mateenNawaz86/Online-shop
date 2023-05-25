const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// function for connecting to database
const connectedToMongo = require("./util/database");
connectedToMongo();

const app = express();
const port = process.env.PORT || 8000;

// Routes import
const shopRoute = require("./routes/shop");
const adminRoute = require("./routes/admin");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors function used to provide the data from server to different domain easily
app.use(cors());

// Routes
app.use("/api", adminRoute);
app.use(shopRoute);

// APP listening
app.listen(port, () => {
  console.log(`Online-shop application listening on ${port}`);
});
