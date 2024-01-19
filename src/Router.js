import { pageNotFound } from "./pageNotFound.js";
import { homePageLayout } from "./homepageLayout.js";
import { generateRecipesListHtml } from "./generateRecipesListHtml.js";
class Router {
  recipes;

  constructor(recipesList) {
    this.recipes = recipesList;
  }

  handleRequest = async (req) => {
    const { url } = req;
    for (const recipe of this.recipes) {
      if (url === recipe.getRecipeUrl()) {
        return recipe;
      }
    }
    if (url === "/") {
      const recipesListHtml = generateRecipesListHtml(this.recipes);
      return homePageLayout(recipesListHtml);
    }
    return pageNotFound();
  };
}

export default Router;
