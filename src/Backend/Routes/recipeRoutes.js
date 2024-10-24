const express = require('express');
const Recipe = require('../Models/recipeModel');
const authenticate = require('../Middleware/authMiddleware');

const router = express.Router();

// Route to handle recipe form submissions
router.post('/submit-recipe', authenticate, async (req, res) => {
    console.log('Received request to /submit-recipe');
    console.log('\nUser ID from Token: ', req.userId);
    
    const { title, description, instructions, ingredients } = req.body;

    const newRecipe = new Recipe({
        title,
        description,
        instructions,
        ingredients,
        userId: req.userId,
    });

    try {
        console.log('Attempting to save recipe:', newRecipe);
        await newRecipe.save();
        console.log('Recipe saved successfully');
        return res.status(201).json({ message: 'Recipe saved successfully!' });
    } catch (error) {
        console.log('Error saving recipe: ', error);
        return res.status(500).json({ error: 'Error saving recipe', details: error.message });
    }
});

// Route to fetch all recipes for the logged-in user
router.get('/my-recipes', authenticate, async (req, res) => {
    const userId = req.userId; // Extract userId from middleware

    try {
        const recipes = await Recipe.find({ userId }).sort({ createdAt: -1});
        return res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({ error: 'Error fetching recipes' });
    }
});

// Route to fetch a specific recipe by ID
router.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

module.exports = router;
