const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const path = require('path');

require('dotenv').config({ path: '../.env' });

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
app.use(routes);

// Routing for heroku
if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, '../client/build')));
	// Handle React routing, return all requests to React app
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
	});
}

// start server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
