import express from 'express';
import * as dao from './dao.js'; 

export default function RandomListRoutes(app) {
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

  const searchByLetter = async (req, res) => {
    try {
        const { letter } = req.params;
        const ideas = await dao.searchIdeaByLetter(letter);
        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: "Error searching ideas", error: error.message });
    }
  };

const getIdeaById = async (req, res) => {
  try {
      const { ideaId } = req.params;
      const idea = await dao.getIdeaById(ideaId);
      if (!idea) {
          return res.status(404).json({ message: "Idea not found" });
      }
      res.json(idea);
      } catch (error) {
        res.status(500).json({ message: "Error fetching idea", error: error.message });
    }
  };

  app.get('/api/ideas/random', allRandomIdeas);
  app.post("/api/ideas/submit", submitIdea);
  app.get('/api/ideas/search/:letter', searchByLetter);
  app.get('/api/ideas/:ideaId', getIdeaById);
}