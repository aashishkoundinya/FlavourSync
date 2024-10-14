const express = require('express');
const Recipe = require('../Models/recipeModel');

const router = express.Router();

// Route to handle recipe form submissions
router.post('/submit-recipe', async (req, res) => {
    const { title, description, instructions, ingredients } = req.body;

    console.log('Recipe Submitted: ', req.body);

    const newRecipe = new Recipe({
        title,
        description,
        instructions,
        ingredients,
    });

    try {
        await newRecipe.save();
        res.status(201).json({ message: 'Recipe saved successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving recipe' });
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
