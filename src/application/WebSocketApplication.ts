import * as express from "express";
import { Server } from "ws";
import { ApplicationBootstrap } from "./ApplicationBootstrap";
import { Configuration } from "./Configuration";

class WebSocketApplication {
  public expressApplication: express.Application;

  public websocketServer: Server;

  public applicationBootstrap: ApplicationBootstrap;

  private config: Configuration;

  public constructor(config: Configuration) {
    this.config = config;

    this.expressApplication = express();

    this.websocketServer = new Server({
      port: config.websocketPort,
      host: config.websocketHost,
      noServer: true,
    });

    this.applicationBootstrap = new ApplicationBootstrap();
  }

  public start() {
    this.applicationBootstrap.setup(
      this.expressApplication,
      this.websocketServer
    );

    this.expressApplication.listen(
      this.config.serverPort,
      this.applicationListener.bind(this)
    );
  }

  private applicationListener() {
    console.log(
      `App listening at http://${this.config.serverHost}:${this.config.serverPort}`
    );
  }
}

export default WebSocketApplication;

export { WebSocketApplication };
