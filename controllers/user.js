const { User } = require('../models');

exports.getUserProfile = (req, res, next) => {
	return res.status(200).json({
		message: 'success',
		data: req.user
	});
}
