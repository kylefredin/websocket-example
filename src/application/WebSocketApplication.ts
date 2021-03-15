import * as express from "express";
import { Server } from "ws";
import { ApplicationBootstrap } from "./ApplicationBootstrap";
import { Configuration } from "./Configuration";

class WebSocketApplication {
  /**
   * @type {express.Application}
   */
  public expressApplication: express.Application;

  /**
   * @type {Server}
   */
  public websocketServer: Server;

  /**
   * @type {ApplicationBootstrap}
   */
  public applicationBootstrap: ApplicationBootstrap;

  /**
   * @type {Configuration}
   */
  private config: Configuration;

  /**
   * Setup the websocket application
   *
   * @param {Configuration} config
   */
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

  /**
   * Starts the WebSocket Application
   *
   * @return {void}
   */
  public start(): void {
    this.applicationBootstrap.setup(
      this.expressApplication,
      this.websocketServer
    );

    this.expressApplication.listen(
      this.config.serverPort,
      this.applicationListener.bind(this)
    );
  }

  /**
   * @return {void}
   */
  private applicationListener(): void {
    console.log(`App listening at ${this.config.baseUrl}`);
  }
}

export default WebSocketApplication;

export { WebSocketApplication };
