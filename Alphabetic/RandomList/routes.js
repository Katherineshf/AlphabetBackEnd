import express from 'express';
import * as dao from './dao.js'; // Import DAO functions for HomePage

export default function HomePageRoutes(app) {
  //get random ideas
  const allRandomIdeas = async (req, res) => {
    const ideas = await dao.getRandomIdeas(req.body); // Fetch random ideas
    res.json(ideas);
  }

  //add a new idea (only for contributors)
  const addIdea = async (ideaData) => {
    const currentUser = req.session['currentUser'];

    if (!currentUser || currentUser.role !== 'CONTRIBUTOR') {
      return res.status(403).json({ message: 'You do not have permission to add ideas.' });
    }

    const newIdea = new model(ideaData);
    await newIdea.save(); // save to the database
    return newIdea;
  }

  app.get('/api/random-ideas', allRandomIdeas); 
  app.post('/api/random-ideas', addIdea);
}