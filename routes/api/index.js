const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');

router.use('/api/auth', authRoutes);
router.use('/api/users', userRoutes);
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
