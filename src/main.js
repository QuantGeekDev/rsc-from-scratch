import "dotenv/config";
import { createServer } from "http";
import Recipe from "./Recipe.js";
import { readFile } from "fs/promises";
import generateRecipeLayout from "./layout.js";

const port = process.env.PORT ?? 8080;

const server = async (req, res) => {
  if (isFaviconRequest(req)) {
    const favicon = await readFile("./favicon.ico");
    sendFavicon(res, favicon);
  }

  if (isCssRequest(req)) {
    const css = await readFile("./src/styles.css", "utf-8");
    sendCSS(res, css);
    return;
  }
  await router(req, res);
};

createServer(server).listen(port);

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

const sendFavicon = (res, favicon) => {
  res.setHeader("Content-Type", "image/x-icon");
  res.writeHead(200);
  res.end(favicon);
};

const isCssRequest = (req) => req.headers.accept.includes("text/css");

const isFaviconRequest = (req) => (req.url === "/favicon.ico" ? true : false);

const router = async (req, res) => {
  const { url } = req;
  switch (url) {
    case "/botifarra":
      const botifarraRecipe = new Recipe("./recipes/botifarra.txt");
      const botifarraContent = await botifarraRecipe.generateHtml();
      const botifarraHtml = generateRecipeLayout(botifarraContent);
      sendHTML(res, botifarraHtml);
      break;
    case "croqueta":
    case "/":
      const croquetaRecipe = await new Recipe("./recipes/croqueta.txt");
      const croquetaContent = await croquetaRecipe.generateHtml();
      const croquetaHtml = generateRecipeLayout(croquetaContent);

      await sendHTML(res, croquetaHtml);
    default:
      return;
  }
};
