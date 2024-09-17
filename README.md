# 🍽️ Recipe Sharing Platform

## Overview
This Recipe Sharing Platform is a web application that allows users to create, store, and display recipes. Users can add recipes by providing a title, description, ingredients, and instructions, which are saved locally in a `.json` file. The website features a **My Recipes** section where all submitted recipes are displayed, and a **search bar** to filter through recipes in real-time.

## Features
- 📝 **Add Recipes**: Users can submit new recipes including the title, description, ingredients, and instructions.
- 🗂️ **Recipe Storage**: Recipes are saved locally in a `.json` file, which stores the recipe details like title, ingredients, and instructions.
- 🔍 **Search Functionality**: The **My Recipes** section includes a search bar that filters recipes dynamically as you type.
- 📱 **Responsive Design**: The website is fully responsive and adjusts to different screen sizes, showing fewer recipe cards per row on smaller devices.

## Technologies Used
- **HTML5**: Structure and content of the website.
- **CSS3**: Styling, including responsive layouts for different screen sizes.
- **JavaScript**: Dynamic functionalities such as search filtering and updating recipe cards.
- **JSON**: Storing recipe data locally in a `.json` file.

## How it Works
1. **Recipe Submission**: 
   - The user submits a recipe via a form that includes fields for the recipe title, description, ingredients, and instructions.
   - The submitted data is stored in a local `.json` file.
   
2. **My Recipes Section**:
   - The recipes saved in the `.json` file are displayed on the **My Recipes** page in a card layout.
   - Each card shows the title, description, and a link to the full recipe details.

3. **Search Functionality**:
   - A search bar on the **My Recipes** page filters the displayed recipes as the user types. It only shows the recipes that match the search query (title).

## Local JSON Storage
- Recipes are stored in a local `.json` file, where each recipe is saved as an object with the following properties:
  ```json
  {
      "title": "Pizza",
      "description": "A baked flatbread topped with tomato sauce, cheese, and various toppings.",
      "instructions": "Bake the dough at 200°C for 15 minutes, then add the sauce, cheese, and toppings."
      "ingredients": [
          "Dough",
          "Tomato Sauce",
          "Cheese",
          "Toppings"
      ]
  }

**Clone the repository:**

   ```bash
   git clone https://github.com/your-username/NoSQL-Website-Project