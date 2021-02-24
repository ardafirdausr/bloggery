const mongoose = require('mongoose');
const { check, body } = require('express-validator');
const User = require('../models/user');

exports.getUser = [
	check('userId')
		.notEmpty()
		.withMessage('userId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value))
]

exports.updateProfile = [
	body('name')
		.optional()
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Name cannot be empty')
		.isString()
		.withMessage('Name must be string'),
	body('email')
		.optional()
		.normalizeEmail()
		.isEmail()
		.withMessage('Email must be valid email address')
		.custom(async (value, { req }) => {
			let userWithRequestedEmail = await User.findOne({ email: value});
			if (userWithRequestedEmail && req.user.email !== value) {
				return Promise.reject('Email is already registered')
			}
		}),
	body('bio')
		.optional()
		.trim()
		.isString()
		.withMessage('Bio must be string')
];

exports.updatePassword = [
	body('oldPassword')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('New password cannot be empty')
		.isString()
		.withMessage('New password must be string')
		.custom(async (value, { req }) => {
			req.user = await User.findOne({ email: req.user.email }).select(['+password']);
			let isCredentialValid = await req.user.comparePassword(value);
			if (!isCredentialValid) {
				return Promise.reject('Incorrect old password');
			}
		})
		.isString()
		.withMessage('New password must be string'),
	body('newPassword')
		.trim()
		.escape()
		.isString()
		.withMessage('Password must be string')
		.notEmpty()
		.withMessage('Password cannot be empty'),
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