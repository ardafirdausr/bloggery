const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const postRoutes = require('./post');

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.use('/api/posts', postRoutes);

module.exports = router;