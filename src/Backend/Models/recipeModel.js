const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    instructions: {
        type: String, 
        required: true
    },
    ingredients: [
        {
            name: String,
            measurement: String,
            value: String,
            note: String,
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe;
