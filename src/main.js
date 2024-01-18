import { createServer } from "http";
import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

const extractRecipeName = (pathToFile) =>
  pathToFile.split("/")[2].split(".")[0];

const processRecipe = async (pathToFile) => {
  const recipe = {};
  const recipeAuthor = "Alex Andru";
  recipe.name = extractRecipeName(pathToFile);
  const encoding = "utf8";
  recipe.content = await readFile(pathToFile, encoding);
  recipe.author = recipeAuthor;
  return recipe;
};

const generateHtml = async () => {
  const pathToFile = "./recipes/botifarra.txt";
  const recipe = await processRecipe(pathToFile);
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
        <h1> ${recipe.name} recipe</h1>
          ${escapeHtml(recipe.content)}
        </article>
        <footer>
          <hr>
          <p><i> ${escapeHtml(
            recipe.author
          )}</i>,  Time from Epoch <i>(in case you were wondering)</i>: ${new Date().getTime()}</p>
        </footer>
      </body>
    </html>`;
};

const port = 8080;
createServer(async (req, res) => {
  const html = await generateHtml();
  sendHTML(res, html);
}).listen(port);

console.log(`Listening on http://localhost:${port}`);

const sendHTML = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};
