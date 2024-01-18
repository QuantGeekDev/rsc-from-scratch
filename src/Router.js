import { pageNotFound } from "./pageNotFound.js";
import Recipe from "./Recipe.js";

export const router = async (req) => {
  const { url } = req;
  switch (url) {
    case "/botifarra":
      const botifarraRecipe = new Recipe("./recipes/botifarra.txt");
      return botifarraRecipe;
    case "/croqueta":
    case "/":
      const croquetaRecipe = await new Recipe("./recipes/croqueta.txt");
      return croquetaRecipe;

    default:
      const pageNotFoundHtml = pageNotFound();
      return pageNotFoundHtml;
  }
};
