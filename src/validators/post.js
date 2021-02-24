const mongoose = require('mongoose');
const { check, body } = require('express-validator');

exports.getPost = [
	check('postId')
		.notEmpty()
		.withMessage('postId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value)),
];

exports.createPost = [
	body('title')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('title cannot be empty')
		.isString()
		.withMessage('title must be string'),
	body('content')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('title cannot be empty')
		.isString()
		.withMessage('title must be string'),
];

exports.updatePost = [
	check('postId')
		.notEmpty()
		.withMessage('postId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value)),
	body('title')
		.optional()
		.trim()
		.escape()
		.notEmpty()
		.withMessage('title cannot be empty')
		.isString()
		.withMessage('title must be string'),
	body('content')
		.optional()
		.trim()
		.escape()
		.notEmpty()
		.withMessage('title cannot be empty')
		.isString()
		.withMessage('title must be string'),
];

exports.deletePost = [
	check('postId')
		.notEmpty()
		.withMessage('postId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value)),
];