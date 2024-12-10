import model from "./model.js";

exports.addIdeaToBucketList = async (userId, ideaId) => {
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

exports.removeIdeaFromBucketList = async (userId, ideaId) => {
  const bucketList = await BucketList.findOne({ userId });
  if (bucketList) {
    bucketList.ideas = bucketList.ideas.filter(id => id.toString() !== ideaId);
    await bucketList.save();
  }

  return bucketList;
};

exports.getBucketList = async (userId) => {
  const bucketList = await BucketList.findOne({ userId }).populate('ideas');
  return bucketList ? bucketList.ideas : [];
}; 