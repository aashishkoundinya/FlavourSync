console.log('recipe_display.js loaded successfully');

async function fetchRecipes() {
    try {
        const response = await fetch('/api/recipes');
        const recipes = await response.json();
        displayRecipes(recipes);
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeMenu = document.getElementById('recipeMenu');
    recipeMenu.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <a href="recipe-detail.html?id=${recipe._id}">
                <div class="item">
                    <h1>${recipe.title}</h1>
                    <p>${recipe.description}</p>
                </div>
            </a>
        `;
        recipeMenu.appendChild(card);
    });
}

window.onload = fetchRecipes;