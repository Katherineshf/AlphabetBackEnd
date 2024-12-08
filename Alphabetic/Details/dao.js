import model from '../RandomList/model.js';

export const getIdeaDetails = async (ideaId) => {
    try {
        const idea = await model.findById(ideaId);
        if (!idea) {
            throw new Error('Idea not found');
        }
        return idea;
    } catch (error) {
        throw new Error('Error fetching idea details: ' + error.message);
    }
}; 