const express = require('express');
const router = express.Router();

const isAuthenticated = require('../../middlewares/isAuthenticated');
const userController = require('../../controllers/user');

/**
 * GET /users/profile
 * Get user profile
 */
router.get(
	'/profile',
	isAuthenticated,
	userController.getUserProfile
);

module.exports = router;