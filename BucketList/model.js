import mongoose from 'mongoose';

const bucketListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }]
});

module.exports = mongoose.model('BucketList', bucketListSchema); 