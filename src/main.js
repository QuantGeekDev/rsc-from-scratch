import { createServer } from "http";
import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

const generateHtml = async () => {
  const recipeAuthor = "Alex Andru";
  const pathToFile = "./recipes/botifarra.txt";
  let recipeName = pathToFile.split("/")[2];
  recipeName = recipeName.split(".")[0];
  const encoding = "utf8";
  debugger;
  const recipeContent = await readFile(pathToFile, encoding);
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
        <h1> ${recipeName} recipe</h1>
          ${escapeHtml(recipeContent)}
        </article>
        <footer>
          <hr>
          <p><i> ${escapeHtml(
            recipeAuthor
          )}</i>,  Time from Epoch <i>(in case you were wondering)</i>: ${new Date().getTime()}</p>
        </footer>
      </body>
    </html>`;
};

const port = 8080;
createServer(async (req, res) => {
  const html = await generateHtml();
  debugger;
  sendHTML(res, html);
}).listen(port);

console.log(`Listening on http://localhost:${port}`);

const sendHTML = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};
