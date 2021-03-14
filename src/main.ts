import * as express from "express";
import { Server } from "ws";
import { Bootstrap } from "./bootstrap";
import { SERVER_PORT, WEBSOCKET_HOST, WEBSOCKET_PORT } from "./constants";

const app = express();

const server = new Server({
  port: Number(WEBSOCKET_PORT),
  host: WEBSOCKET_HOST,
  noServer: true,
});

const bootstrap = new Bootstrap();
bootstrap.setup(app, server);

app.listen(SERVER_PORT, () => {
  console.log(`App listening at http://localhost:${SERVER_PORT}`);
});
