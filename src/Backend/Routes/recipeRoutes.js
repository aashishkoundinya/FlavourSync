const express = require('express');
const Recipe = require('../Models/recipeModel');
const User = require('../Models/userModel');
const authenticate = require('../Middleware/authMiddleware');

const router = express.Router();

// Route to handle recipe form submissions
router.post('/submit-recipe', authenticate, async (req, res) => {
    console.log('Received request to /submit-recipe');
    console.log('\nUser ID from Token: ', req.userId);
    
    const { title, description, instructions, ingredients } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newRecipe = new Recipe({
            title,
            description,
            instructions,
            ingredients,
            userId: req.userId,
            username: user.username,
        });

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
router.get('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id).select('title description instructions ingredients createdAt username');
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

// Route to fetch all recipes from all users
router.get('/all-recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });
        return res.json(recipes);
    } catch (error) {
        console.error('Error fetching all recipes:', error);
        return res.status(500).json({ error: 'Error fetching all recipes' });
    }
});


module.exports = router;
