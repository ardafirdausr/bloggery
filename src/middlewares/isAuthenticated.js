const jwt = require('jsonwebtoken');

const { jwtKey } = require('../../config/auth');
const { User } = require('../models');

module.exports = async (req, res, next) => {
	try {
		let authorization = req.headers.authorization;
		if (!authorization && !authorization.startsWith('Bearer')) {
			throw new Error();
		} else {
			let token = authorization.split(' ')[1];
			let payload = jwt.verify(token, jwtKey);
			req.user = await User.findOne({ _id: payload.id });
			next();
		}
	} catch(err) {
		return res.status(401).json({ message: 'Unauthenticated' });
	}
}