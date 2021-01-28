require('dotenv').config();

module.exports = {
	jwtKey: process.env.JWT_KEY || 'medium-app-secret-key',
	jwtExp: process.env.JWT_EXP || '1d',
}
