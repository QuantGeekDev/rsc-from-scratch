import { createServer } from "http";
import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

const generateHtml = async () => {
  const recipeAuthor = "Alex Andru";
  const recipeContent = await readFile("./recipes/botifarra.txt", "utf8");
  return `<html>
      <head>
        <title>Server-Side Recipes</title>
        <meta charset="UTF-8">
        <meta desc="Testing Server Side rendering with a recipe page">
      </head>
      <body>
        <nav>
          <a href="/">Recipes</a>
          <hr />
        </nav>
        <article>
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
createServer(async (_req, res) => {
  const html = await generateHtml();
  sendHTML(res, html);
}).listen(8080);

console.log(`Listening on http://localhost:${port}`);

const sendHTML = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};
