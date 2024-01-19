export const generateRecipesListHtml = (recipes) => {
  let recipeLinks = "";
  for (const recipe of recipes) {
    recipeLinks += `<li class>${recipe.generateLink()}</li>`;
  }

  return `
<ul class="recipes">
${recipeLinks}
</ul>`;
};
