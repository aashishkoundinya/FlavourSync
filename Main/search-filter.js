function filterRecipes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe-menu .card');

    recipes.forEach(recipe => {
        // Get the recipe title text
        const recipeTitle = recipe.querySelector('h1').textContent.toLowerCase();
        // If the title includes the search term, display the recipe, otherwise hide it
        if (recipeTitle.includes(searchTerm)) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        }
    });

    function clearSearch() {
        document.getElementById('search-bar').value = '';
        filterRecipes(); // Reset the recipe display
    }
}
