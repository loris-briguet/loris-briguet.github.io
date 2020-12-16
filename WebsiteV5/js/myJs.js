var recipeTrigger = document.getElementsByClassName("recipeTrigger");
var wrapper = document.getElementsByClassName("wrapper");
var recipe = document.getElementsByClassName("recipe");
var state = document.getElementsByClassName("wrapper");
let recipeOn = false;
let i = 1;

recipeTrigger[0].addEventListener("click", openRecipe);
wrapper[0].addEventListener("click", classIncrement);

function classIncrement() {
  if (i <= 7) {
    state[0].id = "state" + i;
    i++;
  }
}

function openRecipe() {
  if (recipeOn == false) {
    wrapper[0].style = "width: 80%; left: 20%";
    recipe[0].style = "width: 20%; left: 0";
    recipeTrigger[0].style = "left: 20%";
    recipeOn = true;
  } else {
    wrapper[0].style = "width: 100%; left: 0";
    recipe[0].style = "width: 0%; left: 0";
    recipeTrigger[0].style = "left: 0";
    recipeOn = false;
  }
}
