const searchBox = document.querySelector("#searchbar");
const searchBtn = document.querySelector("#search-btn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

//function to get recipes...
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipeContainer.innerHTML = ""
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span>Dish</p>
            <p>Belongs to<span>${meal.strCategory}</span>Category</p>
    
            `

            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // adding event listener to recipe button...
            button.addEventListener('click', () => {
                openRecipePopup(meal)
            })

            recipeContainer.appendChild(recipeDiv);
        });
        // console.log(response.meals[0]);

    }
    catch (error) {
        recipeContainer.innerHTML = "<h2> Error in Fetching Recipes...</h2>"
    }
}
//function to fetch indegredients...
const fetchIngredients = (meal) => {
    let ingredientlist = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientlist += `<li>${measure} ${ingredient}</li>`
        } else {
            break;
        }
    }
    return ingredientlist;
}

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class = "recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class = "ingredientslist">${fetchIngredients(meal)}</ul>
    <div class = "recipeInstructions">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none"
})

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("check");
})