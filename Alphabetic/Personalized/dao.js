import axios from 'axios';

// fetch personalized ideas from an external API
export const getPersonalizedIdeas = async (preferences) => {
  try {
    const apiUrl = process.env.EXTERNAL_API_URL;
    const response = await axios.post(apiUrl, { preferences });
    //only return letter and idea name
    return response.data.map(idea => ({
        _id: idea._id,
        letter: idea.letter,
        idea: idea.idea
    }));
  } catch (error) {
    throw new Error('Error fetching personalized ideas: ' + error.message);
  }
};
