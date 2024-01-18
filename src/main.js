import "dotenv/config";
import { createServer } from "http";
import { router } from "./Router.js";
import Server from "./Server.js";

const port = process.env.PORT ?? 8080;

const server = new Server(port, router);

createServer(await server.start).listen(port);

console.log(`Listening on http://localhost:${port}`);
