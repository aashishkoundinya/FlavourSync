function filterRecipes() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const recipes = document.querySelectorAll('.recipe-menu .card');

    recipes.forEach(recipe => {
        const recipeTitle = recipe.querySelector('h1').textContent.toLowerCase();
        if (recipeTitle.includes(searchTerm)) {
            recipe.style.display = 'block';
        } else {
            recipe.style.display = 'none';
        }
    });

    function clearSearch() {
        document.getElementById('search-bar').value = '';
        filterRecipes();
    }
}
