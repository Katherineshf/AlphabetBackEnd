import axios from 'axios';

// Function to fetch personalized ideas from an external API
export const getPersonalizedIdeas = async (preferences) => {
  try {
    const apiUrl = process.env.EXTERNAL_API_URL;
    const response = await axios.post(apiUrl, { preferences });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching personalized ideas: ' + error.message);
  }
};
