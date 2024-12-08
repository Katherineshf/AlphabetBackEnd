import express from 'express';
import * as dao from './dao.js';  // Importing the DAO functions

export default function SearchPageRoutes(app) {
  // Route to search for ideas by their letter
  app.get('/api/search/idea-by-letter/:letter', async (req, res) => {
    const { letter } = req.params;
    try {
      const ideas = await dao.searchIdeaByLetter(letter);  // Fetch ideas by letter from local DB
      res.json(ideas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Route to fetch personalized ideas (if needed)
  app.post('/api/search/personalized', async (req, res) => {
    const { preferences } = req.body;
    try {
      const personalizedIdeas = await dao.getPersonalizedIdeas(preferences);  // Fetch from external API
      res.json(personalizedIdeas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}
