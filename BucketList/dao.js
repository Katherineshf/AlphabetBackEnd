import BucketList from './model.js';

export const addIdeaToBucketList = async (userId, ideaId) => {
  let bucketList = await BucketList.findOne({ userId });
  if (!bucketList) {
    bucketList = new BucketList({ userId, ideas: [] });
  }

  if (!bucketList.ideas.includes(ideaId)) {
    bucketList.ideas.push(ideaId);
    await bucketList.save();
  }

  return bucketList;
};

export const removeIdeaFromBucketList = async (userId, ideaId) => {
  const bucketList = await BucketList.findOne({ userId });
  if (bucketList) {
    bucketList.ideas = bucketList.ideas.filter(id => id.toString() !== ideaId);
    await bucketList.save();
  }

  return bucketList;
};

export const getBucketList = async (userId) => {
  const bucketList = await BucketList.findOne({ userId }).populate('ideas');
  return bucketList ? bucketList.ideas : [];
}; 