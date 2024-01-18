import { pageNotFound } from "./pageNotFound.js";
import { homePageHtml } from "./homepage.js";
class Router {
  recipes;

  constructor(recipesList) {
    this.recipes = recipesList;
  }

  handleRequest = async (req) => {
    const { url } = req;
    for (const recipe of this.recipes) {
      if (url === recipe.getFolderUrl()) {
        return recipe;
      }
    }
    if (url === "/") {
      return homePageHtml();
    }
    return pageNotFound();
  };
}

export default Router;
