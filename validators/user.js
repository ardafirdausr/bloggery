const { header, body } = require('express-validator');
const User = require('../models/user');

exports.updateUserProfile = [
	body('name')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isString()
		.withMessage('Name must be string'),
	body('email')
		.normalizeEmail()
		.isEmail()
		.withMessage('Email must be valid email address')
		.custom(async (value, { req }) => {
			let user = await User.findOne({ email: value});
			if (user && req.user.email !== value) {
				return Promise.reject('Email is already registered')
			}
		}),
	body('bio')
		.trim()
		.isString()
		.withMessage('Bio must be string')
];