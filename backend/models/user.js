const { Schema, model } = require("mongoose");

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  saved: [{ type: String }],
});

const User = model("User", userSchema);

// const userDB = mongoose.connection.useDb("users");

// const User = userDB.model("user", userSchema);

module.exports = User;
