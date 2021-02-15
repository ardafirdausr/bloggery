module.exports = {
	jwtKey: process.env.JWT_KEY || 'bloggery-app-secret-key',
	jwtExp: process.env.JWT_EXP || '1d',
}
