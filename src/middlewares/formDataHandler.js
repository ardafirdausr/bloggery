const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	filename: (req, file, cb) => {
		let originalName =  file.originalname.replace(/\..*/g, '');
		let fileExtension = path.extname(file.originalname);
		let filename = Date.now() + '_' + originalName + fileExtension;
		cb(null, filename);
	}
});

const imageFilter = (req, file, cb) => {
	let isImage = file.mimetype === 'file|images|jpeg,jpg,png';
	cb(null, isImage);
}

const imageLimit = { fieldSize: 5 * 1024 * 1024 }

module.exports = (type) => {
	if (type === 'image') {
		return multer({
			storage,
			limit: imageLimit,
			fileFilter: imageFilter
		});
	}

	throw new Error('Invalid form data handler type')
}