const express = require('express');
const Recipe = require('../Models/recipeModel'); // Import the Recipe model

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

module.exports = router;
