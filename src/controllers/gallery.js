const { matchedData } = require('express-validator');

const { Photo } = require('../models');
const { uploadImage } = require('../services/storage');

exports.getUserGallery = async (req, res, next) => {
	try {
		let userGallery = await Photo.find({ user: req.user });
		return res.status(200).json({ message: 'Success', data: userGallery });
	} catch(err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

exports.insertPhotoToGallery = async(req, res, next) => {
	try {
		let photoData = matchedData(req, { locations: ['body'] });
		photoData['photo'] = await uploadImage(req.file, 'gallery');
		photoData['user'] = req.user;
		let photo = await Photo.create(photoData);
		return res.status(201).json({ message: 'success', data: photo });
	} catch(err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

exports.updatePhoto = async (req, res, next) => {
	try {
		let photoId = req.params.photoId;
		let photo = await Photo.findById(photoId);
		if (!photo) {
			return res.status(404).json({ message: "Photo not found"})
		}

		if (photo.user._id.toString() != req.user._id.toString()) {
			return res.status(403).json({ message: "Unauthorize"})
		}

		let photoData = matchedData(req, { locations: ['body'] });
		photoData['photo'] = await uploadImage(req.file, 'gallery');
		photoData['user'] = req.user;
		photo = await Photo.findOneAndUpdate({ _id: photoId }, { $set: photoData }, { new: true });;
		return res.status(201).json({ message: 'success', data: photo });
	} catch(err) {
		console.log(err);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}

exports.deletePhoto = async (req, res, next) => {
	try {
		let photoId = req.params.photoId;
		let photo = await Photo.findById(photoId);

		if (!photo) {
			return res.status(404).json({ message: "Photo not found"})
		}

		if (photo.user._id.toString() != req.user._id.toString()) {
			return res.status(403).json({ message: "Unauthorize"})
		}

		await photo.delete();
		return res.status(204).json();
	} catch(err) {
		console.log(err.message);
		return res.status(500).json({ message: 'Internal server error'});
	}
}