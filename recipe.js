const searchbox = document.querySelector('.search-box')
const searchbtn = document.querySelector('.search-btn')
const recipecontainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content')
const recipeCloseBtn = document.querySelector('.recipe-close-btn')

const fetchRecipes = async (data) => {
       recipecontainer.innerHTML = `<h2>Fetching Recipes...</h2>`;
       try {
       const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${data}`);
       const response = await api.json()

       recipecontainer.innerHTML = " ";

       console.log(response);
       
       
       response.meals.forEach(meal => {
              const recipeDiv = document.createElement('div');
              recipeDiv.classList.add('recipe');
              recipeDiv.innerHTML = 
              `
                  <img src = "${meal.strMealThumb}">
                  <h3>${meal.strMeal}</h3>
                  <p><span>${meal.strArea}</span> Dish</p>
                  <p>From <span>${meal.strCategory}</span> Category</p>
              `
              const Button = document.createElement('button');
              Button.textContent = 'View Recipe';
              recipeDiv.appendChild(Button);

              Button.addEventListener('click',(e)=>{
                     showRecipeDetails(meal);
              });

              recipecontainer.appendChild(recipeDiv);
              
       });
       
       }
       
catch (error) {
       recipecontainer.innerHTML = `<h2>Err!!! There was an error loading recipe...</h2>`;       
}
}

/*Function to fetch ingredients*/
const fetchIngredients = (meal) => {
       let ingredientList = " ";
       for(let i=1; i<=20 ; i++){
              const ingredients = meal[`strIngredient${i}`];
              if(ingredients){
                     const measure = meal[`strMeasure${i}`];
                     ingredientList += `<li>${measure} ${ingredients}</li>`;
              }
              else{
                     break;
              }
       }
       return ingredientList;
}

/* Function to show recipe details */

const showRecipeDetails = (meal) => {
       recipeDetailsContent.innerHTML = `
          <h2 class="recipeName">${meal.strMeal}</h2>
          <h3>Ingredients:</h3>
          <ul class="ingredientsList">${fetchIngredients(meal)}</ul>
          <div class="recipeInstructions">
              <h3>Instructions:</h3>
              <p>${meal.strInstructions}</p>
          </div>    
       `
       recipeDetailsContent.parentElement.style.display = 'block';
}

recipeCloseBtn.addEventListener('click',()=>{
       recipeDetailsContent.parentElement.style.display = 'none';
})

searchbtn.addEventListener('click',(e)=>{
       e.preventDefault();
       const searchInput = searchbox.value.trim();
       if(!searchInput){
              recipecontainer.innerHTML = `"<h2>Please enter recipe you want to search... </h2>"`;
              return;
       }
       fetchRecipes(searchInput);

})



