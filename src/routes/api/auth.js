const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth');
const validator = require('../../validators/auth');
const requestValidator = require('../../middlewares/requestValidator');

/**
 * POST /api/auth/register
 * Register new user
 */
router.post(
		'/register',
		requestValidator(validator.register),
		authController.register
);

/**
 * POST /api/auth/login
 * Login user
 */
router.post(
	'/login',
	requestValidator(validator.login),
	authController.login
);

/**
 * POST /api/auth/reset-password-request
 * Send reset password token
 */
router.post(
	'/reset-password-request',
	requestValidator(validator.resetPasswordRequest),
	authController.resetPasswordRequest
);

/**
 * POST /api/auth/reset-password
 * Reset password
 */
router.post(
	'/reset-password',
	requestValidator(validator.resetPassword),
	authController.resetPassword
);

module.exports = router;
