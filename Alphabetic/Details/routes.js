import express from 'express';
import * as dao from './dao.js';

export default function DetailsRoutes(app) {
    // Get idea details by ID
    app.get('/api/ideas/:ideaId', async (req, res) => {
        try {
            const idea = await dao.getIdeaDetails(req.params.ideaId);
            res.json(idea);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });
} 