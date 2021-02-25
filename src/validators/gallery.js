const mongoose = require('mongoose');
const { body, check } = require('express-validator');
const { Photo } = require('../models');

exports.insertPhotoToGallery = [
	body('name')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Photo name cannot be empty')
		.isString()
		.withMessage('Photo name should be string')
		.custom(async (value, { req }) => {
			let userPhoto = await Photo.findOne({ user: req.user, name: value });
			if (userPhoto) {
				return Promise.reject('Photo name is already taken!')
			}
		}),
	body('photo')
		.custom((value, { req }) => {
			if (req.file != null) {
				return Promise.resolve()
			}
			return Promise.reject('Photo cannot be empty!')
		})
];

exports.updateGalleryPhoto = [
	check('photoId')
		.notEmpty()
		.withMessage('photoId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value)),
	body('name')
		.trim()
		.escape()
		.notEmpty()
		.withMessage('Photo name cannot be empty')
		.isString()
		.withMessage('Photo name should be string')
		.custom(async (value, { req }) => {
			let userPhoto = await Photo.findOne({
				user: req.user,
				name: value,
				_id: { $ne: req.params.photoId }
			});
			console.log(userPhoto);
			if (userPhoto) {
				return Promise.reject('Photo name is already taken!')
			}
		}),
	body('photo')
		.custom((value, { req }) => {
			if (req.file != null) {
				return Promise.resolve()
			}
			return Promise.reject('Photo cannot be empty!')
		})
]

exports.deletePhoto = [
	check('photoId')
		.notEmpty()
		.withMessage('photoId cannot be empty')
		.custom(value => mongoose.isValidObjectId(value)),
]