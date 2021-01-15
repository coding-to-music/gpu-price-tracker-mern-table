const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
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
});

userSchema.plugin(uniqueValidator, { message: 'is already taken' });

const User = mongoose.model('user', gpuSchema);

module.exports = User;
