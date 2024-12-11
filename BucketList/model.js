import mongoose from 'mongoose';

const bucketListSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ideas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Idea' }]
}, { timestamps: true });

const BucketList = mongoose.model('BucketList', bucketListSchema);
export default BucketList; 