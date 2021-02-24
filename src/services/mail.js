const nodemailer = require('nodemailer');
const hbs = require("nodemailer-express-handlebars");

const appConfig = require('../../config/app');
const mailConfig = require('../../config/mail');

const transporterOptions = {
	host: mailConfig.host,
	port: mailConfig.port,
	secure: true,
	auth: {
		user: mailConfig.username,
		pass: mailConfig.password
	}
}

var templateEngineOptions = {
	viewEngine: {
		extname: '.hbs',
		layoutsDir: './src/views/mail',
		defaultLayout: 'simple',
	},
	viewPath: './src/views/mail',
	extName: '.hbs'
}

const transporter = nodemailer
	.createTransport(transporterOptions)
	.use('compile', hbs(templateEngineOptions));

exports.sendResetPasswordMail = async (user) => {
	let resetPasswordUrl = `${appConfig.appUrl}/reset-password?token=${user.resetPasswordToken}`;
	return transporter.sendMail({
		from: mailConfig.fromAddress,
		to: user.email,
		subject: 'Reset Password',
		template: 'simple',
		context: {
			title: "Reset Password",
			header: "Reset Password",
			openingText: `Hi ${user.name},`,
			firstText: `Click button below to reset your password`,
			buttonLink: resetPasswordUrl,
			buttonText: "Reset Password",
			secondText: "If the button is not working, you can reset your password by clicking on this url",
			closingText: resetPasswordUrl,
			withFooter: false
		}
	})
}
