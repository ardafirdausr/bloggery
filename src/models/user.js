const { Schema, SchemaTypes, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { jwtKey, jwtExp } = require('../../config/auth');

const userSchema = new Schema({
	name: {
		type: SchemaTypes.String,
		required: true,
		trim: true
	},
	email: {
		type: SchemaTypes.String,
		unique: true,
		required: true,
		trim: true,
		index: true
	},
	bio: {
		type: SchemaTypes.String,
		required: false,
		default: null,
		trim: true,
	},
	photo: {
		type: SchemaTypes.String,
		required: false,
		default: null,
	},
	password: {
		type: SchemaTypes.String,
		required: true,
		select: false,
		trim: true
	},
	resetPasswordToken: {
		type: SchemaTypes.String,
		required: false,
		default: null,
		select: false,
	}
}, {
	timestamps: true,
	toJSON: { getters: true, useProjection: true }
});

userSchema.methods.comparePassword = async function(password) {
	try {
		return bcrypt.compare(password, this.password);
	} catch(err) {
		return Promise.reject('Invalid Password');
	}
}

userSchema.methods.generateToken = function() {
	return jwt.sign({
		id: this._id,
		email: this.email
	}, jwtKey, {
		expiresIn: jwtExp
	})
}

userSchema.statics.generateResetPasswordToken = function() {
	const resetToken = crypto.randomBytes(20).toString('hex');
	const token = crypto.createHash('sha256').update(resetToken).digest('hex');
	return token;
}

userSchema.methods.updateHashPassword = async function() {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
}

userSchema.pre('save', async function(next) {
	if (this.isModified('password')) {
		await this.updateHashPassword();
	}
	next();
});

module.exports = model('User', userSchema)
