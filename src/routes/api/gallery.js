const express = require('express');
const router = express.Router();

const isAuthenticated = require('../../middlewares/isAuthenticated');
const formDataHandler = require('../../middlewares/formDataHandler');
const requestValidator = require('../../middlewares/requestValidator');
const galleryController = require('../../controllers/gallery');
const galleryValidator = require('../../validators/gallery')

/**
 * GET /api/gallery
 * Get all user gallery
 */
router.get(
	'/',
	isAuthenticated,
	galleryController.getUserGallery
)

/**
 * POST /api/gallery
 * Create new photo to user gallery
 */
router.post(
	'/',
	isAuthenticated,
	formDataHandler('image').single('photo'),
	requestValidator(galleryValidator.insertPhotoToGallery),
	galleryController.insertPhotoToGallery
)

/**
 * PUT /api/gallery/:photoId
 * Create new photo to user gallery
 */
router.put(
	'/:photoId',
	isAuthenticated,
	formDataHandler('image').single('photo'),
	requestValidator(galleryValidator.updateGalleryPhoto),
	galleryController.updatePhoto
);

/**
 * Delete /api/gallery/:photoId
 * Create new photo to user gallery
 */
router.delete(
	'/:photoId',
	isAuthenticated,
	requestValidator(galleryValidator.deletePhoto),
	galleryController.deletePhoto
);

module.exports = router;
