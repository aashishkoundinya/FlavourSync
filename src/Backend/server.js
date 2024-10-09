const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const path1 = require('path');
const recipeRoutes = require('../Backend/Routes/recipeRoutes');
const Recipe = require('./Models/recipeModel')

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../Frontend')));
// app.use(express.static(path1.join(__dirname, '../src/Frontend/Scripts/recipe_display.js')));

app.get('/Scripts/recipe_display.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile(path1.join(__dirname, 'Frontend/Scripts/recipe_display.js'));
});

mongoose.connect('mongodb://localhost:27017/recipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

app.use('/', recipeRoutes);

app.get('/api/recipes', async (req, res) => {
    try {
        const recipes = await Recipe.find();
        console.log(recipes);
        res.json(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({ error: 'An error occurred while fetching recipes.' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
