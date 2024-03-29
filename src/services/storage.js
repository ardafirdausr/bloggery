const { Storage } = require('@google-cloud/storage')

const gcpConfig = require('../../config/gcp');

const storage = new Storage({
	projectId: gcpConfig.projectId,
	credentials: {
		client_email: gcpConfig.clientEmail,
		private_key: gcpConfig.privateKey,
	},
});

const bucket = storage.bucket(gcpConfig.bucketName)

exports.uploadImage = async (file, dir = "") => {
  try {
    dir = dir.replace(/\W/g, '');
    let destinationPath = ["image", dir, file.filename].filter(isValid => isValid).join('/');
    let blob = bucket.file(destinationPath)
    let uploadOptions = { destination: blob, public: true, gzip: true }
    let uploadedFile = await bucket.upload(file.path, uploadOptions);
    return uploadedFile[0].publicUrl();
  } catch(err) {
    return err
  }
}
