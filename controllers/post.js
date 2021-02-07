const { matchedData } = require('express-validator');
const { Post } = require('../models');

exports.getAllPosts = (req, res, next) => {
	let posts = Post.find({});
	return res.status(200).json({ message: 'success', data: posts });
}

exports.getPost = async (req, res, next) => {
	try {
		let postId = req.params.postId;
		let post = await Post.findOne({ _id: postId });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		return res.status(200).json({ message: 'success', data: post});
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}

exports.createPost = async (req, res, next) => {
	try {
		let postData = matchedData(req, { locations: ['body'] });
		postData.user = req.user;
		let post = await Post.create(postData);
		return res.status(201).json({ message: 'Success', data: post.toJSON() });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}

exports.updatePost = async (req, res, next) => {
	try {
		let postData = matchedData(req, { locations: ['body'] });
		let postId = req.params.postId;
		let post = await Post.findOneAndUpdate({ _id: postId }, { $set: postData }, { new: true });
		return res.status(201).json({ message: 'Success', data: post.toJSON() });
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}

exports.deletePost = async (req, res, next) => {
	try {
		await Post.deleteOne({ _id: req.params.postId });
		return res.status(204).json();
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}