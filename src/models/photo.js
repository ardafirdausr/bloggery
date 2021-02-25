const { Schema, SchemaTypes, model } = require('mongoose');

const photoSchema = new Schema({
	name: {
		type: SchemaTypes.String
	},
	photo: {
		type: SchemaTypes.String,
		required: true,
	},
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
});

photoSchema.index({ name: 1, user: 1 }, { unique: true })

module.exports = model('Photo', photoSchema);
