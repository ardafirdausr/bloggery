const express = require('express');
const router = express.Router();

const requestValidator = require('../../middlewares/requestValidator');
const isAuthenticated = require('../../middlewares/isAuthenticated');
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
router.get('/:userId', userController.getUser);

/**
 * PUT /users/profile
 * Update user profile
 */
router.put(
	'/profile',
	isAuthenticated,
	requestValidator(userValidator.updateUserProfile),
	userController.updateUserProfile
);

module.exports = router;