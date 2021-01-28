const { matchedDatam } = require('express-validator');
const mongoose = require('mongoose');

const { User } = require('../models');

exports.getUser = async (req, res, next) => {
	try {
		let isValidObjectId = mongoose.isValidObjectId(req.params.userId);
		if (!isValidObjectId) {
			return res.status(404).json({ message: 'Invalid user id' });
		}
		let user = await User.findById(req.params.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'success', data: user });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

exports.getUserProfile = (req, res, next) => {
	return res.status(200).json({
		message: 'success',
		data: req.user
	});
}

exports.updateUserProfile = async (req, res, next) => {
	try {
		let userData = matchedData(req, { locations: ['body'] });
		await req.user.update(userData);
		return res.status(200).json({ message: 'Success', data: req.user });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}
