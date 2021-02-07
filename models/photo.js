const { Schema, SchemaTypes, model } = require('mongoose');

const photoSchema = new Schema({
	name: {
		type: SchemaTypes.String
	},
	photo: {

	},
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true
});

photoSchema.path('photo').get = function() {
	return this.photo ? `https://hostname.com/image/${this.photo}` : null;
}

module.exports = model('Photo', photoSchema);