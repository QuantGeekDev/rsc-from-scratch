import "dotenv/config";
import { createServer } from "http";
import Router from "./Router.js";
import Server from "./Server.js";
import { recipes } from "./Recipes.js";

const port = process.env.PORT ?? 8080;

const recipeList = recipes.getRecipes();
const router = new Router(recipeList);
const server = new Server(port, router);

createServer(await server.start).listen(port);

console.log(`Listening on http://localhost:${port}`);
