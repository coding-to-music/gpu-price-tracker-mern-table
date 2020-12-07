const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// .env file
require("dotenv").config();

// express app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB datebase!');
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});