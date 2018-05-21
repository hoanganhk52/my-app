const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: {
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}
});

UserSchema.methods.toJSON = function () {
	let user = this;
	let userObj = user.toObject();

	return _.pick(userObj, ['_id', 'email']);
};

UserSchema.statics.findByToken = function (token) {
	let user = this;
	let decoded;

	try {
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}

	return user.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens = {access, token};

	return user.save().then(() => {
		return token;
	});

};

let User = mongoose.model('User', UserSchema);

module.exports = {User};