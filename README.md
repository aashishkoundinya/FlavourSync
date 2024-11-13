# Recipe Sharing Platform

## Overview
This Recipe Sharing Platform is a web application that allows users to create, store, and display recipes. Users can add recipes by providing a title, description, ingredients, and instructions, which are saved in a MongoDB Database. The website features a **Recipes** section where all submitted recipes are displayed, and a **search bar** to filter through recipes in real-time.

## Features
- 🔐 **Login**: Users need to register by verifying OTP sent to their email. Only then can they login to their account.
- ⚙️ **Password Reset**: Registered users can reset their password by verifying the OTP sent to their registered email.
- 📝 **Add Recipes**: Users can submit new recipes including the title, description, ingredients, and instructions.
- 🗂️ **Recipe Storage**: Recipes are stored in MongoDB, which stores the recipe details like title, ingredients, and instructions, user_id, Date and Time.
- 🤖 **ChatBot**: FlavourBot helps you to ask questions regarding the reicpes and helps you cook.
- 🔍 **Search Functionality**: The **Recipes** section includes a search bar that filters recipes dynamically as you type.
- 📱 **Responsive Design**: The website is fully responsive and adjusts to different screen sizes, showing fewer recipe cards per row on smaller devices.

## Prerequisites
Last run on these versions
* MongoDB (v7.0.14)
* MongoSH (v2.3.1)
* npm (v10.5.2)
* Node.js (v20.13.1)
* Express.js (v4.21.0)

**Important**
* CREATE a `.env file` in the root of the project directory with variables such as `JWT_SECRET` `EMAIL_USER` `EMAIL_PASS` `GEMINI_API_KEY` and assign your credentials to these variable.

## Technologies Used
- **HTML5**: Structure and content of the website.
- **CSS3**: Styling, including responsive layouts for different screen sizes.
- **JavaScript**: Dynamic functionalities such as search filtering and updating recipe cards.
- **MongoDB**: Storing recipe data in a DataBase using `documents`.
- **Node.js**: Used to run the backend server.
- **Express.js**: Used to define API endpoints for creating, reading, updating, and deleting recipes.
- **Gemini API**: It helps you ask personalised queries regarding the recipes that are available in the database.

## How it Works
1. **Login**:
   - New users can create a new account. **The user must verify the OTP sent to the entered email** to successfully register as a new user.
   - All passwords are encrypted and stored in MongoDB under a collection called `users`.
   - Existing users can log in normally. They can also reset their password by **Verifying the OTP sent to their registered email_id**.

2. **Recipe Submission**: 
   - The user submits a recipe via a form that includes fields for the recipe title, description, ingredients, and instructions.
   - The submitted data is stored in MongoDB as a Document.
   
3. **Recipes Section**:
   - The recipes saved in MongoDB are displayed on the **Recipes** page in a card layout.
   - Each card shows the title, description, and a link to the full recipe details.

4. **Search Functionality**:
   - A search bar on the **My Recipes** page filters the displayed recipes as the user types. It only shows the recipes that match the search query (title).

5. **Chatbot**:
   - It uses the **Google's Gemini API** to accept any queries regarding the recipes that are available in MongoDB to answer appropriately.

6. **Exporting**:
   - Stored recipes can be exported as a `.pdf` file using the built in feature.

## Run
- Before starting the server we need all the dependecies to run it.

   ```bash
   npm install express mongoose cors body-parser

- Start the server `server.js`.

   ```bash
   node server.js

## MongoDB Data Storage
- Recipes are stored in a `MongoDB` using `documents`, where each recipe is saved as an object with the following properties:

  ```json
  {
      "title": "Pizza",
      "description": "Italian Cuisine",
      "instructions": "Bake Well",
      "ingredients": [
         {
            "name": "Cheese",
            "measurement": "Grams (g)",
            "value": "100",
            "note": "Mozerella",
         }
      ],
      "userId": "ObjectId('6725ea5de8e37e8fe290ecf1')",
      "username": "aashishkoundinya",
      "createdAt": "ISODate('2024-11-02T11:03:31.968Z')",
  }

**Clone the repository:**

   ```bash
   git clone https://github.com/<your-username>/Recipe-Sharing-Platform
