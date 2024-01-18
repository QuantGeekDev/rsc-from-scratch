import "dotenv/config";
import { createServer } from "http";
import Recipe from "./Recipe.js";
import generateRecipeLayout from "./layout.js";
import Server from "./Server.js";

const port = process.env.PORT ?? 8080;

const router = async (req, res) => {
  const { url } = req;
  switch (url) {
    case "/botifarra":
      const botifarraRecipe = new Recipe("./recipes/botifarra.txt");
      const botifarraContent = await botifarraRecipe.generateHtml();
      const botifarraHtml = generateRecipeLayout(botifarraContent);
      server.sendHTML(res, botifarraHtml);
      break;
    case "croqueta":
    case "/":
      const croquetaRecipe = await new Recipe("./recipes/croqueta.txt");
      const croquetaContent = await croquetaRecipe.generateHtml();
      const croquetaHtml = generateRecipeLayout(croquetaContent);

      await server.sendHTML(res, croquetaHtml);
    default:
      return;
  }
};

const server = new Server(port, router);

createServer(await server.start).listen(port);

console.log(`Listening on http://localhost:${port}`);
