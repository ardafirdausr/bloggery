module.exports = {
	mongoHost: process.env.MONGO_HOST || 'localhost',
	mongoPort: process.env.MONGO_PORT || '27017',
	mongoDatabase: process.env.MONGO_DATABASE || 'bloggery',
	mongoUser: process.env.MONGO_USER || 'root',
	mongoPassword:  process.env.MONGO_PASSWORD || '',
}
