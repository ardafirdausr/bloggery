const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const dbConfig = require('../../config/database')
const mongoUri = `mongodb://${dbConfig.mongoUser}:${dbConfig.mongoPassword}@${dbConfig.mongoHost}:${dbConfig.mongoPort}/${dbConfig.mongoDatabase}`

const basename = path.basename(__filename);
const models = [];

const connectDB = () => mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	useUnifiedTopology: true
}, err => {
	if (err) {
		console.log(mongoUri);
		throw err;
	}

	console.log('Mongo DB connected!');
})

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
		const model = require(path.join(__dirname, file));
    models[model.modelName] = model;
	});

module.exports = models;
module.exports.connectDB = connectDB;
