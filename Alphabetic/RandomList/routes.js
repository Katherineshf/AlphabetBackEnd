import express from 'express';
import * as dao from './dao.js'; // Import DAO functions for HomePage

export default function HomePageRoutes(app) {
  //get random ideas
  const allRandomIdeas = async (req, res) => {
    const ideas = await dao.getRandomIdeas(req.body); 
    res.json(ideas);
  }

  //add a new idea (only for contributors
  const submitIdea = async (req, res) => {
    try {
        const currentUser = req.session["currentUser"];
        if (!currentUser || currentUser.role !== "CONTRIBUTOR") {
            return res.status(403).json({ message: "Only contributors can add ideas" });
        }

        const newIdea = await dao.addIdea({
            ...req.body,
            contributorId: currentUser._id,
            contributorName: currentUser.username
        });
        res.json(newIdea);
    } catch (error) {
        res.status(500).json({ message: "Error creating idea", error: error.message });
    }
  };

  app.get('/api/random-ideas', allRandomIdeas); 
  app.post("/api/ideas/submit", submitIdea);
}