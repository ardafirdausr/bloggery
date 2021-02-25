const express = require('express');
const router = express.Router();

const requestValidator = require('../../middlewares/requestValidator');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const formDataHandler = require('../../middlewares/formDataHandler');
const userController = require('../../controllers/user');
const userValidator = require('../../validators/user');

/**
 * GET /users/profile
 * Get user profile
 */
router.get(
	'/profile',
	isAuthenticated,
	userController.getUserProfile
);

/**
 * GET /users/:id
 * Get user profile
 */
router.get(
	'/:userId',
	requestValidator(userValidator.getUser),
	userController.getUser
);

/**
 * PUT /users/profile/password
 * Update user profile
 */
router.put(
	'/profile/password',
	isAuthenticated,
	requestValidator(userValidator.updatePassword),
	userController.updateUserPassword
);

/**
 * PUT /users/profile
 * Update user profile
 */
router.put(
	'/profile',
	isAuthenticated,
	formDataHandler('image').single('photo'),
	requestValidator(userValidator.updateProfile),
	userController.updateUserProfile
);

module.exports = router;
