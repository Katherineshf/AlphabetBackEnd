import axios from 'axios';

// Function to fetch personalized ideas from an external API
export const getPersonalizedIdeas = async (preferences) => {
  try {
    // Replace the URL below with the external API you are using
    const apiUrl = 'https://example.com/external-ideas-api';

    // Make a GET or POST request to the external API, passing the user's preferences as parameters
    const response = await axios.post(apiUrl, { preferences });

    // Return the data (personalized ideas)
    return response.data;
  } catch (error) {
    throw new Error('Error fetching personalized ideas: ' + error.message);
  }
};
