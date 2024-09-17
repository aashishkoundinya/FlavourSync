// Array to store searchable elements (recipe titles)
const recipes = [
    { title: 'Tea', description: 'A delicious chocolate cake recipe.' },
    { title: 'Pasta', description: 'A classic Italian pasta dish.' },
    { title: 'Pizza', description: 'Mexican-style tacos with beef and salsa.' },
    { title: 'Burger', description: 'Traditional Japanese sushi recipe.' }
];

// Function to display all recipes
function displayRecipes(recipeArray) {
    const recipeMenu = document.getElementById('recipe-menu');
    recipeMenu.innerHTML = ''; // Clear previous results
    recipeArray.forEach(recipe => {
        let recipeCard = `
            <div class="card">
                <h3>${recipe.title}</h3>
                <p>${recipe.description}</p>
            </div>
        `;
        recipeMenu.innerHTML += recipeCard;
    });
}

// Function to filter recipes based on search input
function filterRecipes() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
}

// Initial display of all recipes
displayRecipes(recipes);
