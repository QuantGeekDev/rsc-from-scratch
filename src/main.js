import "dotenv/config";
import { createServer } from "http";
import Router from "./Router.js";
import Server from "./Server.js";
import Recipes from "./Recipes.js";

const port = process.env.PORT ?? 8080;

const recipes = new Recipes();

const router = new Router(recipes.getRecipes());
const server = new Server(port, router);

createServer(await server.start).listen(port);

console.log(`Listening on http://localhost:${port}`);
