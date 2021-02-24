require('dotenv').config();

module.exports = {
	appUrl: process.env.URL || 'localhost:3000',
	appHost: process.env.HOST || 'localhost',
}
