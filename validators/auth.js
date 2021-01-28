const { check, body } = require('express-validator');
const User = require('../models/user');

exports.register = [
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
		.custom(async value => {
			let user = await User.findOne({ email: value});
			if (user) {
				return Promise.reject('Email is already registered')
			}
		}),
	body('password')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isString()
		.withMessage('Password must be string'),
	body('passwordConfirmation')
		.trim()
		.escape()
		.if(body('password').exists())
		.isString()
		.withMessage('Password confirmation must be string')
		.notEmpty()
		.withMessage('Password confirmation cannot be empty')
		.custom((value, { req }) => value === req.body.password),
];

exports.login = [
	body('email')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Email cannot be empty')
		.isString()
		.withMessage('Email must be string'),
	body('password')
		.trim()
		.unescape()
		.notEmpty()
		.withMessage('Password cannot be empty')
		.isString()
		.withMessage('Password must be string'),
];

exports.resetPasswordRequest = [
	body('email')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Email cannot be empty')
		.isString()
		.withMessage('Email must be string'),
];

exports.resetPassword = [
	check('resetPasswordToken')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Reset Password Token must be provided'),
	body('oldPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Old password cannot be empty')
		.isString()
		.withMessage('Old password must be string'),
	body('newPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('New password cannot be empty')
		.isString()
		.withMessage('New password must be string'),
	body('newPasswordConfirmation')
		.trim()
		.escape()
		.if(body('newPassword').exists())
		.isString()
		.withMessage('Password confirmation must be string')
		.notEmpty()
		.withMessage('Password confirmation cannot be empty')
		.custom((value, { req }) => value === req.body.newPassword),
]
