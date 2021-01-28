const { matchedData } = require('express-validator');

const { User } = require('../models');
const mailService = require('../services/mail');

exports.register = async (req, res, next) => {
	try {
		let userData = matchedData(req, { locations: ['body'] });
		let user = await User.create(userData);
		return res.status(201).json({ message: 'Success', data: user.toJSON() });
	} catch (err) {
		console.log(err.message);
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
		}
		let token = user.generateToken();
		return res.status(200).json({ message: 'Success', data: user, token });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

exports.resetPasswordRequest = async (req, res, next) => {
	try {
		let requestData = matchedData(req, { locations: ['body'] });
		let user = await User.findOne({ email: requestData.email });
		if (!user) {
			return res.status(400).json({ message: 'Email is not registered yet' });
		}
		await user.updateResetPasswordToken().save();
		await mailService.sendResetPasswordMail(user);
		return res.status(200).json({ message: 'Success' });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
}

exports.resetPassword = async (req, res, next) => {
	try {
		let requestData = matchedData(req);
		let user = await User.findOne({ resetPasswordToken: requestData.resetPasswordToken }).select(['+password']);
		if (!user) {
			return res.status(400).json({ message: 'Invalid reset password token' });
		}
		await user.set('password', requestData.newPassword);
		await user.save();
		return res.status(200).json({ message: 'Success' });
	} catch (err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error' });
	}
}
