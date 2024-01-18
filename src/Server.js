import { readFile } from "fs/promises";
import Recipe from "./Recipe.js";
import generateRecipeLayout from "./recipeLayout.js";

class Server {
  port;
  router;
  constructor(port, router) {
    this.port = port;
    this.router = router;
  }

  start = async (req, res) => {
    if (this.constructor.isFaviconRequest(req)) {
      const pathToFavicon = "./favicon.ico";
      const favicon = await readFile(pathToFavicon);
      this.sendFavicon(res, favicon);
      return;
    }

    if (this.constructor.isCssRequest(req)) {
      const pathToStylesheet = "./src/styles.css";
      const css = await readFile(pathToStylesheet);
      this.sendCSS(res, css);
      return;
    }

    const routerResponse = await this.router(req, res);
    let html;

    if (routerResponse instanceof Recipe) {
      const recipe = routerResponse;
      const recipeContent = await recipe.generateHtml();
      html = generateRecipeLayout(recipeContent);
    } else {
      html = routerResponse;
    }
    this.sendHTML(res, html);
  };

  sendHTML = (res, html) => {
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(html);
  };

  sendCSS = (res, css) => {
    res.setHeader("Content-Type", "text/css");
    res.writeHead(200);
    res.end(css);
  };

  sendFavicon = (res, favicon) => {
    res.setHeader("Content-Type", "image/x-icon");
    res.writeHead(200);
    res.end(favicon);
  };

  static isCssRequest = (req) => req.headers.accept.includes("text/css");

  static isFaviconRequest = (req) =>
    req.url === "/favicon.ico" ? true : false;
}

export default Server;
