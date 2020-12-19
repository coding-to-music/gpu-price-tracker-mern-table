const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const axios = require('axios');
const cheerio = require('cheerio');

const scraper = require('./scraper');
const Gpu = require('./models/gpu.model');

require('dotenv').config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to DB
const URI = process.env.ATLAS_URI;

mongoose.connect(URI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
	console.log('Connected to MongoDB datebase!');
});

// API routes
const routes = require('./routes/index');
app.use('/', routes);

// start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
