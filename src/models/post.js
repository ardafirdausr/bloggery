const { Schema, SchemaTypes, model } = require('mongoose');

const postSchema = new Schema({
	title: {
		type: SchemaTypes.String,
		required: true,
		trim: true
	},
	content: {
		type: SchemaTypes.String,
		required: true,
		trim: true,
	},
	user: {
		type: SchemaTypes.ObjectId,
		ref: 'User'
	}
}, {
	timestamps: true,
	toJSON: { getters: true, useProjection: true }
});

module.exports = model('Post', postSchema)
