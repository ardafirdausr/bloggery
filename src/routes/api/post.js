const express = require('express');
const router = express.Router();

const requestValidator = require('../../middlewares/requestValidator');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const postValidator = require('../../validators/post');
const postController = require('../../controllers/post');

/**
 * GET /api/posts/:postId
 * Get a post
 */
router.get(
	'/:postId',
	requestValidator(postValidator.getPost),
	postController.getPost,
);

/**
 * POST /api/posts/
 * create new post
 */
router.post(
	'/',
	isAuthenticated,
	requestValidator(postValidator.createPost),
	postController.createPost,
);

/**
 * PUT /api/posts/:postId
 * create new post
 */
router.put(
	'/:postId',
	isAuthenticated,
	requestValidator(postValidator.updatePost),
	postController.updatePost,
);

/**
 * DELETE /api/posts/:postId
 * create new post
 */
router.delete(
	'/:postId',
	isAuthenticated,
	requestValidator(postValidator.deletePost),
	postController.deletePost,
);

module.exports = router;