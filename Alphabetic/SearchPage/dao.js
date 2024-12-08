import axios from 'axios';
import model from '../RandomList/model.js';  // Assuming you're querying ideas from your local DB

// Fetch ideas by letter from the local database
export const searchIdeaByLetter = async (letter) => {
    const ideas = await model.find({ letter: new RegExp(`^${letter}`, 'i') });
    return ideas;
};

// Fetch personalized ideas from an external API
export const getPersonalizedIdeas = async (preferences) => {
  try {
    const apiUrl = 'https://external-api.com/ideas';
    const response = await axios.post(apiUrl, { preferences });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching personalized ideas: ' + error.message);
  }
};
