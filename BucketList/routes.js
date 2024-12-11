import * as dao from './dao.js';

export default function BucketListRoutes(app) {
  // Authentication middleware remains the same
  const authMiddleware = (req, res, next) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "You must be logged in" });
      return;
    }
    req.user = currentUser;
    next();
  };

  // Add better error logging
  const addToBucketList = async (req, res) => {
    try {
      const { ideaId } = req.body;
      const userId = req.user.id;
      console.log(`Adding idea ${ideaId} to bucket list for user ${userId}`);
      const bucketList = await dao.addIdeaToBucketList(userId, ideaId);
      res.status(200).json(bucketList);
    } catch (error) {
      console.error('Error adding to bucket list:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const removeFromBucketList = async (req, res) => {
    try {
      const { ideaId } = req.params;
      const userId = req.user.id;
      console.log(`Removing idea ${ideaId} from bucket list for user ${userId}`);
      const bucketList = await dao.removeIdeaFromBucketList(userId, ideaId);
      res.status(200).json(bucketList);
    } catch (error) {
      console.error('Error removing from bucket list:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  const getBucketList = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(`Fetching bucket list for user ${userId}`);
      const ideas = await dao.getBucketList(userId);
      res.status(200).json(ideas);
    } catch (error) {
      console.error('Error getting bucket list:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Update routes to match frontend expectations
  app.post("/api/bucketlist/add", authMiddleware, addToBucketList);
  app.delete("/api/bucketlist/remove/:ideaId", authMiddleware, removeFromBucketList);
  app.get("/api/bucketlist", authMiddleware, getBucketList);
}