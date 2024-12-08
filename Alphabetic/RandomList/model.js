import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
    letter: { type: String, required: true },  // The letter corresponding to the idea (e.g., "A" for Art Museum)
    idea: { type: String, required: true },  // Idea text
    description: { type: String, required: true },  // Description of the idea
    url: { type: String, required: true },  // A URL or link related to the idea
    contributorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    },
    contributorName: { 
        type: String, 
        required: true 
    },
    createdAt: { type: Date, default: Date.now },
});

const Idea = mongoose.model('Idea', ideaSchema);
export default Idea;
