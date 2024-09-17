document.addEventListener('DOMContentLoaded', () => {
    const ingredientsContainer = document.getElementById('ingredientsContainer');
    const addIngredientButton = document.getElementById('addIngredient');
    const recipeForm = document.getElementById('recipeForm');

    addIngredientButton.addEventListener('click', addIngredient);
    recipeForm.addEventListener('submit', submitRecipe);

    function addIngredient() {
        const ingredientDiv = document.createElement('div');
        ingredientDiv.className = 'ingredient';
        ingredientDiv.setAttribute('draggable', 'true');

        const dragHandle = document.createElement('span');
        dragHandle.className = 'drag-handle';
        dragHandle.textContent = '☰';

        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Ingredient Name';
        nameInput.required = true;
        nameInput.style.maxWidth = '20rem';

        const measurementSelect = document.createElement('select');
        measurementSelect.style.maxWidth = "7rem"
        const options = ['Grams (g)', 'Milliliter (ml)', 'Table Spoon (Tbsp)', 'Tea Spoon (Tsp)', 'Custom'];
        options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            measurementSelect.appendChild(opt);
        });

        const valueInput = document.createElement('input');
        valueInput.type = 'number';
        valueInput.placeholder = 'Value';
        valueInput.required = true;
        valueInput.style.maxWidth = '6rem';

        const notesInput = document.createElement('input');
        notesInput.type = 'text';
        notesInput.placeholder = 'Notes';
        notesInput.required = false;
        notesInput.style.maxWidth = '8rem';

        const removeButton = document.createElement('button');
        removeButton.type = 'button';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            ingredientDiv.remove();
        });

        ingredientDiv.appendChild(dragHandle);
        ingredientDiv.appendChild(nameInput);
        ingredientDiv.appendChild(measurementSelect);
        ingredientDiv.appendChild(valueInput);
        ingredientDiv.appendChild(notesInput)
        ingredientDiv.appendChild(removeButton);

        ingredientsContainer.appendChild(ingredientDiv);

        // Add drag event listeners
        ingredientDiv.addEventListener('dragstart', (e) => {
            ingredientDiv.classList.add('dragging');
            setTimeout(() => {
                ingredientDiv.style.display = 'none';
            }, 0);
        });

        ingredientDiv.addEventListener('dragend', () => {
            ingredientDiv.classList.remove('dragging');
            ingredientDiv.style.display = 'flex';
        });

        ingredientsContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingElement = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(ingredientsContainer, e.clientY);
            if (afterElement == null) {
                ingredientsContainer.appendChild(draggingElement);
            } else {
                ingredientsContainer.insertBefore(draggingElement, afterElement);
            }
        });
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.ingredient:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function submitRecipe(event) {
        event.preventDefault();
        const recipeTitle = document.getElementById('recipeTitle').value.trim();
        const instructions = document.getElementById('instructions').value.trim();

        if (!recipeTitle || !instructions) {
            alert('Please fill in all the fields.');
            return;
        }

        const ingredients = [];
        document.querySelectorAll('.ingredient').forEach(ingredientDiv => {
            const name = ingredientDiv.querySelector('input[type="text"]').value.trim();
            const measurement = ingredientDiv.querySelector('select').value;
            const value = ingredientDiv.querySelector('input[type="number"]').value.trim();
            const note = ingredientDiv.querySelector('input[type="text"]').value.trim();
            if (name && value) {
                ingredients.push({ name, measurement, value, note });
            }
        });

        const recipe = {
            title: recipeTitle,
            instructions: instructions,
            ingredients: ingredients
        };

        localStorage.setItem(recipeTitle, JSON.stringify(recipe));
        alert('Recipe submitted successfully!');
        recipeForm.reset();
        ingredientsContainer.innerHTML = '';
    }
});
