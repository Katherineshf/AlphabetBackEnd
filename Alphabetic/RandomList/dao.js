import model from './model.js';

//get all ideas for random
export const getRandomIdeas = async () => {
  try {
    // get all ideas and randomly sample them
    const ideas = await model.aggregate([
      { $sample: { size: 10 } },
      { $project: { letter: 1, idea: 1 } }  // only return these fields
    ]);
    return ideas;
  } catch (error) {
    throw new Error('Error fetching random ideas: ' + error.message);
  }
};

//add a new idea
export const addIdea = async (ideaData) => {
  const newIdea = new model(ideaData);
  await newIdea.save(); // save idea to database
  return newIdea;
};


// fetch ideas by their letter
export const searchIdeaByLetter = async (letter) => {
  try {
    //get ideas that match the letter (case-insensitive)
    const ideas = await model.find({ letter: new RegExp(`^${letter}`, 'i') });  // Use regex for case-insensitive search
    return ideas;
  } catch (error) {
    throw new Error('Error fetching ideas by letter: ' + error.message);
  }
};

// fetch an idea by its ID
export const getIdeaById = async (ideaId) => {
  try {
    const idea = await model.findById(ideaId); 
    return idea;
  } catch (error) {
    throw new Error('Error fetching idea by ID: ' + error.message);
  }
};
