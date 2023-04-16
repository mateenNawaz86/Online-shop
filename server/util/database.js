const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

// MONGODB URI
const mongoURI = process.env.MONGO_URI;

// function for connecting to MongoDB
const connectedToMongo = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      User.findOne().then((user) => {
        if (!user) {
          const user = new User({
            name: "Mateen Nawaz",
            email: "mateen@test.com",
            items: [],
          });
          user.save();
        }
      });
      console.log("Connected to MongoDB successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectedToMongo;
