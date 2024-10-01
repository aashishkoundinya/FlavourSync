const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // Add any other fields you want here (e.g., ingredients, instructions, etc.)
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
