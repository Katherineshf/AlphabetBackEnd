// Alphabetic/Personalized/routes.js
import express from 'express';
import * as dao from './dao.js'; // Import the DAO functions
//import { checkAuth } from '../User/dao.js'; // Import the checkAuth middleware (assuming you have it)

export default function PersonalizedRoutes(app) {
  // Route to collect user preferences and fetch personalized ideas
  const getPersonalizedIdeas = async (req, res) => {
    const currentUser = req.session['currentUser'];

    // Ensure the user is authenticated
    if (!currentUser) {
      return res.status(401).json({ message: 'User not logged in' });
    }

    // Get the user's preferences from the request body
    const preferences = req.body.preferences;

    // Fetch personalized ideas using the preferences
    try {
      const personalizedIdeas = await dao.getPersonalizedIdeas(preferences);
      res.status(200).json(personalizedIdeas); // Send the personalized ideas to the frontend
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Define the routes for personalized ideas
  app.post('/api/personalized-ideas', getPersonalizedIdeas); // Get personalized ideas
}
