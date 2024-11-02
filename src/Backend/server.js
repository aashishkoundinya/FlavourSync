const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const recipeRoutes = require('../Backend/Routes/recipeRoutes');
const Recipe = require('./Models/recipeModel')
const authRoutes = require('../Backend/Routes/authenticationRoute');
const chatRoute = require('../Backend/Routes/chatbotRoute');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json())

app.use('/api', authRoutes);
app.use('/api', recipeRoutes); 
app.use('/api', chatRoute);
app.use('/', recipeRoutes);;

app.use(express.static(path.join(__dirname, '../Frontend')));
app.use(express.static(path.join(__dirname, '../Frontend/HTML')));
app.use('/CSS', express.static(path.join(__dirname, '../Frontend/CSS')));
app.use('/Assets', express.static(path.join(__dirname, '../Frontend/Assets')));
app.use('/Scripts', express.static(path.join(__dirname, '../Frontend/Scripts')));


mongoose.connect('mongodb://localhost:27017/recipes', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.log('MongoDB connection error:', error));

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
