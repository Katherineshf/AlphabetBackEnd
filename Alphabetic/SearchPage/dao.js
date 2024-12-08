import axios from 'axios';
import model from '../RandomList/model.js'; 

// Fetch ideas by letter from the local database
export const searchIdeaByLetter = async (letter) => {
    const ideas = await model.find({ letter: new RegExp(`^${letter}`, 'i') });
    return ideas;
};

