module.exports = {
	host: process.env.MAIL_HOST || 'smtp.gmail.com',
	port: process.env.MAIL_PORT || 465,
	username: process.env.MAIL_USERNAME || '',
	password: process.env.MAIL_PASSWORD || '',
	fromAddress: process.env.MAIL_FROM_ADDRESS || 'sudah.online',
	fromName: process.env.MAIL_FROM_NAME || 'medium@sudah.online',
}
