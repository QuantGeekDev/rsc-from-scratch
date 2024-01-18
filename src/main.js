import "dotenv/config";
import { createServer } from "http";
import Recipe from "./Recipe.js";
import { readFile } from "fs/promises";

const port = process.env.PORT ?? 8080;

createServer(async (req, res) => {
  console.log(req.url);
  if (isFaviconRequest(req)) {
    console.log("Favicon has been requested");
  }

  if (isCssRequest(req)) {
    const css = await readFile("./src/styles.css", "utf-8");
    sendCSS(res, css);
    return;
  }
  await router(req, res);
  return;
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

const isCssRequest = (req) => req.headers.accept.includes("text/css");

const isFaviconRequest = (req) => (req.url === "/favicon.ico" ? true : false);

const router = async (req, res) => {
  const { url } = req;
  switch (url) {
    case "/botifarra":
      const botifarraRecipe = new Recipe("./recipes/botifarra.txt");
      const botifarraHtml = await botifarraRecipe.generateHtml();
      sendHTML(res, botifarraHtml);
      break;
    case "croqueta":
    case "/":
      const croquetaRecipe = await new Recipe("./recipes/croqueta.txt");
      const croquetaHtml = await croquetaRecipe.generateHtml();
      await sendHTML(res, croquetaHtml);
    default:
      return;
  }
};
