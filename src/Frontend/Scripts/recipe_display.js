document.addEventListener('DOMContentLoaded', () => {
    fetchRecipes()

    const recipeToggle = document.getElementById('recipeToggle');
    if (recipeToggle) {
        recipeToggle.addEventListener('change', toggleRecipes);
    } else {
        console.error('Toggle switch element not found.');
    }
});

function toggleRecipes() {
    const allRecipes = document.getElementById('recipeToggle').checked;
    fetchRecipes(allRecipes);
}

async function fetchRecipes(allRecipes = false) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in to view recipes.');
        window.location.href = '/login.html';
        return;
    }

    try {
        const endpoint = allRecipes ? '/all-recipes' : '/my-recipes';
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (data && Array.isArray(data)) {
            displayRecipes(data);
        } else {
            console.error('Invalid data format received:', data);
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

function displayRecipes(recipes) {
    const recipeMenu = document.getElementById('recipeMenu');

    if (!recipeMenu) {
        console.error('recipeMenu element not found');
        return;
    }

    recipeMenu.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'card';

        const item = document.createElement('div');
        item.className = 'item';
        item.innerHTML = `
            <a href="recipe-detail.html?id=${recipe._id}">
                <h1>${recipe.title || 'Untitled Recipe'}</h1>
                <p>${recipe.description || 'No description available'}</p>
            </a>
        `;

        // Append the item to card, then append card to recipe menu
        card.appendChild(item);
        recipeMenu.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded',() => fetchRecipes());
