const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructions: String,
    ingredients: [
        {
            name: String,
            measurement: String,
            value: String,
            note: String,
        },
    ],
});

module.exports = mongoose.model('Recipe', recipeSchema);
