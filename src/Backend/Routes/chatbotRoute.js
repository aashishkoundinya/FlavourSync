const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Recipe = require('../Models/recipeModel');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/api/chatbot', async (req, res) => {
    const { question } = req.body;

    try {
        const userRecipes = await Recipe.find({ user: req.userId });

        if (!userRecipes.length) {
            return res.json({ answer: 'You have no recipes saved. Please add some recipes to ask questions about.' });
        }

        const recipeList = userRecipes.map(recipe => {
            const date = new Date(Date.parse(recipe.createdAt));
            const formattedDate = date.toLocaleDateString();
        
            const ingredientsDetails = recipe.ingredients.map(ingredient => (
                `${ingredient.value || 'N/A'} ${ingredient.measurement || ''} of ${ingredient.name} - ${ingredient.note || 'No notes'}`
            )).join(', ');
        
            return `
                Recipe Title: ${recipe.title}
                Description: ${recipe.description}
                Ingredients: ${ingredientsDetails}
                Instructions: ${recipe.instructions}
                Submission Date: ${formattedDate}
                Submitted By: ${recipe.username}
            `;
        }).join('\n');        

        const prompt = `
            You are a helpful cooking chatbot. Here is a list of recipes available to the user:\n${recipeList}\nUser Question: ${question}\nRespond with relevant advice or details from the recipes where appropriate.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const response = await model.generateContent([prompt]);

        console.log("Gemini Response: ", response);
        console.log(req.userId);

        return res.json({ answer: response.response.text() });
    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        return res.status(500).json({ answer: 'An error occurred while processing your request.' });
    }
});

module.exports = router;
