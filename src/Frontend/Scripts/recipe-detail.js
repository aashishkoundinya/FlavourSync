async function fetchRecipeDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');

    try {
        const response = await fetch(`/api/recipes/${recipeId}`);
        const recipe = await response.json();

        displayRecipeDetails(recipe);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function displayRecipeDetails(recipe) {
    const recipeDetailsDiv = document.getElementById('recipeDetails');

    if (!recipeDetailsDiv) {
        console.error('Recipe details container not found');
        return;
    }

    const date = new Date(Date.parse(recipe.createdAt));
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    recipeDetailsDiv.innerHTML = `
        <div class="heading" id="recipe-name">
            <h1>${recipe.title || 'Untitled Recipe'}</h1>
        </div>

        <div class="details" id="recipe-content">
            <h2>Description:</h2>
            <p>${recipe.description || 'No description available'}</p>
            
            <h2>Ingredients:</h2>
            <ul>
                ${recipe.ingredients.map(ingredient => `<li>${ingredient.value} ${ingredient.measurement} of ${ingredient.name} (${ingredient.note || 'No notes'})</li>`).join('')}
            </ul>
            
            <h2>Instructions:</h2>
            <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
        </div>

        <div class="meta-info" id="recipe-meta">
            <p>Submitted by: <strong>${recipe.username ||  'Unknown User'}</strong></p>
            <p>Submitted on: <strong>${formattedDate} at ${formattedTime}</strong></p>
        </div>

        <button onclick="exportRecipeAsPDF()">Download as PDF</button>
    `;
}

document.addEventListener('DOMContentLoaded', fetchRecipeDetails);
