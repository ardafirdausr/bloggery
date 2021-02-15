module.exports = {
  projectId: process.env.GCS_PROJECT_ID || '',
  clientEmail: process.env.GCS_CLIENT_EMAIL || '',
  privateKey: process.env.GCS_PRIVATE_KEY || '',
  bucketName: process.env.GCS_BUCKET_NAME || '',
}