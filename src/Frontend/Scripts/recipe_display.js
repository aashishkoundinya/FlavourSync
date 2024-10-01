document.addEventListener('DOMContentLoaded', () => {
    const recipesContainer = document.getElementById('recipesContainer');

    // if (localStorage.length === 0) {
    //     recipesContainer.textContent = 'No recipes found. Submit a recipe to see it here.';
    //     return;
    // }

    for (let i = 0; i < localStorage.length; i++) {
        const recipeKey = localStorage.key(i);
        const recipe = JSON.parse(localStorage.getItem(recipeKey));

        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const title = document.createElement('h2');
        title.textContent = recipe.title;

        const instructions = document.createElement('p');
        instructions.textContent = recipe.instructions;

        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = `${ingredient.name}: ${ingredient.value} ${ingredient.measurement}`;
            ingredientsList.appendChild(listItem);
        });

        recipeDiv.appendChild(title);
        recipeDiv.appendChild(instructions);
        recipeDiv.appendChild(ingredientsList);

        recipesContainer.appendChild(recipeDiv);
    }
});
