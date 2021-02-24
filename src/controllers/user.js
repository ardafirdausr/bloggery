const { matchedData } = require('express-validator');

const { User } = require('../models');
const { uploadImage } = require('../services/storage');

exports.getUser = async (req, res, next) => {
	try {
		let user = await User.findById(req.params.userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		return res.status(200).json({ message: 'success', data: user.toJSON() });
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
		if (req.file != null) {
			userData['photo'] = await uploadImage(req.file, 'user');
		}

		let user = await User.findOneAndUpdate({ _id: req.user.id }, { $set: userData }, { new: true });
		return res.status(200).json({ message: 'Success', data: user.toJSON() });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}

exports.updateUserPassword = async (req, res, next) => {
	try {
		let passwordData = matchedData(req, { locations: ['body'] });
		req.user.set('password', passwordData.newPassword);
		await req.user.save();
		return res.status(200).json({ message: 'success', data: req.user });
	} catch(err) {
		console.log(err);
		return res.status(200).json({ message: 'Internal server error' });
	}
}
