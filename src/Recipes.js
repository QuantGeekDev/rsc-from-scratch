import Recipe from "./Recipe.js";
import { opendir } from "fs/promises";

class Recipes {
  pathToRecipes = "recipes";
  recipes = [];

  constructor() {
    this.gatherRecipes();
  }

  addRecipe = (recipe) => this.recipes.push(recipe);

  getRecipes = () => this.recipes;

  gatherRecipes = async () => {
    const pathToRecipesFolder = "recipes";
    const recipesDirectoryContent = await opendir(pathToRecipesFolder);

    for await (const recipeFolder of recipesDirectoryContent) {
      const recipeDirectory = `${pathToRecipesFolder}/${recipeFolder.name}`;
      const recipe = new Recipe(recipeDirectory);
      this.addRecipe(recipe);
    }
  };
}

export default Recipes;
