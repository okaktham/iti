"use strict";

let allRecipes = [];

async function fetchRecipes() {
    try {
        const response = await fetch('https://forkify-api.herokuapp.com/api/search?q=pizza');
        const data = await response.json();

        if (data.recipes && data.recipes.length > 0) {
            allRecipes = data.recipes;
            displayRecipes(allRecipes);
        } else {
            showNoResults();
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        showError();
    } finally {
        document.getElementById('loadingSpinner').style.display = 'none';
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = '';

    if (recipes.length === 0) {
        showNoResults();
        return;
    }

    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });

    container.style.display = 'flex';
    hideNoResults();
}

function createRecipeCard(recipe) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';

    col.innerHTML = `
        <div class="card recipe-card h-100">
            <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe-image" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNzU3ZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
            <div class="card-body d-flex align-items-center justify-content-center">
                <h5 class="recipe-title text-center mb-0">${recipe.title}</h5>
            </div>
        </div>
    `;

    return col;
}

function searchRecipes(query) {
    if (!query.trim()) {
        displayRecipes(allRecipes);
        return;
    }

    const filteredRecipes = allRecipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase())
    );

    displayRecipes(filteredRecipes);
}

function toggleDarkMode() {
    const body = document.body;
    const toggleBtn = document.getElementById('darkModeToggle');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleBtn.innerHTML = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        toggleBtn.innerHTML = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
}

function loadDarkModePreference() {
    const darkMode = localStorage.getItem('darkMode');
    const toggleBtn = document.getElementById('darkModeToggle');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        toggleBtn.innerHTML = '☀️';
    }
}

function showNoResults() {
    document.getElementById('noResults').style.display = 'block';
    document.getElementById('recipesContainer').style.display = 'none';
}

function hideNoResults() {
    document.getElementById('noResults').style.display = 'none';
}

function showError() {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = `
        <div class="col-12">
            <div class="alert alert-danger text-center" role="alert">
                <h4>Oops! Something went wrong</h4>
                <p>Unable to fetch recipes. Please try again later.</p>
            </div>
        </div>
    `;
    container.style.display = 'flex';
}

document.getElementById('searchInput').addEventListener('input', function(e) {
    searchRecipes(e.target.value);
});

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);

document.addEventListener('DOMContentLoaded', function() {
    loadDarkModePreference();
    fetchRecipes();
});