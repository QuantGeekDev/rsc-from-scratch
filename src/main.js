import { createServer } from "http";
import { readFile } from "fs/promises";
import escapeHtml from "escape-html";

const generateHtml = async () => {
  const recipeAuthor = "Alex Andru";
  const postContent = await readFile("./recipes/botifarra.txt", "utf8");
  return `<html>
      <head>
        <title>Server-Side Recipes</title>
        <meta charset="UTF-8">
      </head>
      <body>
        <nav>
          <a href="/">Recipes</a>
          <hr />
        </nav>
        <article>
          ${escapeHtml(postContent)}
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

createServer(async (_req, res) => {
  const html = await generateHtml();
  sendHTML(res, html);
}).listen(8080);

console.log("Listening on http://localhost:8080");

function sendHTML(res, html) {
  res.setHeader("Content-Type", "text/html");
  res.end(html);
}
