const { matchedData } = require('express-validator');

const { User } = require('../models');
const mailService = require('../services/mail');

exports.register = async (req, res, next) => {
	try {
		let userData = matchedData(req, { locations: ['body'] });
		let user = await User.create(userData);
		return res.status(201).json({ message: 'Success', data: user.toJSON() });
	} catch (err) {
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

exports.login = async (req, res, next) => {
	try {
		let requestData = matchedData(req, { locations: ['body'] });
		let user = await User.findOne({ email: requestData.email }).select(['+password']);
		let isUserCredentialValid = user
			? await user.comparePassword(requestData.password)
			: false;
		if (!isUserCredentialValid) {
			return res.status(400).json({ message: 'Invalid email or password' });
		} else {
			let token = user.generateToken();
			return res.status(200).json({ message: 'Success', data: user, token });
		}
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

exports.resetPasswordRequest = async (req, res, next) => {
	try {
		let requestData = matchedData(req, { locations: ['body'] });
		let user = await User.findOne({ email: requestData.email });
		if (!user) {
			return res.status(400).json({ message: 'Email is not registered yet' });
		} else {
			let token = await user.updateResetPasswordToken();
			await mailService.sendResetPasswordMail(user, token);
			return res.status(200).json({ message: 'Success' });
		}
	} catch(err) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}

exports.resetPassword = async (req, res, next) => {
	try {
		let requestData = matchedData(req);
		let user = await User.findOne({ resetPasswordToken: requestData.resetPasswordToken }).select(['+password']);
		let isUserCredentialValid = user ? await user.comparePassword(requestData.oldPassword) : false;
		if (!user) {
			return res.status(400).json({ message: 'Invalid reset password token' });
		} else if(!isUserCredentialValid) {
			return res.status(400).json({ message: 'Invalid old password' });
		} else {
			await user.update({ password: requestData.newPassword });
			return res.status(200).json({ message: 'Success' });
		}
	} catch (err) {
		return res.status(500).json({ message: 'Internal server error' });
	}
}
