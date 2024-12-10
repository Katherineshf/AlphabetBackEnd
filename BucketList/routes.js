// BucketList/routes.js
import * as dao from './dao.js';

export default function BucketListRoutes(app) {
  // Authentication middleware
  const authMiddleware = (req, res, next) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      return res.status(401).json({ message: "You must be logged in" });
    }
    req.user = currentUser;
    next();
  };

  // Add an idea to bucket list
  const addToBucketList = async (req, res) => {
    try {
      const { ideaId } = req.body;
      const userId = req.user.id;
      const bucketList = await dao.addIdea(userId, ideaId);
      res.status(200).json(bucketList);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Remove an idea from bucket list
  const removeFromBucketList = async (req, res) => {
    try {
      const { ideaId } = req.params;
      const userId = req.user.id;
      const bucketList = await dao.removeIdea(userId, ideaId);
      res.status(200).json(bucketList);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Get user's bucket list
  const getBucketList = async (req, res) => {
    try {
      const userId = req.user.id;
      const ideas = await dao.findBucketList(userId);
      res.status(200).json(ideas);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };

  // Define routes
  app.post("/api/bucket-list/add", authMiddleware, addToBucketList);
  app.delete("/api/bucket-list/remove/:ideaId", authMiddleware, removeFromBucketList);
  app.get("/api/bucket-list", authMiddleware, getBucketList);
}