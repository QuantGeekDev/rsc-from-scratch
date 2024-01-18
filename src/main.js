import "dotenv/config";
import { createServer } from "http";
import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

const extractRecipeName = (pathToFile) =>
  pathToFile.split("/")[2].split(".")[0];

const processRecipe = async (pathToFile) => {
  const recipe = {};
  const recipeAuthor = "Alex Andru";
  const encoding = "utf8";

  recipe.name = extractRecipeName(pathToFile);
  recipe.content = await readFile(pathToFile, encoding);
  recipe.author = recipeAuthor;

  return recipe;
};

const generateRecipeHtml = async () => {
  const pathToFile = "./recipes/croqueta.txt";
  const recipeHtml = await processRecipe(pathToFile);
  return `<html>
      <head>
        <title>Server-Side Recipes</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="./styles.css">
        <meta desc="Testing Server Side rendering with a recipe page">
      </head>
      <body>
        <nav>
          <a href="/">Recipes</a>
          <hr />
        </nav>
        <article>
        <h1> ${recipeHtml.name} recipe</h1>
          ${escapeHtml(recipeHtml.content)}
        </article>
        <footer>
          <hr>
          <p><i> ${escapeHtml(
            recipeHtml.author
          )}</i>,  Time from Epoch <i>(in case you were wondering)</i>: ${new Date().getTime()}</p>
        </footer>
      </body>
    </html>`;
};

const port = process.env.PORT ?? 8080;
createServer(async (req, res) => {
  const html = await generateRecipeHtml();
  sendHTML(res, html);
}).listen(port);

console.log(`Listening on http://localhost:${port}`);

const sendHTML = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};
