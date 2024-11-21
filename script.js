const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');
const mealCategory = document.querySelector('#mealCategory');
const surpriseBtn = document.querySelector('#surpriseBtn');
const searchButton = document.querySelector('#submit');

// for connection of form and search button
searchButton.addEventListener('click', (e) => {
    e.preventDefault();  
    searchRecipes();     
});

//surprise me function 
surpriseBtn.addEventListener('click', () => {
    getRandomRecipe(); 
});

// list random recipe for surprise me
const randomTerms = [
    'breakfast', 'lunch', 'dinner', 'dessert'];

// serch recipes based sa ingredients 
async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    const categoryValue = mealCategory.value;

    
const url = `https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10${categoryValue ? '&mealType=' + categoryValue : ''}`;

try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.hits);
} catch (error) {
    console.error("Error fetching recipes:", error);
    resultsList.innerHTML = "<p>There was an error fetching the recipes. Please try again later.</p>";
}
}


async function getRandomRecipe() {
const randomTerm = randomTerms[Math.floor(Math.random() * randomTerms.length)];

const randomFrom = Math.floor(Math.random() * 100); 
const randomTo = randomFrom + 10; 

const url = `https://api.edamam.com/search?q=${randomTerm}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=${randomFrom}&to=${randomTo}`;

try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.hits.length === 0) {
        resultsList.innerHTML = "<p>No random recipes found, try again.</p>";
    } else {
        displayRecipes(data.hits);
    }
} catch (error) {
    console.error("Error fetching random recipe:", error);
    resultsList.innerHTML = "<p>There was an error fetching the random recipe. Please try again later.</p>";
}
}

function displayRecipes(recipes) {
    let html = '';
    if (recipes.length > 0) {
        recipes.forEach((recipe) => {
            html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
            `;
        });
    } else {
        html = '<p>No recipes found. Try different ingredients or filters.</p>';
    }
    resultsList.innerHTML = html;
}
