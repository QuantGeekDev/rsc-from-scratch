import "dotenv/config";
import { createServer } from "http";
import Recipe from "./Recipe.js";
import { readFile } from "fs/promises";

const croquetaRecipe = new Recipe("./recipes/croqueta.txt");
const port = process.env.PORT ?? 8080;

createServer(async (req, res) => {
  if (isCssRequest(req)) {
    const css = await readFile("./src/styles.css", "utf-8");
    sendCSS(res, css);
    return;
  }

  const html = await croquetaRecipe.generateHtml();
  sendHTML(res, html);
}).listen(port);

console.log(`Listening on http://localhost:${port}`);

const sendHTML = (res, html) => {
  res.setHeader("Content-Type", "text/html");
  res.writeHead(200);
  res.end(html);
};

const sendCSS = (res, css) => {
  res.setHeader("Content-Type", "text/css");
  res.writeHead(200);
  res.end(css);
};

const isCssRequest = (req) =>
  req.headers.accept.contains("text/css") ? true : false;
